import { NextResponse } from 'next/server';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const ARTICLES_FILE = path.join(process.cwd(), '..', '..', '.openclaw', 'workspace', 'scrapers', 'articles.json');
const PUBLIC_FILE = path.join(process.cwd(), 'public', 'articles.json');

// 数据库连接配置
const dbClient = new Client({
  connectionString: process.env.POSTGRES_URL || 'postgres://postgres.fokilsfcnablraexmtju:YjRQwjYVKvZ8RSSu@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function getArticlesFromDB() {
  try {
    if (!dbClient._connected) {
      await dbClient.connect();
    }
    
    const result = await dbClient.query(`
      SELECT 
        id, slug, rewritten_title as title, rewritten_content as content,
        excerpt, original_url as url, published_at, source, 
        categories, tags, word_count, rewritten_at,
        meta_title, meta_description, keywords
      FROM articles
      WHERE status = 'published'
      ORDER BY published_at DESC
    `);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      summary: row.excerpt || row.title,
      category: row.categories?.[0] || '新聞',
      author: 'Blockcast',
      published_at: row.published_at,
      url: row.original_url,
      source: row.source,
      content: row.content,
      categories: row.categories,
      tags: row.tags,
      wordCount: row.word_count,
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      keywords: row.keywords
    }));
  } catch (err) {
    console.error('DB error:', err.message);
    return null;
  }
}

function getArticlesFromFile() {
  let articlesFile = PUBLIC_FILE;
  if (!fs.existsSync(articlesFile)) {
    articlesFile = ARTICLES_FILE;
  }
  
  if (!fs.existsSync(articlesFile)) {
    return null;
  }
  
  const data = fs.readFileSync(articlesFile, 'utf8');
  const articles = JSON.parse(data);
  
  return articles.map(a => ({
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
}

export async function GET() {
  try {
    // 优先从数据库获取
    const dbArticles = await getArticlesFromDB();
    
    if (dbArticles && dbArticles.length > 0) {
      return NextResponse.json({ articles: dbArticles, source: 'database' });
    }
    
    // 回退到文件
    const fileArticles = getArticlesFromFile();
    
    if (fileArticles) {
      return NextResponse.json({ articles: fileArticles, source: 'file' });
    }
    
    return NextResponse.json({ 
      articles: [],
      message: '尚未抓取文章'
    });
    
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
