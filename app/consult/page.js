'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function ConsultPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));    
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <main style={{ 
        minHeight: '100vh', 
        background: '#0d1117',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
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
              <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
              <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
              <Link href="/consult" style={{ color: '#f7931a', textDecoration: 'none' }}>諮詢</Link>
            </nav>
          </div>
        </header>

        <section style={{ maxWidth: '600px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>提交成功！</h1>
          <p style={{ color: '#8b949e', marginBottom: '2rem' }}>
            感謝您的諮詢，我們會在 24 小時內通過郵件回覆您。
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#f7931a',
            color: '#000',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            返回首頁
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0d1117',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Structured Data - ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: '聯繫我們 - CryptoA8King',
            description: '專業加密貨幣投資諮詢服務',
            url: 'https://crypto-consult-seven.vercel.app/consult',
            mainEntity: {
              '@type': 'Organization',
              name: 'CryptoA8King',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '',
                email: 'contact@crypto-consult.com',
                contactType: 'customer service',
                availableLanguage: ['Chinese', 'English']
              }
            }
          })
        }}
      />
      
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
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
            <Link href="/consult" style={{ color: '#f7931a', textDecoration: 'none' }}>諮詢</Link>
          </nav>
        </div>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          專業諮詢
        </h1>
        <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          我們的專業團隊為您提供一對一的加密貨幣投資諮詢服務
        </p>

        <form onSubmit={handleSubmit} style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e' }}>您的姓名 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="請輸入您的姓名"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e' }}>電子郵箱 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="請輸入您的郵箱"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e' }}>諮詢主題 *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            >
              <option value="">請選擇諮詢主題</option>
              <option value="investment">投資策略諮詢</option>
              <option value="risk">風險管理建議</option>
              <option value="defi">DeFi 協議使用</option>
              <option value="tax">稅務合規諮詢</option>
              <option value="wallet">錢包安全指導</option>
              <option value="other">其他問題</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e' }}>詳細內容 *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="請詳細描述您的問題或需求，以便我們提供更準確的回覆"
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: '#f7931a',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1
            }}
            disabled={submitting}
          >
            {submitting ? '提交中...' : '提交諮詢'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid #30363d',
          textAlign: 'center',
          color: '#8b949e'
        }}>
          <p>或直接聯繫我們：</p>
          <p style={{ marginTop: '0.5rem' }}>
            📧 <a href="mailto:contact@crypto-consult.com" style={{ color: '#f7931a', textDecoration: 'none' }}>contact@crypto-consult.com</a>
          </p>
        </div>
      </section>

      {/* Services Info */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>諮詢服務</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>投資策略</h3>
            <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
              根據您的風險偏好和投資目標，定制個性化的加密貨幣配置方案
            </p>
          </div>
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>市場分析</h3>
            <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
              深度解讀市場趨勢，把握投資機會，規避市場風險
            </p>
          </div>
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>安全顧問</h3>
            <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>
              資產安全配置、錢包管理、私鑰保護等專業指導
            </p>
          </div>
        </div>
      </section>

      <footer style={{ 
        background: '#161b22', 
        borderTop: '1px solid #30363d',
        padding: '2rem',
        textAlign: 'center',
        color: '#6e7681',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 CryptoA8King. All rights reserved.</p>
      </footer>
    </main>
  );
}
