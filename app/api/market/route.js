import { NextResponse } from 'next/server';
import { BackpackClient, formatMarketData } from '../../lib/backpack';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const symbols = searchParams.get('symbols');

    const client = new BackpackClient();

    // Get all tickers
    const allTickers = await client.getAllTickers();
    
    if (!allTickers || !allTickers.tickers) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch data from Backpack'
      }, { status: 500 });
    }

    // Filter USDC pairs
    const usdcPairs = allTickers.tickers.filter(
      t => t.symbol && t.symbol.endsWith('_USDC')
    );

    // Format data
    const marketData = await formatMarketData(usdcPairs);

    // Sort by volume
    marketData.sort((a, b) => b.volume24h - a.volume24h);

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
