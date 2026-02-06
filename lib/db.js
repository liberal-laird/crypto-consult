import { sql } from '@vercel/postgres';

export async function getArticles() {
  try {
    const { rows } = await sql`
      SELECT * FROM articles 
      ORDER BY created_at DESC 
      LIMIT 20;
    `;
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch articles');
  }
}

export async function getArticleBySlug(slug) {
  try {
    const { rows } = await sql`
      SELECT * FROM articles WHERE slug = ${slug};
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function createArticle(data) {
  try {
    const { rows } = await sql`
      INSERT INTO articles (title, slug, summary, content, category, tags, author)
      VALUES (${data.title}, ${data.slug}, ${data.summary}, ${data.content}, ${data.category}, ${data.tags}, ${data.author})
      RETURNING *;
    `;
    return rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to create article');
  }
}

export async function getMarketData() {
  try {
    const { rows } = await sql`
      SELECT * FROM market_data 
      ORDER BY updated_at DESC 
      LIMIT 50;
    `;
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch market data');
  }
}

export async function createInquiry(data) {
  try {
    const { rows } = await sql`
      INSERT INTO inquiries (name, email, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.subject}, ${data.message})
      RETURNING *;
    `;
    return rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to create inquiry');
  }
}
