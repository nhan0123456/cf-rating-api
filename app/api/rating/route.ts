// app/api/rating/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://codeforces.com/api/user.info?handles=nhan0123456')
  const data = await res.json()
  return NextResponse.json(data)
}
