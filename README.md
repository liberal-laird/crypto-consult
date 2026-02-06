# CryptoA8King - 加密貨幣金融諮詢平台

专业的加密货币投资咨询、市场分析和 DeFi 指南网站。

## 功能特点

- 📊 **市场行情** - 实时加密货币价格和涨跌幅
- 📚 **专业文章** - 比特币、DeFi、Layer2、NFT 等深度内容
- 💼 **投资咨询** - 一对一专业咨询服务
- 🔒 **风险提示** - 投资有风险，平台提供专业风险提示

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: CSS Modules
- **数据库**: Vercel PostgreSQL
- **部署**: Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入数据库连接信息：

```bash
cp .env.example .env.local
```

### 3. 初始化数据库

在 Vercel PostgreSQL 查询运行 `lib/schema.sql`

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
crypto-consult/
├── app/
│   ├── page.js              # 首页
│   ├── layout.js            # 布局
│   ├── globals.css          # 全局样式
│   ├── articles/            # 文章模块
│   │   ├── page.js          # 文章列表
│   │   └── [slug]/          # 文章详情
│   ├── consult/             # 咨询页面
│   │   └── page.js
│   └── api/                 # API 路由
│       └── inquiry/         # 咨询提交
├── lib/
│   ├── db.js                # 数据库操作
│   └── schema.sql           # 数据库 Schema
├── public/                  # 静态资源
└── package.json
```

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

### 环境变量配置

在 Vercel Dashboard 设置以下环境变量：

- `POSTGRES_URL` - PostgreSQL 连接字符串
- `POSTGRES_USER` - 数据库用户
- `POSTGRES_HOST` - 数据库主机
- `POSTGRES_PASSWORD` - 数据库密码
- `POSTGRES_DATABASE` - 数据库名称

## 数据库 Schema

主要数据表：

- `users` - 用户
- `articles` - 文章
- `market_data` - 行情数据
- `price_alerts` - 价格提醒
- `inquiries` - 咨询记录
- `comments` - 评论

运行 `lib/schema.sql` 初始化数据库。

## License

MIT
