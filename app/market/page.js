import Link from 'next/link';

async function getMarketData() {
  // In production, fetch from Backpack API
  // const client = new BackpackClient();
  // const tickers = await client.getAllTickers();
  
  // Demo data
  return [
    { symbol: 'BTC', name: 'Bitcoin', price: 67842, change24h: 2.34, volume24h: 28500000000, marketCap: 1320000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 3421, change24h: 1.87, volume24h: 15200000000, marketCap: 411000000000 },
    { symbol: 'BNB', name: 'Binance Coin', price: 592, change24h: 0.95, volume24h: 1800000000, marketCap: 87000000000 },
    { symbol: 'SOL', name: 'Solana', price: 178, change24h: 5.67, volume24h: 5200000000, marketCap: 78000000000 },
    { symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: -0.45, volume24h: 1200000000, marketCap: 34000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.68, change24h: 1.23, volume24h: 450000000, marketCap: 24000000000 },
    { symbol: 'AVAX', name: 'Avalanche', price: 42.5, change24h: 3.21, volume24h: 680000000, marketCap: 17000000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 8.92, change24h: 0.78, volume24h: 320000000, marketCap: 12500000000 },
    { symbol: 'MATIC', name: 'Polygon', price: 1.23, change24h: -1.45, volume24h: 520000000, marketCap: 11500000000 },
    { symbol: 'LINK', name: 'Chainlink', price: 18.5, change24h: 2.11, volume24h: 780000000, marketCap: 10900000000 },
    { symbol: 'UNI', name: 'Uniswap', price: 9.85, change24h: 3.45, volume24h: 420000000, marketCap: 7400000000 },
    { symbol: 'ATOM', name: 'Cosmos', price: 12.3, change24h: -0.89, volume24h: 280000000, marketCap: 4800000000 },
    { symbol: 'NEAR', name: 'NEAR Protocol', price: 8.45, change24h: 4.23, volume24h: 520000000, marketCap: 9500000000 },
    { symbol: 'APT', name: 'Aptos', price: 14.2, change24h: 6.78, volume24h: 380000000, marketCap: 6200000000 },
    { symbol: 'ARB', name: 'Arbitrum', price: 1.85, change24h: 2.56, volume24h: 680000000, marketCap: 4700000000 }
  ];
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  return num.toLocaleString();
}

function formatPrice(price) {
  if (price >= 1000) {
    return '$' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (price >= 1) {
    return '$' + price.toFixed(2);
  } else {
    return '$' + price.toFixed(4);
  }
}

export default async function MarketPage() {
  const marketData = await getMarketData();

  return (
    <main>
      {/* Header */}
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
        <h1 className="section-title">实时行情</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          数据来源：Backpack Exchange • 更新于 {new Date().toLocaleString('zh-CN')}
        </p>

        <div style={{ 
          overflowX: 'auto',
          borderRadius: '12px',
          border: '1px solid var(--border)'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'var(--bg-card)'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>#</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>币种</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>价格</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>24h 涨跌</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>24h 成交量</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>市值</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((coin, index) => (
                <tr key={coin.symbol} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontWeight: 'bold' }}>{coin.symbol}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {coin.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
                    {formatPrice(coin.price)}
                  </td>
                  <td style={{ 
                    padding: '1rem', 
                    textAlign: 'right',
                    color: coin.change24h >= 0 ? 'var(--success)' : 'var(--danger)'
                  }}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>
                    {formatNumber(coin.volume24h)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>
                    {formatNumber(coin.marketCap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Market Stats */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '3rem'
        }}>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              $2.45T
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>全球加密货币市值</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              $85.2B
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>24h 交易量</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💹</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              52.3%
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>BTC 市占率</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {marketData.length}
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>监控币种</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ 
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(255, 193, 7, 0.1)',
          borderRadius: '8px',
          border: '1px solid var(--warning)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong style={{ color: 'var(--warning)' }}>风险提示：</strong>
          加密货币市场波动极大，价格可能快速变化。过往表现不代表未来收益。请 DYOR 并仅投资您能承受损失的资金。
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
