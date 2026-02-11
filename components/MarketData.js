'use client';

import { useState, useEffect } from 'react';

const POPULAR_PAIRS = [
  'BTC_USDC', 'ETH_USDC', 'BNB_USDC', 'SOL_USDC',
  'XRP_USDC', 'ADA_USDC', 'AVAX_USDC', 'DOT_USDC',
  'MATIC_USDC', 'LINK_USDC', 'UNI_USDC', 'ATOM_USDC'
];

const COIN_NAMES = {
  'BTC': 'Bitcoin', 'ETH': 'Ethereum', 'BNB': 'Binance Coin',
  'SOL': 'Solana', 'XRP': 'Ripple', 'ADA': 'Cardano',
  'AVAX': 'Avalanche', 'DOT': 'Polkadot', 'MATIC': 'Polygon',
  'LINK': 'Chainlink', 'UNI': 'Uniswap', 'ATOM': 'Cosmos'
};

const DEMO_DATA = {
  'BTC': { price: 67842, change24h: 2.34, high: 68500, low: 66200 },
  'ETH': { price: 3421, change24h: 1.87, high: 3480, low: 3350 },
  'BNB': { price: 592, change24h: 0.95, high: 598, low: 585 },
  'SOL': { price: 79.19, change24h: -13.86, high: 93.26, low: 67.79 },
  'XRP': { price: 0.62, change24h: -0.45, high: 0.64, low: 0.61 },
  'ADA': { price: 0.68, change24h: 1.23, high: 0.70, low: 0.66 },
  'AVAX': { price: 42.5, change24h: 3.21, high: 44.0, low: 41.0 },
  'DOT': { price: 8.92, change24h: 0.78, high: 9.10, low: 8.75 },
  'MATIC': { price: 1.23, change24h: -1.45, high: 1.28, low: 1.20 },
  'LINK': { price: 18.5, change24h: 2.11, high: 19.0, low: 18.0 },
  'UNI': { price: 9.85, change24h: 3.45, high: 10.2, low: 9.50 },
  'ATOM': { price: 12.3, change24h: -0.89, high: 12.6, low: 12.1 }
};

function formatPrice(price) {
  if (price >= 1000) {
    return '$' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (price >= 1) {
    return '$' + price.toFixed(2);
  } else {
    return '$' + price.toFixed(4);
  }
}

export default function MarketTicker() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        // Use our own API proxy to avoid CORS issues
        const response = await fetch('/api/market', {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setPrices(data.data);
            setLastUpdate(new Date().toLocaleString('zh-CN'));
            setError(null);
          } else {
            throw new Error(data.error || 'Failed to fetch data');
          }
        } else {
          throw new Error('API returned error');
        }
      } catch (err) {
        console.error('Failed to fetch prices:', err);
        setError(err.message);
        // Use demo data as fallback
        const demoResults = Object.entries(DEMO_DATA).map(([symbol, data]) => ({
          symbol,
          name: COIN_NAMES[symbol] || symbol,
          ...data
        }));
        demoResults.sort((a, b) => b.price - a.price);
        setPrices(demoResults);
        setLastUpdate(new Date().toLocaleString('zh-CN'));
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    
    // Refresh every 30 seconds (faster than 60s)
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        數據來源：Backpack Exchange {error && '(演示數據)'} • 更新於 {lastUpdate}
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
              <th style={{ padding: '1rem', textAlign: 'left' }}>幣種</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>價格</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>24h 漲跌</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>24h 最高</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>24h 最低</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  加載中...
                </td>
              </tr>
            ) : (
              prices.map((coin, index) => (
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
                    {formatPrice(coin.high)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--danger)' }}>
                    {formatPrice(coin.low)}
                  </td>
                </tr>
              ))
            )}
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
            {prices.length}
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
    </>
  );
}
