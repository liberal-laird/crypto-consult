#!/usr/bin/env node
/**
 * 生成 sitemap.xml
 * 用法: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITEMAP_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');
const A8KING_API = 'https://www.a8king.com/api/scraped-articles';

async function fetchArticles() {
  return new Promise((resolve, reject) => {
    https.get(A8KING_API, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.articles || []);
        } catch (err) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function generateSitemap(articles) {
  const baseUrl = 'https://www.a8king.com';
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/articles</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/market</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/consult</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // 添加文章
  for (const article of articles) {
    const slug = article.slug;
    const title = article.title || article.rewritten_title || '';
    const date = article.published_at || article.publishedAt || today;
    
    xml += `
  
  <url>
    <loc>${baseUrl}/articles/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${date.split('T')[0]}</lastmod>
    <news:news>
      <news:publication>
        <news:name>CryptoA8King</news:name>
        <news:language>zh</news:language>
      </news:publication>
      <news:publication_date>${date.split('T')[0]}</news:publication_date>
      <news:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>`;
  }

  xml += `
  
</urlset>`;

  return xml;
}

async function main() {
  console.log('🔄 生成 sitemap.xml...\n');
  
  // 獲取文章
  console.log('📡 從 API 獲取文章...');
  const articles = await fetchArticles();
  console.log(`✅ 找到 ${articles.length} 篇文章\n`);
  
  // 生成 sitemap
  console.log('📝 生成 sitemap.xml...');
  const sitemap = generateSitemap(articles);
  
  // 保存文件
  fs.writeFileSync(SITEMAP_FILE, sitemap);
  console.log(`✅ 已保存: ${SITEMAP_FILE}\n`);
  
  // 統計
  console.log('📊 統計:');
  console.log(`   總文章數: ${articles.length}`);
  console.log(`   文件大小: ${(sitemap.length / 1024).toFixed(2)} KB\n`);
  
  console.log('✨ 完成!');
}

main().catch(console.error);
