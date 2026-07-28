import { Source } from '@/lib/types';
import sources from '@/data/sources.json';

const sourceMap = new Map<string, Source>(
  (sources as Source[]).map(s => [s.id, s])
);

export function getAllSources(): Source[] {
  return sources as Source[];
}

export function getSource(id: string): Source | undefined {
  return sourceMap.get(id);
}

export function getSourcesByIds(ids: string[]): Source[] {
  return ids.map(id => sourceMap.get(id)).filter((s): s is Source => s !== undefined);
}
