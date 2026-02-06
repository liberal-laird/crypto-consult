import Link from 'next/link';

// Backpack API client - works without API key for public data
async function fetchBackpackTicker(symbol) {
  try {
    const response = await fetch(
      `https://api.backpack.exchange/api/v1/ticker?symbol=${symbol}`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);
  }
  return null;
}

async function getMarketData() {
  const symbols = [
    'BTC_USDC', 'ETH_USDC', 'BNB_USDC', 'SOL_USDC',
    'XRP_USDC', 'ADA_USDC', 'AVAX_USDC', 'DOT_USDC',
    'MATIC_USDC', 'LINK_USDC', 'UNI_USDC', 'ATOM_USDC',
    'NEAR_USDC', 'APT_USDC', 'ARB_USDC'
  ];

  const coinNames = {
    'BTC': 'Bitcoin', 'ETH': 'Ethereum', 'BNB': 'Binance Coin',
    'SOL': 'Solana', 'XRP': 'Ripple', 'ADA': 'Cardano',
    'AVAX': 'Avalanche', 'DOT': 'Polkadot', 'MATIC': 'Polygon',
    'LINK': 'Chainlink', 'UNI': 'Uniswap', 'ATOM': 'Cosmos',
    'NEAR': 'NEAR Protocol', 'APT': 'Aptos', 'ARB': 'Arbitrum'
  };

  // Fetch all tickers in parallel
  const promises = symbols.map(async (symbol) => {
    const ticker = await fetchBackpackTicker(symbol);
    if (ticker) {
      return {
        symbol: symbol.replace('_USDC', ''),
        name: coinNames[symbol.replace('_USDC', '')] || symbol.replace('_USDC', ''),
        price: parseFloat(ticker.price) || 0,
        change24h: parseFloat(ticker.priceChange24h) || 0,
        volume24h: parseFloat(ticker.volume24h) || 0,
        high24h: parseFloat(ticker.high24h) || 0,
        low24h: parseFloat(ticker.low24h) || 0
      };
    }
    return null;
  });

  const results = await Promise.all(promises);
  
  // Filter out null results and sort by price (descending)
  const validData = results.filter(Boolean).sort((a, b) => b.price - a.price);
  
  return validData;
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
                <th style={{ padding: '1rem', textAlign: 'right' }}>24h 最高</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>24h 最低</th>
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
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--success)' }}>
                    {formatPrice(coin.high24h)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--danger)' }}>
                    {formatPrice(coin.low24h)}
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
              {marketData.length}
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>监控币种</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              60s
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>自动刷新</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Backpack
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>数据源</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💹</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              USDC
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>计价单位</div>
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
