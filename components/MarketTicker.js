'use client';

import { useState, useEffect } from 'react';

const POPULAR_PAIRS = [
  'BTC_USDC',
  'ETH_USDC',
  'BNB_USDC',
  'SOL_USDC',
  'XRP_USDC',
  'ADA_USDC',
  'AVAX_USDC',
  'DOT_USDC',
  'MATIC_USDC',
  'LINK_USDC'
];

export default function MarketTicker() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch('/api/market');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Filter popular pairs
          const popular = POPULAR_PAIRS.map(pair => {
            const base = pair.replace('_USDC', '');
            return data.data.find(p => p.symbol === base);
          }).filter(Boolean);
          
          setPrices(popular);
        } else {
          // Fallback to demo data
          setPrices(getDemoData());
        }
      } catch (err) {
        console.error('Failed to fetch prices:', err);
        setError(err.message);
        setPrices(getDemoData());
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="market-ticker">
        <div className="ticker-content">
          {getDemoData().map((item) => (
            <div key={item.symbol} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">${item.price.toLocaleString()}</span>
              <span className={`ticker-change ${item.changePercent < 0 ? 'negative' : ''}`}>
                {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="market-ticker">
      <div className="ticker-content">
        {loading ? (
          <div className="ticker-item">
            <span>Loading prices...</span>
          </div>
        ) : (
          prices.map((item) => (
            <div key={item.symbol} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">${item.price.toLocaleString()}</span>
              <span className={`ticker-change ${item.changePercent < 0 ? 'negative' : ''}`}>
                {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </div>
          ))
        )}
        {/* Duplicate for continuous scroll */}
        {prices.map((item) => (
          <div key={`dup-${item.symbol}`} className="ticker-item">
            <span className="ticker-symbol">{item.symbol}</span>
            <span className="ticker-price">${item.price.toLocaleString()}</span>
            <span className={`ticker-change ${item.changePercent < 0 ? 'negative' : ''}`}>
              {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDemoData() {
  return [
    { symbol: 'BTC', price: 67842, changePercent: 2.34 },
    { symbol: 'ETH', price: 3421, changePercent: 1.87 },
    { symbol: 'BNB', price: 592, changePercent: 0.95 },
    { symbol: 'SOL', price: 178, changePercent: 5.67 },
    { symbol: 'XRP', price: 0.62, changePercent: -0.45 },
    { symbol: 'ADA', price: 0.68, changePercent: 1.23 },
    { symbol: 'AVAX', price: 42.5, changePercent: 3.21 },
    { symbol: 'DOT', price: 8.92, changePercent: 0.78 },
    { symbol: 'MATIC', price: 1.23, changePercent: -1.45 },
    { symbol: 'LINK', price: 18.5, changePercent: 2.11 }
  ];
}
