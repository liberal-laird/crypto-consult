import './globals.css';

export const metadata = {
  title: 'CryptoConsult - 加密货币金融咨询平台',
  description: '专业的加密货币投资咨询、市场分析和 DeFi 指南',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
