import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAllPersons, getPersonsByIds, clearCache } from '@/lib/data/persons';
import { validateToken } from '@/app/api/auth/login/route';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'persons');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (ids) {
    const idList = ids.split(',');
    const persons = await getPersonsByIds(idList);
    return NextResponse.json({ data: persons });
  }

  const persons = await getAllPersons();
  return NextResponse.json({ data: persons, meta: { total: persons.length } });
}

// POST — Maak een nieuwe persoon aan
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  const body = await request.json();
  const id = body.id || `landveld-${Date.now()}`;
  const person = {
    id,
    ref: body.ref || `LANDVELD-NEW-${Date.now()}`,
    firstName: body.firstName || '',
    lastName: body.lastName || 'Landveld',
    gender: body.gender || 'M',
    isAlive: body.isAlive ?? true,
    birth: body.birth || null,
    death: body.death || null,
    birthPlaceId: body.birthPlaceId || null,
    deathPlaceId: body.deathPlaceId || null,
    biography: body.biography || '',
    customFields: body.customFields || [],
  };

  const filePath = path.join(DATA_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(person, null, 2) + '\n');
  clearCache();

  return NextResponse.json({ success: true, data: person }, { status: 201 });
}
