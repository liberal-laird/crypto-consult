import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://fokilsfcnablraexmtju.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.POSTGRES_URL || '';

let supabase = null;
if (supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export async function GET(request, { params }) {
  const { slug } = await params;
  
  if (!supabase) {
    return NextResponse.json({ error: '数据库未配置' }, { status: 500 });
  }
  
  try {
    // 从数据库查询文章
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error || !data) {
      console.error('文章未找到:', slug);
      return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    }
    
    // 格式化内容
    const content = formatContent(data.rewritten_content || '');
    
    return NextResponse.json({
      id: data.id,
      slug: data.slug,
      title: data.rewritten_title,
      originalTitle: data.original_title,
      content: content,
      excerpt: data.excerpt,
      publishedAt: data.published_at,
      source: data.source,
      originalUrl: data.original_url,
      wordCount: data.word_count,
      rewrittenAt: data.rewritten_at
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

function formatContent(content) {
  if (!content) return [];
  
  // Handle array content
  if (Array.isArray(content)) {
    return content;
  }
  
  // Convert plain text to structured sections
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  return paragraphs.map((para, index) => {
    para = para.trim();
    
    // Detect headings
    if (para.startsWith('## ') || (para.length < 50 && (para.includes('：') || para.includes(':')) && index > 0)) {
      const cleanText = para.replace(/^##\s*/, '').replace(/[：:]$/, '');
      if (cleanText.length < 80) {
        return { type: 'h2', text: cleanText };
      }
    }
    
    // Detect list items
    if (para.match(/^[-•*]\s/) || para.match(/^\d+[.、]\s/)) {
      return { type: 'list', text: para.replace(/^[-•*]\s*/, '').replace(/^\d+[.、]\s*/, '') };
    }
    
    return { type: 'paragraph', text: para };
  });
}
