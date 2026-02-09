import { NextResponse } from 'next/server';

// 預定義的文章 md5_hash 列表（從數據庫獲取）
const ARTICLES = [
  'be90e522d8352abe9d2918aba450acb0',  // bitcoin-rises
  'ee5240d5d3153f8fe42d081bef8deb61',  // ripple-defi
  'c0825cee040904881d09c526b73410b9',  // citi-coinbase
  '86c3f5e48ddc9b8e63575f48dbceb2ad',  // crypto-markets-rebound
  '54db854a11213e1bd80f17c9c0f9272f'   // bitwise-anxiety
];

export async function GET() {
  try {
    // 隨機選擇一篇文章
    const randomMd5 = ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
    const articleUrl = new URL(`/articles/${randomMd5}`, 'https://www.a8king.com');
    return NextResponse.redirect(articleUrl, 302);
  } catch (error) {
    return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
  }
}
