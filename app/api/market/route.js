import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const results = [];
    
    // Fetch all pairs in parallel
    const promises = POPULAR_PAIRS.map(async (pair) => {
      const symbol = pair.replace('_USDC', '');
      
      try {
        const response = await fetch(
          `https://api.backpack.exchange/api/v1/ticker?symbol=${pair}`,
          { 
            cache: 'no-store',
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          return {
            symbol,
            name: COIN_NAMES[symbol] || symbol,
            price: parseFloat(data.lastPrice) || 0,
            change24h: (parseFloat(data.priceChangePercent) * 100) || 0,
            high: parseFloat(data.high) || 0,
            low: parseFloat(data.low) || 0
          };
        }
      } catch (err) {
        console.error(`Failed to fetch ${pair}:`, err);
      }
      
      return null;
    });
    
    const allResults = await Promise.all(promises);
    
    // Filter out nulls and sort by price
    const validResults = allResults.filter(r => r !== null);
    validResults.sort((a, b) => b.price - a.price);
    
    return NextResponse.json({
      success: true,
      data: validResults,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
