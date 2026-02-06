import Link from 'next/link';
import MarketData from '../../components/MarketData';

export const metadata = {
  title: '即時行情 - CryptoA8King',
  description: '加密貨幣即時價格、24小時漲跌、市值排行 - Backpack Exchange 數據源',
};

export default function MarketPage() {
  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">CryptoA8King</Link>
          <nav className="nav">
            <Link href="/">首頁</Link>
            <Link href="/articles">文章</Link>
            <Link href="/market">行情</Link>
            <Link href="/consult">諮詢</Link>
          </nav>
        </div>
      </header>

      <section className="section">
        <h1 className="section-title">即時行情</h1>
        
        <MarketData />

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
          <strong style={{ color: 'var(--warning)' }}>風險提示：</strong>
          加密貨幣市場波動極大，價格可能快速變化。過往表現不代表未來收益。請 DYOR 並僅投資您能承受損失的資金。
        </div>
      </section>

      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2024 CryptoA8King. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
