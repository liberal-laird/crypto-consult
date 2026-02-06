import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REWRITTEN_FILE = path.join(process.cwd(), '..', '.openclaw', 'workspace', 'scrapers', 'rewritten_articles.json');
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'rewritten_articles.json');

export async function GET() {
  try {
    // Try both paths
    let filePath = PUBLIC_FILE;
    if (!fs.existsSync(filePath)) {
      filePath = REWRITTEN_FILE;
    }
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        articles: [],
        message: '尚未抓取重寫文章。請先運行爬蟲。'
      });
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(data);
    
    // Format for display
    const formatted = articles.map(a => ({
      id: a.id,
      slug: a.slug,
      title: a.rewrittenTitle,
      excerpt: a.excerpt,
      originalTitle: a.originalTitle,
      publishedAt: a.publishedAt,
      source: 'blockcast',
      wordCount: a.wordCount
    }));
    
    return NextResponse.json({ 
      articles: formatted,
      total: articles.length 
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
