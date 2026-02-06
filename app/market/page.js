import Link from 'next/link';
import MarketData from '../../components/MarketData';

export const metadata = {
  title: '实时行情 - CryptoConsult',
  description: '加密货币实时价格、24小时涨跌、市值排行 - Backpack Exchange 数据源',
};

export default function MarketPage() {
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
