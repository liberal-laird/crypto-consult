import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ArticlePage({ params }) {
  const slug = params.slug;
  
  if (!slug) {
    notFound();
  }
  
  const articles = {
    'bitcoin-halving-2024': {
      title: '2024年比特币减半解读：历史数据与未来展望',
      category: '比特币',
      author: 'CryptoConsult',
      created_at: '2024-01-15',
      content: `# 比特币减半深度解析

## 什么是比特币减半？

比特币减半（Halving）是指比特币网络每产生210,000个区块后，区块奖励减半一次的事件。这大约每4年发生一次。

## 历史减半数据

### 第一次减半 (2012年11月)
- 区块奖励: 50 BTC → 25 BTC
- 减半前价格: ~$12
- 减半后1年最高: ~$1,100

### 第二次减半 (2016年7月)
- 区块奖励: 25 BTC → 12.5 BTC
- 减半前价格: ~$650
- 减半后1年最高: ~$19,000

### 第三次减半 (2020年5月)
- 区块奖励: 12.5 BTC → 6.25 BTC
- 减半前价格: ~$8,500
- 减半后1年最高: ~$64,000

> 历史数据显示，每次减半后比特币价格都创下历史新高。`
    }
  };
  
  const article = articles[slug];
  
  if (!article) {
    notFound();
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#ffffff', fontFamily: 'system-ui' }}>
      <header style={{ background: '#161b22', borderBottom: '1px solid #30363d', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f7931a', textDecoration: 'none' }}>CryptoConsult</Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首页</Link>
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
          </nav>
        </div>
      </header>
      
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>← 返回文章</Link>
        
        <span style={{ background: 'rgba(247, 147, 26, 0.2)', color: '#f7931a', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>{article.category}</span>
        
        <h1 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>{article.title}</h1>
        
        <div style={{ color: '#6e7681', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <span>✍️ {article.author}</span>
          <span style={{ marginLeft: '1rem' }}>📅 {article.created_at}</span>
        </div>
        
        <div style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
          {article.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: '1.8rem', marginTop: '2rem', color: '#f7931a' }}>{line.replace('# ', '')}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.4rem', marginTop: '1.5rem' }}>{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{line.replace('### ', '')}</h3>;
            if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft: '4px solid #f7931a', paddingLeft: '1rem', margin: '1rem 0', color: '#8b949e', fontStyle: 'italic' }}>{line.replace('> ', '')}</blockquote>;
            if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.3rem' }}>{line.replace('- ', '')}</li>;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} style={{ marginBottom: '0.5rem' }}>{line}</p>;
          })}
        </div>
      </article>
      
      <footer style={{ background: '#161b22', borderTop: '1px solid #30363d', padding: '2rem', textAlign: 'center', color: '#6e7681', fontSize: '0.9rem' }}>
        <p>© 2024 CryptoConsult</p>
      </footer>
    </div>
  );
}
