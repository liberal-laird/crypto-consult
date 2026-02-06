'use client';

export default function GlobalError({
  error,
  reset,
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>错误 - CryptoA8King</title>
      </head>
      <body>
        <div className="error-container">
          <h1>出错了</h1>
          <p>抱歉，发生了错误。请刷新页面重试。</p>
          <button onClick={() => reset()}>刷新</button>
        </div>
      </body>
    </html>
  );
}
