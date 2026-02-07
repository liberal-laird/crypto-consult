"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/scraped-articles');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const allArticles = [...articles];

  const filteredArticles = filter === 'all' 
    ? allArticles 
    : allArticles.filter(a => a.category === filter);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const categories = ['all', '比特幣', 'DeFi', '技術', '新聞', '投資', 'MICA分析'];

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0d1117',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Structured Data - CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: '文章列表 - CryptoA8King',
            description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南文章',
            url: 'https://crypto-consult-seven.vercel.app/articles',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allArticles.length,
              itemListElement: allArticles.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Article',
                  name: article.title,
                  url: `https://crypto-consult-seven.vercel.app/articles/${article.md5 || article.id}`,
                  description: article.summary || article.excerpt,
                  articleSection: article.category
                }
              }))
            }
          })
        }}
      />
      
      {/* Header */}
      <header style={{ 
        background: '#161b22', 
        borderBottom: '1px solid #30363d',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#f7931a', 
            textDecoration: 'none' 
          }}>
            CryptoA8King
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首頁</Link>
            <Link href="/articles" style={{ color: '#f7931a', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
          </nav>
        </div>
      </header>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          全部文章
        </h1>
        
        {/* Filter Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '20px',
                border: filter === cat ? 'none' : '1px solid #30363d',
                background: filter === cat ? '#f7931a' : 'transparent',
                color: filter === cat ? '#000' : '#8b949e',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#8b949e' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            正在加載文章...
          </div>
        )}

        {/* Articles Grid */}
        {!loading && (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                style={{
                  background: '#161b22',
                  borderRadius: '12px',
                  border: '1px solid #30363d',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ 
                      background: 'rgba(98, 126, 234, 0.2)',
                      color: '#627eea',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.15rem', 
                    marginBottom: '0.75rem',
                    lineHeight: 1.4
                  }}>
                    {article.md5 || article.id ? (
                      <Link 
                        href={`/articles/${encodeURIComponent(article.md5 || article.id)}`}
                        style={{ 
                          color: '#ffffff', 
                          textDecoration: 'none' 
                        }}
                      >
                        {article.title}
                      </Link>
                    ) : (
                      <span style={{ color: '#ffffff' }}>{article.title}</span>
                    )}
                  </h3>
                  
                  <p style={{ 
                    color: '#8b949e', 
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    lineHeight: 1.6
                  }}>
                    {article.summary || article.excerpt}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    color: '#6e7681',
                    fontSize: '0.8rem'
                  }}>
                    <span>📅 {formatDate(article.created_at || article.published_at)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredArticles.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#6e7681' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
            沒有找到相關文章
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#161b22', 
        borderTop: '1px solid #30363d',
        padding: '2rem',
        marginTop: '3rem',
        textAlign: 'center',
        color: '#6e7681',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 CryptoA8King. All rights reserved.</p>
      </footer>
    </main>
  );
}
