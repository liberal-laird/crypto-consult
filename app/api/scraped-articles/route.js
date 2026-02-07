import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://fokilsfcnablraexmtju.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZva2lsc2ZjbmFibHJhZXhtdGp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4MDgwMCwiZXhwIjoyMDg1OTc2ODAwfQ.IJBK-_22D5xfkIM6bKCPjG2GYzQH8Vouq_clpN8aYVw';

async function getArticlesFromDB() {
  try {
    // 使用 Supabase REST API 直接查询
    const url = `${SUPABASE_URL}/rest/v1/articles?status=eq.published&order=published_at.desc&select=*`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Range': '0-100'
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
