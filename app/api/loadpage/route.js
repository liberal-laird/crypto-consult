import { NextResponse } from 'next/server';

// 預定義的文章 slug 列表
const ARTICLES = [
  '2026/02/07/cardano-s-charles-hoskinson-reveals-usd3-billion-unrealized-loss-in-crypto-rout',
  '2026/02/06/bitcoin-rises-to-usd70-000-extending-bounce-from-thursday-s-crash',
  '2026/02/06/ripple-lays-out-institutional-defi-blueprint-for-xrpl-with-xrp-at-center'
];

export async function GET() {
  try {
    // 隨機選擇一篇文章
    const randomSlug = ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
    const articleUrl = new URL(`/articles/${randomSlug}`, 'https://www.a8king.com');
    return NextResponse.redirect(articleUrl, 302);
  } catch (error) {
    return NextResponse.redirect(new URL('/', 'https://www.a8king.com'));
  }
}
