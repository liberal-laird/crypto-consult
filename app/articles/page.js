import Link from 'next/link';

async function getArticles() {
  return [
    {
      id: 1,
      title: '2024年比特币减半解读：历史数据与未来展望',
      slug: 'bitcoin-halving-2024',
      summary: '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
      category: '比特币',
      tags: ['比特币', '减半', 'BTC', '2024'],
      author: 'CryptoConsult',
      created_at: '2024-01-15'
    },
    {
      id: 2,
      title: 'DeFi 入门指南：去中心化金融详解',
      slug: 'defi-guide-beginners',
      summary: '全面介绍 DeFi（去中心化金融）的概念、主要协议和投资机会。',
      category: 'DeFi',
      tags: ['DeFi', 'Uniswap', 'Aave'],
      author: 'CryptoConsult',
      created_at: '2024-01-20'
    },
    {
      id: 3,
      title: 'Layer 2 解决方案详解：比特币与以太坊扩容',
      slug: 'layer2-scaling-solutions',
      summary: '比较分析主流 Layer 2 扩容方案，包括闪电网络、Arbitrum、Optimism 等。',
      category: '技术',
      tags: ['Layer2', '扩容', 'Arbitrum'],
      author: 'CryptoConsult',
      created_at: '2024-01-25'
    },
    {
      id: 4,
      title: '稳定币深度解析：USDT、USDC、DAI 哪家强？',
      slug: 'stablecoins-comparison',
      summary: '对比分析三大主流稳定币的机制、风险和适用场景。',
      category: '稳定币',
      tags: ['稳定币', 'USDT', 'USDC', 'DAI'],
      author: 'CryptoConsult',
      created_at: '2024-02-01'
    },
    {
      id: 5,
      title: 'NFT 投资指南：如何在熊市中寻找价值',
      slug: 'nft-investment-guide',
      summary: '熊市中的 NFT 投资策略，蓝筹项目筛选标准和风险管理。',
      category: 'NFT',
      tags: ['NFT', '蓝筹', '投资'],
      author: 'CryptoConsult',
      created_at: '2024-02-05'
    },
    {
      id: 6,
      title: '加密货币税务指南：全球主要国家税务政策',
      slug: 'crypto-tax-guide',
      summary: '美国、欧盟、新加坡、香港等地加密货币税务政策详解。',
      category: '合规',
      tags: ['税务', '合规', '政策'],
      author: 'CryptoConsult',
      created_at: '2024-02-10'
    }
  ];
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function ArticlesPage() {
  const articles = await getArticles();

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
        <h1 className="section-title">全部文章</h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button className="btn btn-primary">全部</button>
          <button className="btn btn-outline">比特币</button>
          <button className="btn btn-outline">DeFi</button>
          <button className="btn btn-outline">Layer2</button>
          <button className="btn btn-outline">NFT</button>
          <button className="btn btn-outline">合规</button>
        </div>

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

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn btn-outline" disabled>
            没有更多文章
          </button>
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
