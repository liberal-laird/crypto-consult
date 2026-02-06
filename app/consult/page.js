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
      <main>
        <header className="header">
          <div className="header-content">
            <Link href="/" className="logo">CryptoConsult</Link>
            <nav className="nav">
              <Link href="/">首頁</Link>
              <Link href="/articles">文章</Link>
              <Link href="/market">行情</Link>
              <Link href="/consult">諮詢</Link>
            </nav>
          </div>
        </header>

        <section className="section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ marginBottom: '1rem' }}>提交成功！</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            感謝您的諮詢，我們會在 24 小時內通過郵件回覆您。
          </p>
          <Link href="/" className="btn btn-primary">
            返回首頁
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">CryptoConsult</Link>
          <nav className="nav">
            <Link href="/">首頁</Link>
            <Link href="/articles">文章</Link>
            <Link href="/market">行情</Link>
            <Link href="/consult">諮詢</Link>
          </nav>
        </div>
      </header>

      <section className="section">
        <h1 className="section-title">專業諮詢</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          我們的專業團隊為您提供一對一的加密貨幣投資諮詢服務
        </p>

        <div className="inquiry-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">您的姓名 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="請輸入您的姓名"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">電子郵箱 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="請輸入您的郵箱"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">諮詢主題 *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
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

            <div className="form-group">
              <label htmlFor="message">詳細內容 *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="請詳細描述您的問題或需求，以便我們提供更準確的回覆"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={submitting}
            >
              {submitting ? '提交中...' : '提交諮詢'}
            </button>
          </form>

          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p>或直接聯繫我們：</p>
            <p style={{ marginTop: '0.5rem' }}>
              📧 <a href="mailto:contact@cryptoconsult.com" style={{ color: 'var(--primary)' }}>contact@cryptoconsult.com</a>
            </p>
          </div>
        </div>

        {/* Services Info */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>諮詢服務</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">投資策略</h3>
              <p className="feature-desc">
                根據您的風險偏好和投資目標，定制個性化的加密貨幣配置方案
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">市場分析</h3>
              <p className="feature-desc">
                深度解讀市場趨勢，把握投資機會，規避市場風險
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">安全顧問</h3>
              <p className="feature-desc">
                資產安全配置、錢包管理、私鑰保護等專業指導
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2024 CryptoConsult. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
