"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        if (!res.ok) throw new Error('文章未找到');
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArticle();
  }, [slug]);

  // Add structured data when article is loaded
  useEffect(() => {
    if (article) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        author: {
          '@type': 'Organization',
          name: 'CryptoA8King',
          url: 'https://crypto-consult-seven.vercel.app'
        },
        publisher: {
          '@type': 'Organization',
          name: 'CryptoA8King',
          logo: {
            '@type': 'ImageObject',
            url: 'https://crypto-consult-seven.vercel.app/icon.svg'
          }
        },
        datePublished: article.publishedAt,
        dateModified: article.rewrittenAt || article.publishedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://crypto-consult-seven.vercel.app/articles/${article.slug}`
        },
        wordCount: article.wordCount,
        articleSection: '加密貨幣',
        inLanguage: 'zh-TW'
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [article]);

  if (loading) {
    return (
      <main style={{ 
        minHeight: '100vh', 
        background: '#0d1117',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>加載中...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main style={{ 
        minHeight: '100vh', 
        background: '#0d1117',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
          <h1>文章未找到</h1>
          <p style={{ color: '#8b949e', marginTop: '1rem' }}>
            {error || '這篇文章可能已被移除'}
          </p>
          <Link 
            href="/articles"
            style={{ 
              display: 'inline-block',
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#f7931a',
              color: '#000',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            返回文章列表
          </Link>
        </div>
      </main>
    );
  }

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

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0d1117',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
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
          maxWidth: '800px', 
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

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link href="/articles" style={{ 
          color: '#8b949e', 
          textDecoration: 'none', 
          display: 'inline-block', 
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}>
          ← 返回文章列表
        </Link>

        {/* Title */}
        <h1 style={{ 
          fontSize: '2rem', 
          lineHeight: 1.4, 
          marginBottom: '1rem',
          fontWeight: 700 
        }}>
          {article.title}
        </h1>

        {/* Original Title */}
        {article.originalTitle !== article.title && (
          <p style={{ 
            color: '#8b949e', 
            fontSize: '0.95rem', 
            marginBottom: '1.5rem',
            fontStyle: 'italic'
          }}>
            原文: {article.originalTitle}
          </p>
        )}

        {/* Meta */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          color: '#6e7681', 
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          <span>📅 {formatDate(article.publishedAt)}</span>
          <span>📝 {article.wordCount} 字</span>
        </div>

        {/* Content */}
        <div style={{ 
          lineHeight: 1.9, 
          fontSize: '1.05rem',
          color: '#d0d7de'
        }}>
          {Array.isArray(article.content) ? (
            article.content.map((item, index) => {
              switch (item.type) {
                case 'h2':
                  return (
                    <h2 key={index} style={{ 
                      fontSize: '1.4rem', 
                      marginTop: '2rem', 
                      marginBottom: '1rem',
                      color: '#f7931a',
                      fontWeight: 600
                    }}>
                      {item.text}
                    </h2>
                  );
                case 'list':
                  return (
                    <li key={index} style={{ 
                      marginLeft: '1.5rem', 
                      marginBottom: '0.5rem',
                      color: '#d0d7de'
                    }}>
                      {item.text}
                    </li>
                  );
                default:
                  return (
                    <p key={index} style={{ marginBottom: '1rem' }}>
                      {item.text}
                    </p>
                  );
              }
            })
          ) : (
            <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
          )}
        </div>

        {/* Google Adsense */}
        <div style={{ marginTop: '2rem' }}>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4522670236044605"
            crossOrigin="anonymous"
          />
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4522670236044605"
            data-ad-slot="7309209376"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
            }}
          />
        </div>

        {/* Divider */}
        <hr style={{ 
          border: 'none', 
          borderTop: '1px solid #30363d', 
          margin: '2rem 0' 
        }} />

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <a 
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '0.6rem 1.2rem',
              background: '#238636',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            🔗 查看原文
          </a>
        </div>

        {/* Disclaimer */}
        <div style={{ 
          marginTop: '2.5rem', 
          padding: '1.25rem', 
          background: 'rgba(255, 193, 7, 0.1)', 
          borderRadius: '12px',
          border: '1px solid #ffc107',
          fontSize: '0.85rem'
        }}>
          <strong style={{ color: '#ffc107', display: 'block', marginBottom: '0.5rem' }}>
            ℹ️ 內容說明
          </strong>
          <p style={{ color: '#8b949e', margin: 0 }}>
            本文內容經過自動重寫處理，僅供參考。投資有風險，請 DYOR。
          </p>
        </div>
      </article>

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
