import { Person } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'persons');

// ── In-memory cache ──────────────────────────────────────
let personCache: Map<string, Person> | null = null;
let personListCache: Person[] | null = null;

async function loadAllPersons(): Promise<Map<string, Person>> {
  if (personCache) return personCache;

  const files = await fs.readdir(DATA_DIR);
  const persons = new Map<string, Person>();

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
    const person: Person = JSON.parse(content);
    persons.set(person.id, person);
  }

  personCache = persons;
  return persons;
}

export async function getPerson(id: string): Promise<Person | null> {
  const persons = await loadAllPersons();
  return persons.get(id) ?? null;
}

export async function getAllPersons(): Promise<Person[]> {
  if (personListCache) return personListCache;
  const persons = await loadAllPersons();
  personListCache = Array.from(persons.values());
  return personListCache;
}

export async function getPersonsByIds(ids: string[]): Promise<Person[]> {
  const persons = await loadAllPersons();
  return ids.map(id => persons.get(id)).filter((p): p is Person => p !== undefined);
}

export function clearCache(): void {
  personCache = null;
  personListCache = null;
}
