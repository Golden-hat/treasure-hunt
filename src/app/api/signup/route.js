import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, surname, username, email, password } = await request.json()

  const hashPassword = await bcrypt.hash(password, 10); // Correct usage

  try {
    const insertUserQuery = await sql`
        INSERT INTO user (name, surname, username, email, password)
        VALUES (${name}, ${surname}, ${username}, ${email}, ${hashPassword})
      `;
    return NextResponse.json({ name: name, surname: surname, username: username, email: email, result: "ok" })

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ result: "" })
  }
}