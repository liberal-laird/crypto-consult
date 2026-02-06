import Link from 'next/link';
import './globals.css';

function getArticles() {
  return [
    {
      id: 1,
      title: '2024年比特币减半解读：历史数据与未来展望',
      slug: 'bitcoin-halving-2024',
      summary: '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
      category: '比特币',
      tags: ['BTC', '减半', '投资']
    },
    {
      id: 2,
      title: 'DeFi 入门指南：去中心化金融详解',
      slug: 'defi-guide-beginners',
      summary: '全面介绍 DeFi（去中心化金融）的概念、主要协议和投资机会。',
      category: 'DeFi',
      tags: ['DeFi', 'Uniswap', 'Aave']
    },
    {
      id: 3,
      title: 'Layer 2 解决方案详解：比特币与以太坊扩容',
      slug: 'layer2-scaling-solutions',
      summary: '比较分析主流 Layer 2 扩容方案，包括闪电网络、Arbitrum、Optimism 等。',
      category: '技术',
      tags: ['Layer2', '扩容', 'Arbitrum']
    }
  ];
}

function getServices() {
  return [
    { icon: '📊', title: '市场分析', desc: '专业的加密货币市场趋势分析，提供投资决策参考' },
    { icon: '📚', title: '投资教育', desc: '从入门到进阶的系统性加密货币投资知识体系' },
    { icon: '💼', title: '一对一咨询', desc: '针对个人情况的定制化投资建议和风险评估' },
    { icon: '🛡️', title: '风险控制', desc: '科学的仓位管理和风险控制策略指导' }
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
            CryptoConsult
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首页</Link>
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
            <Link href="/consult" style={{ color: '#8b949e', textDecoration: 'none' }}>咨询</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #f7931a 0%, #627eea 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          加密货币金融咨询平台
        </h1>
        <p style={{ color: '#8b949e', fontSize: '1.25rem', marginBottom: '2rem' }}>
          专业、客观、及时的加密货币投资咨询、市场分析和技术解读
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
          }}>
            浏览文章
          </Link>
          <Link href="/consult" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            border: '2px solid #f7931a',
            color: '#f7931a',
            borderRadius: '8px',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            立即咨询
          </Link>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>我们的服务</h2>
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{service.title}</h3>
              <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>最新文章</h2>
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
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>CryptoConsult</h4>
            <p style={{ color: '#8b949e' }}>
              专业的加密货币金融咨询服务平台
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>快速链接</h4>
            <Link href="/articles" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>文章</Link>
            <Link href="/market" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>行情</Link>
            <Link href="/consult" style={{ display: 'block', color: '#8b949e', textDecoration: 'none' }}>咨询</Link>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>帮助</h4>
            <Link href="/contact" style={{ display: 'block', color: '#8b949e', textDecoration: 'none', marginBottom: '0.5rem' }}>联系我们</Link>
            <Link href="/disclaimer" style={{ display: 'block', color: '#8b949e', textDecoration: 'none' }}>免责声明</Link>
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
          <p>© 2024 CryptoConsult. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            投资有风险，入市需谨慎。本站内容不构成任何投资建议。
          </p>
        </div>
      </footer>
    </div>
  );
}
