import { db } from '@vercel/postgres'

export default async function handler(request, response) {
  const client = await db.connect();
}