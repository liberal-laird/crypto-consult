import { NextResponse } from 'next/server';
import { Client } from 'pg';

const dbClient = new Client({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  try {
    await dbClient.connect();
    
    // 获取所有已发布文章的 md5_hash
    const result = await dbClient.query(`
      SELECT md5_hash FROM articles 
      WHERE status = 'published' 
      AND md5_hash IS NOT NULL
      ORDER BY RANDOM()
    `);
    
    await dbClient.end();
    
    if (result.rows.length === 0) {
      return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
    }
    
    // 随机选择一个 md5_hash
    const md5Hash = result.rows[0].md5_hash;
    
    // 302 跳转到文章页面
    const articleUrl = new URL(`/articles/${md5Hash}`, 'https://www.a8king.com');
    
    return NextResponse.redirect(articleUrl, 302);
    
  } catch (error) {
    console.error('Load page error:', error);
    
    // 出错时跳转到首页
    return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
  }
}
