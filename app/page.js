import Link from 'next/link';

// Server Component - fetches data directly
async function getArticles() {
  try {
    // In production, this would use the database
    // For demo, return sample data
    return [
      {
        id: 1,
        title: '2024年比特币减半解读：历史数据与未来展望',
        slug: 'bitcoin-halving-2024',
        summary: '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
        category: '比特币',
        tags: ['BTC', '减半', '投资'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'DeFi 入门指南：去中心化金融详解',
        slug: 'defi-guide-beginners',
        summary: '全面介绍 DeFi（去中心化金融）的概念、主要协议和投资机会。',
        category: 'DeFi',
        tags: ['DeFi', 'Uniswap', 'Aave'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Layer 2 解决方案详解：比特币与以太坊扩容',
        slug: 'layer2-scaling-solutions',
        summary: '比较分析主流 Layer 2 扩容方案，包括闪电网络、Arbitrum、Optimism 等。',
        category: '技术',
        tags: ['Layer2', '扩容', 'Arbitrum'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        title: '稳定币深度解析：USDT、USDC、DAI 哪家强？',
        slug: 'stablecoins-comparison',
        summary: '对比分析三大主流稳定币的机制、风险和适用场景。',
        category: '稳定币',
        tags: ['稳定币', 'USDT', 'USDC', 'DAI'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      },
      {
        id: 5,
        title: 'NFT 投资指南：如何在熊市中寻找价值',
        slug: 'nft-investment-guide',
        summary: '熊市中的 NFT 投资策略，蓝筹项目筛选标准和风险管理。',
        category: 'NFT',
        tags: ['NFT', '蓝筹', '投资'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      },
      {
        id: 6,
        title: '加密货币税务指南：全球主要国家税务政策',
        slug: 'crypto-tax-guide',
        summary: '美国、欧盟、新加坡、香港等地加密货币税务政策详解。',
        category: '合规',
        tags: ['税务', '合规', '政策'],
        author: 'CryptoConsult',
        created_at: new Date().toISOString()
      }
    ];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            CryptoConsult
          </Link>
          <nav className="nav">
            <Link href="/">首页</Link>
            <Link href="/articles">文章</Link>
            <Link href="/market">行情</Link>
            <Link href="/consult">咨询</Link>
            <Link href="/about">关于</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>加密货币金融咨询平台</h1>
        <p>
          专业、客观、及时的加密货币投资咨询、市场分析和技术解读
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/articles" className="btn btn-primary">
            浏览文章
          </Link>
          <Link href="/consult" className="btn btn-outline">
            立即咨询
          </Link>
        </div>
      </section>

      {/* Market Ticker */}
      <div className="market-ticker">
        <div className="ticker-content">
          <div className="ticker-item">
            <span className="ticker-symbol">BTC</span>
            <span className="ticker-price">$67,842</span>
            <span className="ticker-change">+2.34%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">ETH</span>
            <span className="ticker-price">$3,421</span>
            <span className="ticker-change">+1.87%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">BNB</span>
            <span className="ticker-price">$592</span>
            <span className="ticker-change">+0.95%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">SOL</span>
            <span className="ticker-price">$178</span>
            <span className="ticker-change">+5.67%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">XRP</span>
            <span className="ticker-price">$0.62</span>
            <span className="ticker-change negative">-0.45%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">ADA</span>
            <span className="ticker-price">$0.68</span>
            <span className="ticker-change">+1.23%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">AVAX</span>
            <span className="ticker-price">$42.5</span>
            <span className="ticker-change">+3.21%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">DOT</span>
            <span className="ticker-price">$8.92</span>
            <span className="ticker-change">+0.78%</span>
          </div>
          {/* Repeat for continuous scroll */}
          <div className="ticker-item">
            <span className="ticker-symbol">BTC</span>
            <span className="ticker-price">$67,842</span>
            <span className="ticker-change">+2.34%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">ETH</span>
            <span className="ticker-price">$3,421</span>
            <span className="ticker-change">+1.87%</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">我们的服务</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">市场分析</h3>
            <p className="feature-desc">
              专业的加密货币市场趋势分析，提供投资决策参考
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3 className="feature-title">投资教育</h3>
            <p className="feature-desc">
              从入门到进阶的系统性加密货币投资知识体系
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3 className="feature-title">一对一咨询</h3>
            <p className="feature-desc">
              针对个人情况的定制化投资建议和风险评估
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">风险控制</h3>
            <p className="feature-desc">
              科学的仓位管理和风险控制策略指导
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section">
        <h2 className="section-title">最新文章</h2>
        <div className="articles-grid">
          {articles.map((article) => (
            <article key={article.id} className="article-card">
              <div className="article-content">
                <span className="article-category">{article.category}</span>
                <h3 className="article-title">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="article-summary">{article.summary}</p>
                <div className="article-meta">
                  <span>{article.author}</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="tags">
                  {article.tags?.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/articles" className="btn btn-outline">
            查看更多
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CryptoConsult</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              专业的加密货币金融咨询服务平台
            </p>
          </div>
          <div className="footer-section">
            <h4>快速链接</h4>
            <Link href="/articles">文章</Link>
            <Link href="/market">行情</Link>
            <Link href="/consult">咨询</Link>
          </div>
          <div className="footer-section">
            <h4>帮助</h4>
            <Link href="/faq">常见问题</Link>
            <Link href="/contact">联系我们</Link>
            <Link href="/disclaimer">免责声明</Link>
          </div>
          <div className="footer-section">
            <h4>法律</h4>
            <Link href="/terms">服务条款</Link>
            <Link href="/privacy">隐私政策</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CryptoConsult. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            投资有风险，入市需谨慎。本站内容不构成任何投资建议。
          </p>
        </div>
      </footer>
    </main>
  );
}
