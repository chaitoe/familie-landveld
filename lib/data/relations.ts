import { Relation } from '@/lib/types';
import relations from '@/data/relations.json';

export function getAllRelations(): Relation[] {
  return relations as Relation[];
}

export function getRelationsForPerson(personId: string): Relation[] {
  return (relations as Relation[]).filter(
    r => r.person1Id === personId || r.person2Id === personId
  );
}

export function getParentChildRelations(): Relation[] {
  return (relations as Relation[]).filter(r => r.type === 'PARENT_CHILD');
}

export function getSpouseRelations(): Relation[] {
  return (relations as Relation[]).filter(r => r.type === 'SPOUSE');
}
