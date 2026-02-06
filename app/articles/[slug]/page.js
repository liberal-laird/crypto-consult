import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getArticle(slug) {
  // Sample data - in production, fetch from database
  const articles = {
    'bitcoin-halving-2024': {
      title: '2024年比特币减半解读：历史数据与未来展望',
      slug: 'bitcoin-halving-2024',
      summary: '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
      category: '比特币',
      tags: ['比特币', '减半', 'BTC', '2024'],
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
- 涨幅: ~9200%

### 第二次减半 (2016年7月)
- 区块奖励: 25 BTC → 12.5 BTC
- 减半前价格: ~$650
- 减半后1年最高: ~$19,000
- 涨幅: ~2900%

### 第三次减半 (2020年5月)
- 区块奖励: 12.5 BTC → 6.25 BTC
- 减半前价格: ~$8,500
- 减半后1年最高: ~$64,000
- 涨幅: ~750%

## 2024年减半展望

### 预期时间
预计在2024年4-5月发生

### 关键因素
1. **矿工收益减半** - 矿工收益减少，可能导致部分矿工退出
2. **供给减少** - 流通中的新 BTC 减少
3. **机构需求** - ETF 等产品带来的机构资金

### 风险提示
- 历史数据不代表未来表现
- 市场已部分定价减半预期
- 宏观经济环境不确定性`
    },
    'defi-guide-beginners': {
      title: 'DeFi 入门指南：去中心化金融详解',
      slug: 'defi-guide-beginners',
      summary: '全面介绍 DeFi（去中心化金融）的概念、主要协议和投资机会。',
      category: 'DeFi',
      tags: ['DeFi', '去中心化金融', 'Uniswap', 'Aave'],
      author: 'CryptoConsult',
      created_at: '2024-01-20',
      content: `# DeFi 入门指南

## 什么是 DeFi？

DeFi（Decentralized Finance）是指建立在区块链上的去中心化金融系统，无需传统金融机构即可提供金融服务。

## 主要 DeFi 协议

### 1. Uniswap - 去中心化交易所
- 自动做市商 (AMM) 机制
- 无需订单簿
- 流动性提供者赚取手续费

### 2. Aave - 借贷协议
- 存入资产赚取利息
- 抵押借款
- 超额抵押机制

### 3. Compound - 借贷市场
- 算法利率
- 自动复利
- 治理代币 COMP

### 4. MakerDAO - 稳定币
- DAI 稳定币
- 超额抵押生成
- 治理去中心化

## DeFi 风险

1. **智能合约风险** - 代码漏洞
2. **流动性风险** - 池子干涸
3. **预言机风险** - 价格操纵
4. **无常损失** - LP 面临的风险

## 入门建议

1. 从小资金开始
2. 理解协议机制后再投资
3. 分散风险
4. 注意 Gas 费用`
    },
    'layer2-scaling-solutions': {
      title: 'Layer 2 解决方案详解：比特币与以太坊扩容',
      slug: 'layer2-scaling-solutions',
      summary: '比较分析主流 Layer 2 扩容方案，包括闪电网络、Arbitrum、Optimism 等。',
      category: '技术',
      tags: ['Layer2', '扩容', '闪电网络', 'Arbitrum', 'Rollup'],
      author: 'CryptoConsult',
      created_at: '2024-01-25',
      content: `# Layer 2 扩容方案详解

## 为什么需要 Layer 2？

区块链 Layer 1 面临：
- 吞吐量限制
- 高 Gas 费用
- 交易确认时间长

## 比特币 Layer 2

### 闪电网络 (Lightning Network)
- 链下支付通道
- 快速、低费用
- 适用于小额支付

### Stacks
- 智能合约层
- 保留比特币安全性
- 智能合约功能

## 以太坊 Layer 2

### Rollups 分类

#### Optimistic Rollups
- 欺诈证明 (7天挑战期)
- 较低 Gas 费用
- 代表：Arbitrum, Optimism

#### ZK Rollups
- 零知识证明
- 即时提款
- 计算密集
- 代表：zkSync, StarkNet, Polygon zkEVM

## Layer 2 投资机会

1. **空投预期** - 治理代币潜在空投
2. **生态项目** - 早期项目机会
3. **基础设施** - 桥接服务、验证节点`
    },
    'stablecoins-comparison': {
      title: '稳定币深度解析：USDT、USDC、DAI 哪家强？',
      slug: 'stablecoins-comparison',
      summary: '对比分析三大主流稳定币的机制、风险和适用场景。',
      category: '稳定币',
      tags: ['稳定币', 'USDT', 'USDC', 'DAI'],
      author: 'CryptoConsult',
      created_at: '2024-02-01',
      content: `# 稳定币对比分析

## 为什么需要稳定币？

加密货币市场波动剧烈，稳定币提供了：
- 避险工具
- 交易媒介
- DeFi 基础设施

## 主流稳定币对比

### USDT (Tether)
- 发行方: Tether Limited
- 机制: 法币抵押（美元）
- 优点: 流动性最好
- 风险: 透明度争议、监管风险

### USDC (USD Coin)
- 发行方: Circle
- 机制: 法币抵押（美元）
- 优点: 监管合规、透明度高
- 风险: 对银行系统的依赖

### DAI
- 发行方: MakerDAO
- 机制: 加密货币超额抵押
- 优点: 去中心化、抗审查
- 风险: 智能合约风险、抵押品波动

## 适用场景

- **交易对**: USDT/USDC 最佳
- **DeFi**: DAI 首选
- **大额转账**: USDC（合规优势）
- **跨境支付**: USDT（覆盖面广）`
    },
    'nft-investment-guide': {
      title: 'NFT 投资指南：如何在熊市中寻找价值',
      slug: 'nft-investment-guide',
      summary: '熊市中的 NFT 投资策略，蓝筹项目筛选标准和风险管理。',
      category: 'NFT',
      tags: ['NFT', '蓝筹', '投资'],
      author: 'CryptoConsult',
      created_at: '2024-02-05',
      content: `# NFT 投资指南

## 熊市生存法则

### 1. 关注蓝筹项目
- BAYC、Azuki、Pudgy Penguins
- 强大的社区和路线图
- 流动性相对较好

### 2. 关注 Utility
- 实用价值 > 纯收藏
- 游戏、NFT-Fi、会员权益

### 3. 风险控制
- 只投资能承受损失的资金
- 分散投资
- 设置止损位

## 项目筛选标准

1. 团队背景和声誉
2. 社区活跃度
3. 路线图清晰度
4. 长期发展规划
5. 版税机制设计`
    },
    'crypto-tax-guide': {
      title: '加密货币税务指南：全球主要国家税务政策',
      slug: 'crypto-tax-guide',
      summary: '美国、欧盟、新加坡、香港等地加密货币税务政策详解。',
      category: '合规',
      tags: ['税务', '合规', '政策'],
      author: 'CryptoConsult',
      created_at: '2024-02-10',
      content: `# 加密货币税务指南

## 美国
- IRS 将加密货币视为财产
- 资本利得税适用
- 需申报交易记录

## 欧盟
- MiCA 法规统一定义
- 资本利得税因国而异
- DeFi 规则逐步明确

## 新加坡
- 个人持币免税
- 交易收益可能征税
- 相对友好的监管环境

## 香港
- 持币不征税
- 交易需申报
- 逐步建立监管框架`
    }
  };

  return articles[slug] || null;
}

export async function generateStaticParams() {
  const articles = [
    'bitcoin-halving-2024',
    'defi-guide-beginners',
    'layer2-scaling-solutions',
    'stablecoins-comparison',
    'nft-investment-guide',
    'crypto-tax-guide'
  ];
  
  return articles.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

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

      {/* Article */}
      <article className="article-page">
        <Link href="/articles" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
          ← 返回文章列表
        </Link>
        
        <span className="article-category">{article.category}</span>
        <h1>{article.title}</h1>
        
        <div className="article-meta">
          <span>作者: {article.author}</span>
          <span>发布时间: {article.created_at}</span>
        </div>
        
        <div className="tags">
          {article.tags?.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="content" style={{ marginTop: '2rem' }}>
          {article.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index}>{line.replace('# ', '')}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index}>{line.replace('## ', '')}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index}>{line.replace('### ', '')}</h3>;
            } else if (line.startsWith('- ')) {
              return <li key={index}>{line.replace('- ', '')}</li>;
            } else if (line.match(/^\d+\./)) {
              return <li key={index}>{line}</li>;
            } else if (line.match(/^\*\*(.+?)\*\*/)) {
              return <p key={index}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
            } else if (line.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index}>{line}</p>;
            }
          })}
        </div>

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
          <strong style={{ color: 'var(--warning)' }}>免责声明：</strong>
          本文仅供学习和参考，不构成任何投资建议。加密货币投资风险极高，请务必 DYOR（自行研究）并只投资你能承受损失的资金。
        </div>
      </article>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom" style={{ marginTop: 0, paddingTop: '2rem' }}>
          <p>© 2024 CryptoConsult. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
