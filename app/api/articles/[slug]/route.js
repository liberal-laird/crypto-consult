import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REWRITTEN_FILE = path.join(process.cwd(), '..', '.openclaw', 'workspace', 'scrapers', 'rewritten_articles.json');
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'rewritten_articles.json');
const LOCAL_ARTICLES_FILE = path.join(process.cwd(), 'public', 'articles', 'local-articles.json');

export async function GET(request, { params }) {
  const { slug } = await params;
  
  try {
    let article = null;
    
    // Check local articles first (for original content)
    if (fs.existsSync(LOCAL_ARTICLES_FILE)) {
      const localData = JSON.parse(fs.readFileSync(LOCAL_ARTICLES_FILE, 'utf8'));
      article = localData.find(a => a.slug === slug);
      
      if (article) {
        return NextResponse.json({
          id: article.id,
          slug: article.slug,
          title: article.title,
          originalTitle: article.originalTitle,
          content: formatContent(article.content),
          excerpt: article.excerpt,
          publishedAt: article.publishedAt,
          source: article.source,
          originalUrl: article.originalUrl,
          wordCount: article.wordCount,
          rewrittenAt: article.publishedAt,
          isLocal: true
        });
      }
    }
    
    // Try rewritten articles from scrapers
    let filePath = PUBLIC_FILE;
    if (!fs.existsSync(filePath)) {
      filePath = REWRITTEN_FILE;
    }
    
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      article = data.find(a => a.slug === slug);
      
      if (article) {
        return NextResponse.json({
          id: article.id,
          slug: article.slug,
          title: article.rewrittenTitle,
          originalTitle: article.originalTitle,
          content: formatContent(article.rewrittenContent),
          excerpt: article.excerpt,
          publishedAt: article.publishedAt,
          source: article.source,
          originalUrl: article.originalUrl,
          wordCount: article.wordCount,
          rewrittenAt: article.rewrittenAt
        });
      }
    }
    
    return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

function formatContent(content) {
  if (!content) return '';
  
  // Handle array content (already formatted)
  if (Array.isArray(content)) {
    return content;
  }
  
  // Convert plain text to structured sections
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  return paragraphs.map((para, index) => {
    para = para.trim();
    
    // Detect headings (## or headings)
    if (para.startsWith('## ') || (para.length < 50 && (para.includes('：') || para.includes(':')) && index > 0)) {
      const cleanText = para.replace(/^##\s*/, '').replace(/[：:]$/, '');
      if (cleanText.length < 80) {
        return { type: 'h2', text: cleanText };
      }
    }
    
    // Detect list items
    if (para.match(/^[-•*]\s/) || para.match(/^\d+[.、]\s/)) {
      return { type: 'list', text: para.replace(/^[-•*]\s*/, '').replace(/^\d+[.、]\s*/, '') };
    }
    
    // Regular paragraph
    return { type: 'paragraph', text: para };
  });
}
