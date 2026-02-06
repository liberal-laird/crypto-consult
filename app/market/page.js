import Link from 'next/link';
import MarketData from '../../components/MarketData';

export const metadata = {
  title: '即時行情 - CryptoA8King',
  description: '加密貨幣即時價格、24小時漲跌、市值排行。比特幣(BTC)、以太坊(ETH)、Solana(SOL)等主流加密貨幣即時行情 - Backpack Exchange 數據源',
  keywords: [
    '比特幣行情',
    '比特幣價格',
    'ETH行情',
    '以太坊價格',
    '加密貨幣行情',
    '加密貨幣價格',
    '即時行情',
    'BTC',
    'ETH',
    'SOL'
  ]
};

export default function MarketPage() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0d1117',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Structured Data - Financial Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FinancialProduct',
            name: 'CryptoA8King 即時行情',
            description: '加密貨幣即時行情服務',
            url: 'https://crypto-consult-seven.vercel.app/market',
            provider: {
              '@type': 'Organization',
              name: 'CryptoA8King'
            }
          })
        }}
      />
      
      {/* Header */}
      <header style={{ 
        background: '#161b22', 
        borderBottom: '1px solid #30363d',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#f7931a', 
            textDecoration: 'none' 
          }}>
            CryptoA8King
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首頁</Link>
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#f7931a', textDecoration: 'none' }}>行情</Link>
            <Link href="/consult" style={{ color: '#8b949e', textDecoration: 'none' }}>諮詢</Link>
          </nav>
        </div>
      </header>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          即時行情
        </h1>
        
        <MarketData />

        {/* Disclaimer */}
        <div style={{ 
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(255, 193, 7, 0.1)',
          borderRadius: '8px',
          border: '1px solid #ffc107',
          fontSize: '0.9rem',
          color: '#8b949e'
        }}>
          <strong style={{ color: '#ffc107', display: 'block', marginBottom: '0.5rem' }}>
            ⚠️ 風險提示：
          </strong>
          加密貨幣市場波動極大，價格可能快速變化。過往表現不代表未來收益。請 DYOR 並僅投資您能承受損失的資金。
        </div>
      </section>

      <footer style={{ 
        background: '#161b22', 
        borderTop: '1px solid #30363d',
        padding: '2rem',
        marginTop: '3rem',
        textAlign: 'center',
        color: '#6e7681',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 CryptoA8King. All rights reserved.</p>
      </footer>
    </main>
  );
}
