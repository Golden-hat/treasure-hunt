import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export  async function POST(request) {
    const { name, surname, username, email, password } = await request.json()

    try {
      // Insert the new user into the database
      const insertUserQuery = await sql`
        INSERT INTO users (name, surname, username, email, password)
        VALUES (${name}, ${surname}, ${username}, ${email}, ${password})
      `;
      // Return the new user data (excluding the password)
      return NextResponse.json( {data: "ok"} )

    } catch (error) {
      return NextResponse.json( {error: "ko"} )
      console.error('Signup Error:', error);
    }

    
}
