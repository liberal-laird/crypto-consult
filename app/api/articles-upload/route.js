import { NextResponse } from 'next/server';
import { Client } from 'pg';

// 数据库连接
const dbClient = new Client({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.slug || !body.rewritten_title) {
      return NextResponse.json(
        { error: '缺少必填字段: slug, rewritten_title' },
        { status: 400 }
      );
    }
    
    await dbClient.connect();
    
    // 插入或更新文章
    const result = await dbClient.query(`
      INSERT INTO articles (
        slug, original_title, rewritten_title, original_content, rewritten_content,
        excerpt, original_url, published_at, source, word_count, rewritten_at,
        meta_title, meta_description, keywords, og_title, og_description,
        canonical_url, categories, tags, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      ON CONFLICT (slug) DO UPDATE SET
        rewritten_title = EXCLUDED.rewritten_title,
        rewritten_content = EXCLUDED.rewritten_content,
        excerpt = EXCLUDED.excerpt,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        keywords = EXCLUDED.keywords,
        categories = EXCLUDED.categories,
        tags = EXCLUDED.tags,
        updated_at = NOW()
      RETURNING id, slug
    `, [
      body.slug,
      body.original_title,
      body.rewritten_title,
      body.original_content,
      body.rewritten_content,
      body.excerpt,
      body.original_url,
      body.published_at,
      body.source,
      body.word_count,
      body.rewritten_at,
      body.meta_title,
      body.meta_description,
      body.keywords,
      body.og_title,
      body.og_description,
      body.canonical_url,
      body.categories,
      body.tags,
      body.status || 'published'
    ]);
    
    await dbClient.end();
    
    return NextResponse.json({
      success: true,
      message: result.rowCount > 0 ? '文章上传成功' : '文章无变化',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('上传文章失败:', error);
    return NextResponse.json(
      { error: '上传失败: ' + error.message },
      { status: 500 }
    );
  }
}

// 批量上传
export async function PUT(request) {
  try {
    const articles = await request.json();
    
    if (!Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json(
        { error: '请提供文章数组' },
        { status: 400 }
      );
    }
    
    await dbClient.connect();
    
    let uploaded = 0;
    let skipped = 0;
    let errors = [];
    
    for (const article of articles) {
      try {
        const result = await dbClient.query(`
          INSERT INTO articles (
            slug, original_title, rewritten_title, original_content, rewritten_content,
            excerpt, original_url, published_at, source, word_count, rewritten_at,
            meta_title, meta_description, keywords, og_title, og_description,
            canonical_url, categories, tags, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
          ON CONFLICT (slug) DO UPDATE SET
            rewritten_title = EXCLUDED.rewritten_title,
            rewritten_content = EXCLUDED.rewritten_content,
            excerpt = EXCLUDED.excerpt,
            updated_at = NOW()
          RETURNING id, slug
        `, [
          article.slug,
          article.original_title,
          article.rewritten_title,
          article.original_content,
          article.rewritten_content,
          article.excerpt,
          article.original_url,
          article.published_at,
          article.source,
          article.word_count,
          article.rewritten_at,
          article.meta_title,
          article.meta_description,
          article.keywords,
          article.og_title,
          article.og_description,
          article.canonical_url,
          article.categories,
          article.tags,
          article.status || 'published'
        ]);
        
        if (result.rowCount > 0) uploaded++;
        else skipped++;
        
      } catch (err) {
        errors.push({ slug: article.slug, error: err.message });
      }
    }
    
    await dbClient.end();
    
    return NextResponse.json({
      success: true,
      message: '批量上传完成',
      stats: { uploaded, skipped, total: articles.length },
      errors: errors.length > 0 ? errors : null
    });
    
  } catch (error) {
    console.error('批量上传失败:', error);
    return NextResponse.json(
      { error: '批量上传失败: ' + error.message },
      { status: 500 }
    );
  }
}
