import { notFound } from 'next/navigation';
import Link from 'next/link';

const articlesData = {
  'bitcoin-halving-2024': {
    title: '2024年比特币减半解读：历史数据与未来展望',
    slug: 'bitcoin-halving-2024',
    summary: '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
    category: '比特币',
    tags: ['比特币', '减半', 'BTC', '2024'],
    author: 'CryptoConsult',
    created_at: '2024-01-15',
    readTime: '8 分钟',
    content: `# 比特币减半深度解析

## 什么是比特币减半？

比特币减半（Halving）是指比特币网络每产生210,000个区块后，区块奖励减半一次的事件。这大约每4年发生一次。

减半是比特币协议中最重要的事件之一，它直接控制了比特币的供应量，确保比特币最终总量不会超过2100万枚。

## 历史减半数据

### 第一次减半 (2012年11月)
- **区块奖励**: 50 BTC → 25 BTC
- **减半前价格**: ~$12
- **减半后1年最高**: ~$1,100
- **涨幅**: ~9200%

### 第二次减半 (2016年7月)
- **区块奖励**: 25 BTC → 12.5 BTC
- **减半前价格**: ~$650
- **减半后1年最高**: ~$19,000
- **涨幅**: ~2900%

### 第三次减半 (2020年5月)
- **区块奖励**: 12.5 BTC → 6.25 BTC
- **减半前价格**: ~$8,500
- **减半后1年最高**: ~$64,000
- **涨幅**: ~750%

> 💡 **历史数据显示**，每次减半后比特币价格都创下了历史新高，但这不代表未来也会如此。

## 2024年减半展望

### 预期时间
预计在2024年4-5月发生

### 关键因素

1. **矿工收益减半**
   - 矿工收益减少约50%
   - 可能导致部分效率较低的矿工退出网络
   - 算力可能会经历短期波动

2. **供给减少**
   - 流通中的新 BTC 减少50%
   - 每日新增供应从900 BTC降至450 BTC
   - 供给减少通常会推高价格

3. **机构需求**
   - ETF 等产品带来的机构资金持续流入
   - 贝莱德，富达等传统金融巨头入场
   - 机构采用率创新高

### 风险提示

- ⚠️ 历史数据不代表未来表现
- ⚠️ 市场已部分定价减半预期
- ⚠️ 宏观经济环境不确定性（利率政策，通胀等）
- ⚠️ 监管政策可能影响走势

## 投资建议

### 适合人群
- ✅ 长期持有者（HODLer）
- ✅ 对比特币有深入了解
- ✅ 能够承受短期波动

### 注意事项
- ❌ 不要投入超过你能承受损失的资金
- ❌ 不要借债投资
- ❌ 不要试图timing市场`
  },
  'defi-guide-beginners': {
    title: 'DeFi 入门指南：去中心化金融详解',
    slug: 'defi-guide-beginners',
    summary: '全面介绍 DeFi（去中心化金融）的概念，主要协议和投资机会。',
    category: 'DeFi',
    tags: ['DeFi', '去中心化金融', 'Uniswap', 'Aave'],
    author: 'CryptoConsult',
    created_at: '2024-01-20',
    readTime: '10 分钟',
    content: `# DeFi 入门指南

## 什么是 DeFi？

DeFi（Decentralized Finance）是指建立在区块链上的去中心化金融系统，无需传统金融机构即可提供金融服务。

### DeFi 的核心特点

- 🔓 **无需许可**: 任何人只要有钱包就可以使用
- 🌐 **无国界**: 全球通用，无需KYC
- 💰 **高收益**: 相比传统金融，收益率通常更高
- 🔄 **透明**: 所有交易在链上公开透明
- ⚡ **快速**: 24/7 可用，无需银行工作 hours

## 主要 DeFi 协议

### 1. Uniswap - 去中心化交易所
- 自动做市商 (AMM) 机制
- 无需订单簿
- 流动性提供者赚取 0.3% 手续费

### 2. Aave - 借贷协议
- 存入资产赚取利息
- 抵押借款
- 超额抵押机制

### 3. MakerDAO - 稳定币
- DAI 稳定币（软锚定1美元）
- 超额抵押生成
- 完全去中心化治理`
  }
};

