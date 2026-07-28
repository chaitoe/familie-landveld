import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateToken } from '@/app/api/auth/login/route';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const valid = token ? validateToken(token) : false;
  return NextResponse.json({ authenticated: valid });
}
