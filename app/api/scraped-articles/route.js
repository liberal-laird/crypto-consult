import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 使用 Supabase 直接连接
const supabaseUrl = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.POSTGRES_URL || '';

let supabase = null;

if (supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

async function getArticlesFromDB() {
  if (!supabase) {
    console.error('Supabase 未配置');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id, slug, rewritten_title, rewritten_content, excerpt, 
        original_url, published_at, source, word_count, rewritten_at,
        meta_title, meta_description, keywords, categories, tags
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Supabase 查询错误:', error.message);
      return null;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
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
      content: row.rewritten_content,
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

export async function GET() {
  try {
    // 从数据库获取所有来源的文章
    const dbArticles = await getArticlesFromDB();
    
    if (dbArticles && dbArticles.length > 0) {
      console.log(`从数据库返回 ${dbArticles.length} 篇文章`);
      return NextResponse.json({ articles: dbArticles, source: 'database' });
    }
    
    return NextResponse.json({ 
      articles: [],
      message: '数据库中暂无文章'
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
