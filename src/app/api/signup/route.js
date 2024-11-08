import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { name, surname, username, email, password } = body;

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const insertUserQuery = await sql`
      INSERT INTO "user" (name, surname, username, email, password)
      VALUES (${name}, ${surname}, ${username}, ${email}, ${hashPassword})
    `;
    return NextResponse.json({ name, surname, username, email, result: "ok" });

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ result: "error" }, { status: 500 });
  }
}
