import { NextResponse } from 'next/server';
import { Client } from 'pg';

const dbClient = new Client({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000 // 5秒超時
});

export async function GET() {
  try {
    await dbClient.connect();
    
    // 获取所有已发布文章的 md5_hash 或 slug
    const result = await dbClient.query(`
      SELECT COALESCE(md5_hash, slug) as identifier FROM articles 
      WHERE status = 'published'
      AND (md5_hash IS NOT NULL OR slug IS NOT NULL)
      ORDER BY RANDOM()
      LIMIT 1
    `);
    
    await dbClient.end();
    
    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
    }
    
    // 随机选择一个标识符 (md5_hash 或 slug)
    const identifier = result.rows[0].identifier;
    
    // 302 跳转到文章页面
    const articleUrl = new URL(`/articles/${identifier}`, 'https://www.a8king.com');
    
    return NextResponse.redirect(articleUrl, 302);
    
  } catch (error) {
    console.error('Load page error:', error.message);
    
    // 出错时跳转到首页
    return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
  }
}
