import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#0d1117',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🔍</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#f7931a' }}>
          404
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#8b949e', marginBottom: '2rem' }}>
          頁面未找到
        </p>
        
        <Link 
          href="/articles"
          style={{ 
            display: 'inline-block',
            padding: '1rem 2rem',
            background: '#f7931a',
            color: '#000',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          📚 查看文章列表
        </Link>
      </div>
    </main>
  );
}
