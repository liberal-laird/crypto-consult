/**
 * Backpack Exchange API Client
 * https://backpack.exchange
 */

const BACKPACK_API_BASE = 'https://api.backpack.exchange';

class BackpackClient {
  constructor(apiKey = null, apiSecret = null) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  /**
   * Get ticker price for a symbol
   * @param {string} symbol - e.g., 'BTC_USD'
   */
  async getTicker(symbol) {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/ticker?symbol=${symbol}`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get all tickers
   */
  async getAllTickers() {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/ticker/all`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get order book for a symbol
   * @param {string} symbol - e.g., 'BTC_USD'
   * @param {number} depth - Order book depth (default 20)
   */
  async getOrderBook(symbol, depth = 20) {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/depth?symbol=${symbol}&limit=${depth}`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get recent trades
   * @param {string} symbol - e.g., 'BTC_USD'
   */
  async getTrades(symbol) {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/trades?symbol=${symbol}`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get klines/candlestick data
   * @param {string} symbol - e.g., 'BTC_USD'
   * @param {string} interval - 1m, 5m, 15m, 1h, 4h, 1d
   * @param {number} limit - Number of candles
   */
  async getKlines(symbol, interval = '1h', limit = 100) {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get 24hr statistics
   * @param {string} symbol - e.g., 'BTC_USD'
   */
  async get24hrStats(symbol) {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/ticker/24hr?symbol=${symbol}`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }

  /**
   * Get exchange info (symbols, precision, etc.)
   */
  async getExchangeInfo() {
    try {
      const response = await fetch(
        `${BACKPACK_API_BASE}/api/v1/exchangeInfo`
      );
      return await response.json();
    } catch (error) {
      console.error('Backpack API error:', error);
      return null;
    }
  }
}

// Market data helper functions
async function getCryptoPrices(symbols = ['BTC', 'ETH', 'SOL', 'BNB']) {
  const client = new BackpackClient();
  const prices = {};

  for (const symbol of symbols) {
    const ticker = await client.getTicker(`${symbol}_USDC`);
    if (ticker) {
      prices[symbol] = {
        price: parseFloat(ticker.price) || 0,
        change24h: parseFloat(ticker.priceChange24h) || 0,
        volume24h: parseFloat(ticker.volume24h) || 0,
        high24h: parseFloat(ticker.high24h) || 0,
        low24h: parseFloat(ticker.low24h) || 0,
        timestamp: Date.now()
      };
    }
  }

  return prices;
}

async function formatMarketData(tickers) {
  if (!tickers || tickers.length === 0) return [];

  return tickers.map(ticker => ({
    symbol: ticker.symbol?.replace('_USDC', '') || '',
    price: parseFloat(ticker.lastPrice || ticker.price) || 0,
    change24h: parseFloat(ticker.priceChangePercent) * 100 || 0,
    changePercent: parseFloat(ticker.priceChangePercent) * 100 || 0,
    volume24h: parseFloat(ticker.quoteVolume) || 0,
    high24h: parseFloat(ticker.high) || 0,
    low24h: parseFloat(ticker.low) || 0,
    timestamp: Date.now()
  }));
}

// Export for Next.js API routes
module.exports = { BackpackClient, getCryptoPrices, formatMarketData };
