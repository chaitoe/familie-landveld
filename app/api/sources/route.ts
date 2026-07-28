import { NextResponse } from 'next/server';
import { getAllSources } from '@/lib/data/sources';

export async function GET() {
  const sources = getAllSources();
  return NextResponse.json({ data: sources, meta: { total: sources.length } });
}
