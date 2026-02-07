import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY || '';

export async function GET(request, { params }) {
  const { slug } = await params;
  
  if (!SUPABASE_SECRET) {
    return NextResponse.json({ error: '数据库未配置' }, { status: 500 });
  }
  
  try {
    // 支持通过 md5_hash 或 id 查询
    const url = `${SUPABASE_URL}/rest/v1/articles?md5_hash=eq.${slug}&select=*`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SECRET}`,
        'apikey': SUPABASE_SECRET,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('Supabase error:', response.status);
      return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      // 尝试用id查询
      const idUrl = `${SUPABASE_URL}/rest/v1/articles?id=eq.${slug}&select=*`;
      const idRes = await fetch(idUrl, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_SECRET}`,
          'apikey': SUPABASE_SECRET,
          'Content-Type': 'application/json'
        }
      });
      
      const idData = await idRes.json();
      if (!idData || idData.length === 0) {
        return NextResponse.json({ error: '文章未找到' }, { status: 404 });
      }
      
      const article = idData[0];
      return NextResponse.json(formatArticle(article));
    }
    
    const article = data[0];
    return NextResponse.json(formatArticle(article));
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

function formatArticle(row) {
  const content = formatContent(row.rewritten_content || '');
  
  return {
    id: row.id,
    slug: row.slug,
    md5: row.md5_hash,
    title: row.rewritten_title,
    originalTitle: row.original_title,
    content: content,
    excerpt: row.excerpt,
    publishedAt: row.published_at,
    source: row.source,
    originalUrl: row.original_url,
    wordCount: row.word_count,
    rewrittenAt: row.rewritten_at,
    categories: row.categories,
    tags: row.tags
  };
}

function formatContent(content) {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  return paragraphs.map((para, index) => {
    para = para.trim();
    
    if (para.startsWith('## ') || (para.length < 50 && (para.includes('：') || para.includes(':')) && index > 0)) {
      const cleanText = para.replace(/^##\s*/, '').replace(/[：:]$/, '');
      if (cleanText.length < 80) {
        return { type: 'h2', text: cleanText };
      }
    }
    
    if (para.match(/^[-•*]\s/) || para.match(/^\d+[.、]\s/)) {
      return { type: 'list', text: para.replace(/^[-•*]\s*/, '').replace(/^\d+[.、]\s*/, '') };
    }
    
    return { type: 'paragraph', text: para };
  });
}
