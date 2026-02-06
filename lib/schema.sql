-- Crypto Consult Database Schema
-- Run this in Vercel PostgreSQL query runner

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  wallet_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles/Blog posts
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  author VARCHAR(255),
  cover_image VARCHAR(500),
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market data cache
CREATE TABLE IF NOT EXISTS market_data (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(20) NOT NULL,
  name VARCHAR(100),
  price DECIMAL(20, 8),
  change_24h DECIMAL(10, 2),
  market_cap DECIMAL(20, 2),
  volume_24h DECIMAL(20, 2),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price alerts
CREATE TABLE IF NOT EXISTS price_alerts (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  target_price DECIMAL(20, 8),
  condition VARCHAR(10), -- 'above' or 'below'
  is_triggered BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  is_handled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id),
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_market_data_symbol ON market_data(symbol);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- Insert sample articles
INSERT INTO articles (title, slug, summary, content, category, tags, author) VALUES
(
  '2024年比特币减半解读：历史数据与未来展望',
  'bitcoin-halving-2024',
  '深入分析比特币减半的历史规律、价格走势以及对2024年减半的预测。',
  '# 比特币减半深度解析

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
- 宏观经济环境不确定性',
  'bitcoin',
  ARRAY['比特币', '减半', 'BTC', '2024'],
  'CryptoConsult'
),
(
  'DeFi 入门指南：去中心化金融详解',
  'defi-guide-beginners',
  '全面介绍 DeFi（去中心化金融）的概念、主要协议和投资机会。',
  '# DeFi 入门指南

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
4. 注意 Gas 费用',
  'defi',
  ARRAY['DeFi', '去中心化金融', 'Uniswap', 'Aave'],
  'CryptoConsult'
),
(
  'Layer 2 解决方案详解：比特币与以太坊扩容',
  'layer2-scaling-solutions',
  '比较分析主流 Layer 2 扩容方案，包括闪电网络、Arbitrum、Optimism 等。',
  '# Layer 2 扩容方案详解

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
3. **基础设施** - 桥接服务、验证节点

## 风险提示

1. 流动性分散
2. 提款延迟（Optimistic）
3. 跨层资产转移风险',
  'layer2',
  ARRAY['Layer2', '扩容', '闪电网络', 'Arbitrum', 'Rollup'],
  'CryptoConsult'
);
