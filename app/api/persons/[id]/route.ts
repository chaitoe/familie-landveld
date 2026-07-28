import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateToken } from '@/app/api/auth/login/route';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'persons');

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token ? validateToken(token) : false;
}

// PUT — Werk een bestaand persoon bij
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const filePath = path.join(DATA_DIR, `${id}.json`);

  try {
    await fs.access(filePath);
  } catch {
    return NextResponse.json({ error: 'Persoon niet gevonden' }, { status: 404 });
  }

  // Houd originele id en ref
  const existing = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  const updated = { ...existing, ...body, id: existing.id, ref: existing.ref };
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2) + '\n');

  // Clear cache
  const { clearCache } = await import('@/lib/data/persons');
  clearCache();

  return NextResponse.json({ success: true, data: updated });
}

// DELETE — Verwijder een persoon
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const { id } = await params;
  const filePath = path.join(DATA_DIR, `${id}.json`);

  try {
    await fs.unlink(filePath);
    const { clearCache } = await import('@/lib/data/persons');
    clearCache();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Persoon niet gevonden' }, { status: 404 });
  }
}
