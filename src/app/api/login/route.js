import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, surname, username, email, password } = await request.json()

  const hashPassword = await bcrypt.compare(pass) // Correct usage

  try {
    // Insert the new user into the database
    const insertUserQuery = await sql`
        SELECT * from users WHERE email = ${email} AND password ${hashPassword}
      `;
    // Return the new user data (excluding the password)
    return NextResponse.json({ name: name, surname: surname, username: username, email: email, error: "ok" })

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: "" })
  }
}
