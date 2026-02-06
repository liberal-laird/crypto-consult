import './globals.css';

export const metadata = {
  title: {
    default: 'CryptoA8King - 加密貨幣金融諮詢平台',
    template: '%s | CryptoA8King'
  },
  description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南。提供比特幣、以太坊等加密貨幣即時行情、專業分析和投資建議。',
  keywords: [
    '加密貨幣',
    '比特幣',
    '比特幣投資',
    '比特幣行情',
    '以太坊',
    'ETH',
    'DeFi',
    '加密貨幣投資',
    '加密貨幣諮詢',
    '加密貨幣分析',
    '區塊鏈',
    '加密貨幣推薦',
    '比特幣走勢',
    '虛擬貨幣',
    '加密貨幣入門'
  ],
  authors: [{ name: 'CryptoA8King', url: 'https://crypto-consult-seven.vercel.app' }],
  creator: 'CryptoA8King',
  publisher: 'CryptoA8King',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://crypto-consult-seven.vercel.app',
    siteName: 'CryptoA8King',
    title: 'CryptoA8King - 加密貨幣金融諮詢平台',
    description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CryptoA8King - 加密貨幣金融諮詢平台'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoA8King - 加密貨幣金融諮詢平台',
    description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南',
    images: ['/og-image.png'],
    creator: '@cryptoa8king'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual code
    yandex: 'yandex-verification-code'
  },
  alternates: {
    canonical: 'https://crypto-consult-seven.vercel.app',
    languages: {
      'zh-TW': 'https://crypto-consult-seven.vercel.app',
      'zh-CN': 'https://crypto-consult-seven.vercel.app',
      'en': 'https://crypto-consult-seven.vercel.app/en'
    }
  },
  category: 'finance',
  classification: 'Finance:Cryptocurrency:Investment'
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://api.backpack.exchange" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.backpack.exchange" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'CryptoA8King',
              url: 'https://crypto-consult-seven.vercel.app',
              logo: 'https://crypto-consult-seven.vercel.app/icon.svg',
              description: '專業的加密貨幣投資諮詢、市場分析和 DeFi 指南',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'TW'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '',
                contactType: 'customer service',
                availableLanguage: ['Chinese', 'English']
              },
              sameAs: [
                'https://twitter.com/cryptoa8king',
                'https://t.me/cryptoa8king'
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CryptoA8King',
              url: 'https://crypto-consult-seven.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://crypto-consult-seven.vercel.app/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '首頁',
                  item: 'https://crypto-consult-seven.vercel.app/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '文章',
                  item: 'https://crypto-consult-seven.vercel.app/articles'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: '行情',
                  item: 'https://crypto-consult-seven.vercel.app/market'
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
