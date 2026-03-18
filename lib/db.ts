import { sql } from '@vercel/postgres'

export async function createSubscribersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      source VARCHAR(50)
    )
  `
}

export async function addSubscriber(email: string, source = 'website') {
  const result = await sql`
    INSERT INTO subscribers (email, source)
    VALUES (${email}, ${source})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `
  return result.rowCount && result.rowCount > 0
}

export async function getSubscriberCount(): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM subscribers`
  return parseInt(result.rows[0].count)
}
