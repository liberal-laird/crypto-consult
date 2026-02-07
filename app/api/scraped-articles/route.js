import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.POSTGRES_URL || '';

async function querySupabase(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'apikey': SUPABASE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql })
  });
  
  if (!response.ok) {
    const err = await response.text();
    console.error('Supabase error:', err);
    return null;
  }
  
  return response.json();
}

async function getArticlesFromDB() {
  try {
    // 先创建exec_sql函数（如果不存在）
    await querySupabase(`
      CREATE OR REPLACE FUNCTION exec_sql(sql text)
      RETURNS SETOF text AS $$
      BEGIN
        RETURN QUERY EXECUTE sql;
      END;
      $$ LANGUAGE plpgsql;
    `);
    
    // 查询所有文章
    const result = await querySupabase(`
      SELECT id, slug, rewritten_title, excerpt, original_url, published_at, source, word_count, categories, tags
      FROM articles
      WHERE status = 'published'
      ORDER BY published_at DESC
    `);
    
    if (!result || !Array.isArray(result)) {
      return [];
    }
    
    return result.map(row => ({
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
    console.log(`从数据库返回 ${articles.length} 篇文章`);
    
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
