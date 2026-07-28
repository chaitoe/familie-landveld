import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateToken } from '@/app/api/auth/login/route';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Geen bestand' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Genereer unieke bestandsnaam
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `portrait-${Date.now()}.${ext}`;
  const filepath = path.join(process.cwd(), 'public', 'media', filename);

  await fs.writeFile(filepath, buffer);

  return NextResponse.json({ success: true, url: `/media/${filename}` });
}
