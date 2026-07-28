import { NextResponse } from 'next/server';
import { getAllPlaces } from '@/lib/data/places';

export async function GET() {
  const places = getAllPlaces();
  return NextResponse.json({ data: places });
}
