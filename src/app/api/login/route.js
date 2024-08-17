import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { hash } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json()
  console.log({ email, password })

  try {
    const query = await sql`
      SELECT * from users WHERE email = ${email}
    `;
    const hashedPassword = query.rows[0].password
    const match = await bcrypt.compare(password, hashedPassword)
    
    if (match) {
      console.log("passwords match")
      return NextResponse.json({ result: "ok" })
    }
    return NextResponse.json({ result: "wrong" })

  } catch (error) {
    return NextResponse.json({ result: "ko" })
  }
}
