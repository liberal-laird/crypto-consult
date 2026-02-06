'use client';

import { useState, useEffect } from 'react';

const POPULAR_PAIRS = [
  'BTC_USDC', 'ETH_USDC', 'BNB_USDC', 'SOL_USDC',
  'XRP_USDC', 'ADA_USDC', 'AVAX_USDC', 'DOT_USDC'
];

const COIN_NAMES = {
  'BTC': 'Bitcoin', 'ETH': 'Ethereum', 'BNB': 'Binance Coin',
  'SOL': 'Solana', 'XRP': 'Ripple', 'ADA': 'Cardano',
  'AVAX': 'Avalanche', 'DOT': 'Polkadot'
};

const DEMO_DATA = {
  'BTC': { price: 67842, change24h: 2.34 },
  'ETH': { price: 3421, change24h: 1.87 },
  'BNB': { price: 592, change24h: 0.95 },
  'SOL': { price: 78.97, change24h: -14.09 },
  'XRP': { price: 0.62, change24h: -0.45 },
  'ADA': { price: 0.68, change24h: 1.23 },
  'AVAX': { price: 42.5, change24h: 3.21 },
  'DOT': { price: 8.92, change24h: 0.78 }
};

export default function MarketTicker() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const results = [];
        
        for (const pair of POPULAR_PAIRS) {
          try {
            const symbol = pair.replace('_USDC', '');
            const response = await fetch(
              `https://api.backpack.exchange/api/v1/ticker?symbol=${pair}`,
              { cache: 'no-store' }
            );
            
            if (response.ok) {
              const data = await response.json();
              results.push({
                symbol,
                price: parseFloat(data.lastPrice) || 0,
                change24h: (parseFloat(data.priceChangePercent) * 100) || 0
              });
            } else {
              const demo = DEMO_DATA[symbol];
              if (demo) results.push({ symbol, ...demo });
            }
          } catch (err) {
            const demo = DEMO_DATA[symbol];
            if (demo) results.push({ symbol, ...demo });
          }
        }

        setPrices(results);
      } catch (err) {
        console.error('Failed to fetch prices:', err);
        // Use demo data
        const demoResults = Object.entries(DEMO_DATA).map(([symbol, data]) => ({
          symbol,
          ...data
        }));
        setPrices(demoResults);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-ticker">
      <div className="ticker-content">
        {loading ? (
          <div className="ticker-item">
            <span>Loading prices...</span>
          </div>
        ) : (
          <>
            {prices.map((item) => (
              <div key={item.symbol} className="ticker-item">
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">
                  ${item.price >= 1000 ? item.price.toLocaleString() : item.price.toFixed(item.price >= 1 ? 2 : 4)}
                </span>
                <span className={`ticker-change ${item.change24h < 0 ? 'negative' : ''}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
            {/* Duplicate for continuous scroll */}
            {prices.map((item) => (
              <div key={`dup-${item.symbol}`} className="ticker-item">
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">
                  ${item.price >= 1000 ? item.price.toLocaleString() : item.price.toFixed(item.price >= 1 ? 2 : 4)}
                </span>
                <span className={`ticker-change ${item.change24h < 0 ? 'negative' : ''}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