function parseContent(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      result.push({ type: 'h1', text: line.replace('# ', '') });
    } else if (line.startsWith('## ')) {
      result.push({ type: 'h2', text: line.replace('## ', '') });
    } else if (line.startsWith('### ')) {
      result.push({ type: 'h3', text: line.replace('### ', '') });
    } else if (line.startsWith('> ')) {
      result.push({ type: 'quote', text: line.replace('> ', '') });
    } else if (line.startsWith('- **')) {
      result.push({ type: 'list-item-bold', text: line.replace('- **', '').replace('**', '') });
    } else if (line.startsWith('- ')) {
      result.push({ type: 'list-item', text: line.replace('- ', '') });
    } else if (line.trim() !== '') {
      result.push({ type: 'paragraph', text: line });
    }
    
    i++;
  }
  
  return result;
}

export default async function ArticlePage({ params }) {
  const article = articlesData[params.slug];

  if (!article) {
    notFound();
  }

  const parsedContent = parseContent(article.content);

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#161b22', borderBottom: '1px solid #30363d', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f7931a', textDecoration: 'none' }}>
            CryptoConsult
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#8b949e', textDecoration: 'none' }}>首页</Link>
            <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none' }}>文章</Link>
            <Link href="/market" style={{ color: '#8b949e', textDecoration: 'none' }}>行情</Link>
            <Link href="/consult" style={{ color: '#8b949e', textDecoration: 'none' }}>咨询</Link>
          </nav>
        </div>
      </header>

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link href="/articles" style={{ color: '#8b949e', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          ← 返回文章列表
        </Link>

        <header style={{ marginBottom: '2rem' }}>
          <span style={{ background: 'rgba(247, 147, 26, 0.2)', color: '#f7931a', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}>
            {article.category}
          </span>
          
          <h1 style={{ fontSize: '2.25rem', lineHeight: 1.3, marginTop: '1rem', marginBottom: '1rem', fontWeight: 700 }}>
            {article.title}
          </h1>
          
          <p style={{ color: '#8b949e', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {article.summary}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', color: '#6e7681', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <span>✍️ {article.author}</span>
            <span>📅 {article.created_at}</span>
            <span>⏱️ {article.readTime}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {article.tags?.map((tag) => (
              <span key={tag} style={{ background: 'rgba(98, 126, 234, 0.2)', color: '#627eea', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
          {parsedContent.map((item, index) => {
            switch (item.type) {
              case 'h1':
                return <h1 key={index} style={{ fontSize: '1.85rem', marginTop: '2.5rem', marginBottom: '1rem', color: '#f7931a', fontWeight: 700 }}>{item.text}</h1>;
              case 'h2':
                return <h2 key={index} style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 600 }}>{item.text}</h2>;
              case 'h3':
                return <h3 key={index} style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>{item.text}</h3>;
              case 'paragraph':
                return <p key={index} style={{ marginBottom: '1rem', color: '#d0d7de' }}>{item.text}</p>;
              case 'quote':
                return <blockquote key={index} style={{ borderLeft: '4px solid #f7931a', paddingLeft: '1.25rem', margin: '1.5rem 0', color: '#8b949e', fontStyle: 'italic' }}>{item.text}</blockquote>;
              case 'list-item-bold':
                return <li key={index} style={{ marginBottom: '0.5rem', marginLeft: '1.5rem', color: '#f7931a', fontWeight: 600 }}><span style={{ color: '#d0d7de', fontWeight: 400 }}>{item.text}</span></li>;
              case 'list-item':
                return <li key={index} style={{ marginBottom: '0.5rem', marginLeft: '1.5rem', color: '#d0d7de' }}>{item.text}</li>;
              default:
                return null;
            }
          })}
        </div>

        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '12px', border: '1px solid #ffc107', fontSize: '0.9rem' }}>
          <strong style={{ color: '#ffc107', display: 'block', marginBottom: '0.5rem' }}>⚠️ 免责声明</strong>
          <p style={{ color: '#8b949e', margin: 0 }}>
            本文仅供学习和参考，不构成任何投资建议。加密货币投资风险极高，请务必 DYOR（自行研究）并只投资你能承受损失的资金。过往表现不代表未来收益。
          </p>
        </div>
      </article>

      <footer style={{ background: '#161b22', borderTop: '1px solid #30363d', padding: '2rem', marginTop: '3rem', textAlign: 'center', color: '#6e7681', fontSize: '0.9rem' }}>
        <p>© 2024 CryptoConsult. All rights reserved.</p>
      </footer>
    </div>
  );
}
