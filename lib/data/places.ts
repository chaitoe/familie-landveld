import { Place } from '@/lib/types';
import places from '@/data/places.json';

const placeMap = new Map<string, Place>(
  (places as Place[]).map(p => [p.id, p])
);

export function getAllPlaces(): Place[] {
  return places as Place[];
}

export function getPlace(id: string): Place | undefined {
  return placeMap.get(id);
}
