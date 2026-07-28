import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET = process.env.ADMIN_SECRET || 'fallback-secret';
const USERNAME = process.env.ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.ADMIN_PASSWORD || 'password';

function createToken(): string {
  const payload = JSON.stringify({ user: USERNAME, exp: Date.now() + 24 * 60 * 60 * 1000 });
  return Buffer.from(payload).toString('base64');
}

export function validateToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    return payload.exp > Date.now() && payload.user === USERNAME;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === USERNAME && password === PASSWORD) {
    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 });
}
