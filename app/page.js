import Link from 'next/link';
import './globals.css';

function getArticles() {
  return [
    {
      id: 1,
      title: '2024年比特幣減半解讀：歷史數據與未來展望',
      slug: 'bitcoin-halving-2024',
      summary: '深入分析比特幣減半的歷史規律、價格走勢以及對2024年減半的預測。',
      category: '比特幣',
      tags: ['BTC', '減半', '投資']
    },
    {
      id: 2,
      title: 'DeFi 入門指南：去中心化金融詳解',
      slug: 'defi-guide-beginners',
      summary: '全面介紹 DeFi（去中心化金融）的概念、主要協議和投資機會。',
      category: 'DeFi',
      tags: ['DeFi', 'Uniswap', 'Aave']
    },
    {
      id: 3,
      title: 'Layer 2 解決方案詳解：比特幣與以太坊擴容',
      slug: 'layer2-scaling-solutions',
      summary: '比較分析主流 Layer 2 擴容方案，包括閃電網絡、Arbitrum、Optimism 等。',
      category: '技術',
      tags: ['Layer2', '擴容', 'Arbitrum']
    }
  ];
}

function getServices() {
  return [
    { icon: '📊', title: '市場分析', desc: '專業的加密貨幣市場趨勢分析，提供投資決策參考' },
    { icon: '📚', title: '投資教育', desc: '從入門到進階的系統性加密貨幣投資知識體系' },
    { icon: '💼', title: '一對一諮詢', desc: '針對個人情況的定制化投資建議和風險評估' },
    { icon: '🛡️', title: '風險控制', desc: '科學的倉位管理和風險控制策略指導' }
  ];
}

export default function Home() {
  const articles = getArticles();
  const services = getServices();

  return (
    <div style={{
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
            name: 'CryptoA8King - 首頁',
            description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南平台',
            url: 'https://crypto-consult-seven.vercel.app/',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: articles.length,
              itemListElement: articles.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Article',
                  name: article.title,
                  url: `https://crypto-consult-seven.vercel.app/articles/${article.slug}`,
                  description: article.summary,
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
          }} aria-label="CryptoA8King 首頁">
            CryptoA8King
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }} role="navigation" aria-label="主導航">
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首頁</Link>
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
            <Link href="/consult" style={{ color: '#8b949e', textDecoration: 'none' }}>諮詢</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)'
      }} role="banner">
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #f7931a 0%, #627eea 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          加密貨幣金融諮詢平台
        </h1>
        <p style={{ color: '#8b949e', fontSize: '1.25rem', marginBottom: '2rem' }}>
          專業、客觀、及時的加密貨幣投資諮詢、市場分析和技術解讀
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/articles" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#f7931a',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none'
          }} aria-label="瀏覽最新文章">
            瀏覽文章
          </Link>
          <Link href="/consult" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            border: '2px solid #f7931a',
            color: '#f7931a',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none'
          }} aria-label="預約專業諮詢">
            立即諮詢
          </Link>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }} aria-labelledby="services-heading">
        <h2 id="services-heading" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>我們的服務</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, i) => (
            <div key={i} style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }} aria-hidden="true">{service.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }} aria-labelledby="articles-heading">
        <h2 id="articles-heading" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>最新文章</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {articles.map((article) => (
            <article key={article.id} style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(247, 147, 26, 0.2)',
                  color: '#f7931a',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  marginBottom: '0.75rem'
                }}>
                  {article.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  <Link href={`/articles/${article.slug}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {article.title}
                  </Link>
                </h3>
                <p style={{ color: '#8b949e', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {article.summary}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {article.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(98, 126, 234, 0.2)',
                      color: '#627eea',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/articles" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            border: '2px solid #f7931a',
            color: '#f7931a',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            查看更多
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#161b22',
        borderTop: '1px solid #30363d',
        padding: '3rem 2rem'
      }} role="contentinfo">
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>CryptoA8King</h4>
            <p style={{ color: '#8b949e' }}>
              專業的加密貨幣金融諮詢服務平台
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>快速連結</h4>
            <Link href="/articles" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>文章</Link>
            <Link href="/market" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>行情</Link>
            <Link href="/consult" style={{ display: 'block', color: '#8b949e', textDecoration: 'none' }}>諮詢</Link>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>幫助</h4>
            <Link href="/contact" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>聯繫我們</Link>
            <Link href="/disclaimer" style={{ display: 'block', color: '#8b949e', textDecoration: 'none' }}>免責聲明</Link>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          marginTop: '2rem',
          borderTop: '1px solid #30363d',
          color: '#8b949e',
          fontSize: '0.9rem'
        }}>
          <p>© 2024 CryptoA8King. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            投資有風險，入市需謹慎。本站內容不構成任何投資建議。
          </p>
        </div>
      </footer>
    </div>
  );
}
