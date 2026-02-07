import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY || '';

async function getArticlesFromDB() {
  try {
    if (!SUPABASE_SECRET) {
      console.error('SUPABASE_SECRET_KEY 未配置');
      return [];
    }
    
    // 查询所有状态的文章
    const url = `${SUPABASE_URL}/rest/v1/articles?order=published_at.desc&select=*`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SECRET}`,
        'apikey': SUPABASE_SECRET,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('Supabase error:', response.status);
      return [];
    }
    
    const data = await response.json();
    console.log('查询到文章数:', data.length);
    
    return data.map(row => ({
      id: row.id,
      title: row.rewritten_title,
      slug: row.slug,
      summary: row.excerpt || row.rewritten_title,
      category: row.categories?.[0] || '新聞',
      author: 'Blockcast',
      published_at: row.published_at,
      url: row.original_url,
      source: row.source,
      categories: row.categories,
      tags: row.tags
    }));
  } catch (err) {
    console.error('DB error:', err.message);
    return [];
  }
}

export async function GET() {
  try {
    const articles = await getArticlesFromDB();
    console.log(`返回 ${articles.length} 篇文章`);
    
    return NextResponse.json({ 
      articles,
      source: 'database',
      count: articles.length
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
