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
              <Link href="/">首页</Link>
              <Link href="/articles">文章</Link>
              <Link href="/market">行情</Link>
              <Link href="/consult">咨询</Link>
            </nav>
          </div>
        </header>

        <section className="section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ marginBottom: '1rem' }}>提交成功！</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            感谢您的咨询，我们会在 24 小时内通过邮件回复您。
          </p>
          <Link href="/" className="btn btn-primary">
            返回首页
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
            <Link href="/">首页</Link>
            <Link href="/articles">文章</Link>
            <Link href="/market">行情</Link>
            <Link href="/consult">咨询</Link>
          </nav>
        </div>
      </header>

      <section className="section">
        <h1 className="section-title">专业咨询</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          我们的专业团队为您提供一对一的加密货币投资咨询服务
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
                placeholder="请输入您的姓名"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">电子邮箱 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="请输入您的邮箱"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">咨询主题 *</label>
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
                <option value="">请选择咨询主题</option>
                <option value="investment">投资策略咨询</option>
                <option value="risk">风险管理建议</option>
                <option value="defi">DeFi 协议使用</option>
                <option value="tax">税务合规咨询</option>
                <option value="wallet">钱包安全指导</option>
                <option value="other">其他问题</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">详细内容 *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="请详细描述您的问题或需求，以便我们提供更准确的回复"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={submitting}
            >
              {submitting ? '提交中...' : '提交咨询'}
            </button>
          </form>

          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p>或直接联系我们：</p>
            <p style={{ marginTop: '0.5rem' }}>
              📧 <a href="mailto:contact@cryptoconsult.com" style={{ color: 'var(--primary)' }}>contact@cryptoconsult.com</a>
            </p>
          </div>
        </div>

        {/* Services Info */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>咨询服务</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">投资策略</h3>
              <p className="feature-desc">
                根据您的风险偏好和投资目标，定制个性化的加密货币配置方案
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">市场分析</h3>
              <p className="feature-desc">
                深度解读市场趋势，把握投资机会，规避市场风险
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">安全顾问</h3>
              <p className="feature-desc">
                资产安全配置、钱包管理、私钥保护等专业指导
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
