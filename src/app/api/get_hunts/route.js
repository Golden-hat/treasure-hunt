import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {

  try {
    const query = await sql`SELECT * FROM hunt`;
    return NextResponse.json({ result: "ok", hunts: query.rows });
  } catch (error) {
    console.error('Hunt Fetch Error:', error);
    return NextResponse.json({ result: "ko" });
  }
}
