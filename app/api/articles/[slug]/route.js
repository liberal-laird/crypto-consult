import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REWRITTEN_FILE = path.join(process.cwd(), '..', '.openclaw', 'workspace', 'scrapers', 'rewritten_articles.json');
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'rewritten_articles.json');
const ARTICLES_DIR = path.join(process.cwd(), '..', '..', '.openclaw', 'workspace', 'scrapers', 'articles_content');
const PUBLIC_ARTICLES_DIR = path.join(process.cwd(), 'public', 'articles');

export async function GET(request, { params }) {
  const { slug } = await params;
  
  try {
    // Try individual article file first
    let article = null;
    
    // Check in articles_content directory
    const articleFile = path.join(ARTICLES_DIR, `${slug}.json`);
    if (fs.existsSync(articleFile)) {
      article = JSON.parse(fs.readFileSync(articleFile, 'utf8'));
    }
    
    // Fallback to public directory
    if (!article) {
      const publicFile = path.join(PUBLIC_ARTICLES_DIR, `${slug}.json`);
      if (fs.existsSync(publicFile)) {
        article = JSON.parse(fs.readFileSync(publicFile, 'utf8'));
      }
    }
    
    // Fallback: search in index
    if (!article) {
      let filePath = PUBLIC_FILE;
      if (!fs.existsSync(filePath)) {
        filePath = REWRITTEN_FILE;
      }
      
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        article = data.find(a => a.slug === slug);
      }
    }
    
    if (!article) {
      return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    }
    
    // Format content for display
    const formattedContent = formatContent(article.rewrittenContent);
    
    return NextResponse.json({
      id: article.id,
      slug: article.slug,
      title: article.rewrittenTitle,
      originalTitle: article.originalTitle,
      content: formattedContent,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      source: article.source,
      originalUrl: article.originalUrl,
      wordCount: article.wordCount,
      rewrittenAt: article.rewrittenAt
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

function formatContent(content) {
  if (!content) return '';
  
  // Convert plain text to structured sections
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  return paragraphs.map((para, index) => {
    para = para.trim();
    
    // Detect headings
    if (para.length < 50 && (para.includes('：') || para.includes(':') || index === 0)) {
      if (para.length < 80) {
        return { type: 'h2', text: para.replace(/[：:]$/, '') };
      }
    }
    
    // Detect list items
    if (para.match(/^[•··]/) || para.match(/^\d+[.、]/)) {
      return { type: 'list', text: para.replace(/^[•···]\s*/, '').replace(/^\d+[.、]\s*/, '') };
    }
    
    // Regular paragraph
    return { type: 'paragraph', text: para };
  });
}
