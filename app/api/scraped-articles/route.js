import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY || '';

async function getArticlesFromDB(page = 1, limit = 30) {
  try {
    if (!SUPABASE_SECRET) {
      console.error('SUPABASE_SECRET_KEY 未配置');
      return { articles: [], total: 0 };
    }
    
    // 先获取总数
    const countUrl = `${SUPABASE_URL}/rest/v1/articles?select=id`;
    const countResponse = await fetch(countUrl, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SECRET}`,
        'apikey': SUPABASE_SECRET
      }
    });
    
    if (!countResponse.ok) {
      console.error('Supabase count error:', countResponse.status);
      return { articles: [], total: 0 };
    }
    
    const countData = await countResponse.json();
    const total = countData.length || 0;
    
    // 计算分页
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // 如果请求超出范围，返回空
    if (from >= total) {
      return { articles: [], total, pagination: { page, limit, hasMore: false } };
    }
    
    // 获取分页数据
    const url = `${SUPABASE_URL}/rest/v1/articles?order=published_at.desc&offset=${from}&limit=${limit}&select=*`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SECRET}`,
        'apikey': SUPABASE_SECRET,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('Supabase error:', response.status);
      return { articles: [], total };
    }
    
    const data = await response.json();
    console.log(`查询到 ${data.length} 篇文章 (第 ${page} 页)`);
    
    const articles = data.map(row => ({
      id: row.id,
      title: row.rewritten_title,
      slug: row.slug,
      md5: row.md5_hash,
      summary: row.excerpt || row.rewritten_title,
      category: row.categories?.[0] || '新聞',
      author: 'Blockcast',
      published_at: row.published_at,
      url: row.original_url,
      source: row.source,
      categories: row.categories,
      tags: row.tags
    }));
    
    return { 
      articles, 
      total,
      pagination: {
        page,
        limit,
        total,
        hasMore: to < total - 1
      }
    };
  } catch (err) {
    console.error('DB error:', err.message);
    return { articles: [], total: 0 };
  }
}

export async function GET(request) {
  try {
    // 解析分页参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 30;
    
    console.log(`API 调用: page=${page}, limit=${limit}`);
    
    const result = await getArticlesFromDB(page, limit);
    
    console.log(`返回 ${result.articles.length} 篇文章`);
    
    return NextResponse.json({ 
      articles: result.articles,
      source: 'database',
      pagination: result.pagination,
      count: result.articles.length
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
