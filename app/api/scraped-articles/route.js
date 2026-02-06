import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ARTICLES_FILE = path.join(process.cwd(), '..', '..', '.openclaw', 'workspace', 'scrapers', 'articles.json');
// Fallback to public folder (copied during deployment)
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'articles.json');

export async function GET() {
  try {
    // Check both paths
    let articlesFile = PUBLIC_FILE;
    if (!fs.existsSync(articlesFile)) {
      articlesFile = ARTICLES_FILE;
    }
    
    if (!fs.existsSync(articlesFile)) {
      return NextResponse.json({ 
        articles: [],
        message: '尚未抓取文章'
      });
    }
    
    // Read scraped articles
    const data = fs.readFileSync(articlesFile, 'utf8');
    const articles = JSON.parse(data);
    
    // Transform for display
    const formatted = articles.map(a => ({
      id: a.id,
      title: a.title,
      slug: a.slug || a.url.split('/').filter(Boolean).pop(),
      summary: a.excerpt || a.title,
      category: mapCategory(a.slug || a.url),
      author: 'Blockcast',
      published_at: a.publishedAt,
      url: a.url,
      source: 'blockcast'
    }));
    
    return NextResponse.json({ articles: formatted });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

function mapCategory(slug) {
  const categories = {
    'news': '新聞',
    'investment': '投資',
    'trends': '趨勢',
    'mica': 'MICA分析',
    'press-release': '新聞稿',
    'crypto-exchanges': '交易所'
  };
  
  for (const [key, value] of Object.entries(categories)) {
    if (slug?.toLowerCase().includes(key)) return value;
  }
  
  return '新聞';
}
