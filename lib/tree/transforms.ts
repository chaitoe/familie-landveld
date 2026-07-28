import type { Person, Relation } from '@/lib/types';
import type { Node, Edge } from '@xyflow/react';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;
const H_GAP = 60;
const V_GAP = 120;

export interface TreeData {
  nodes: Node[];
  edges: Edge[];
}

export function buildTreeData(
  persons: Person[],
  relations: Relation[]
): TreeData {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const personMap = new Map(persons.map(p => [p.id, p]));

  // ── Beperk tot voorouders (Ma Amba → ... → moderne Landvelds) ──
  // Start bij Ma Amba (geen ouders), werk naar beneden via PARENT_CHILD relaties
  const ancestors = new Set<string>();
  const childrenMap = new Map<string, string[]>();

  for (const rel of relations) {
    if (rel.type === 'PARENT_CHILD') {
      const parent = rel.person1Id;
      const child = rel.person2Id;
      if (!childrenMap.has(parent)) childrenMap.set(parent, []);
      childrenMap.get(parent)!.push(child);
    }
  }

  // Vind personen zonder ouders (roots)
  const allChildren = new Set<string>();
  for (const rel of relations) {
    if (rel.type === 'PARENT_CHILD') {
      allChildren.add(rel.person2Id);
    }
  }
  const roots = persons.filter(p => !allChildren.has(p.id));

  // BFS om generaties toe te kennen
  const generation = new Map<string, number>();

  function assignGeneration(personId: string, gen: number) {
    if (generation.has(personId)) return;
    generation.set(personId, gen);
    const children = childrenMap.get(personId) ?? [];
    for (const child of children) {
      assignGeneration(child, gen + 1);
    }
  }

  for (const root of roots) {
    assignGeneration(root.id, 0);
  }

  // Geef resterende personen een generatie
  for (const p of persons) {
    if (!generation.has(p.id)) {
      generation.set(p.id, 5);
    }
  }

  // Groepeer per generatie voor x-positie
  const genGroups = new Map<number, string[]>();
  for (const [id, gen] of generation) {
    if (!genGroups.has(gen)) genGroups.set(gen, []);
    genGroups.get(gen)!.push(id);
  }

  // Maak nodes
  for (const [gen, personIds] of genGroups) {
    const totalInGen = personIds.length;
    personIds.forEach((personId, index) => {
      const person = personMap.get(personId);
      if (!person) return;

      const xOffset =
        totalInGen === 1
          ? 0
          : (index - (totalInGen - 1) / 2) * (NODE_WIDTH + H_GAP);

      const deathYear = person.death?.year;
      const years = deathYear
        ? `${person.birth?.year ?? '?'}-${deathYear}`
        : person.birth?.year
          ? `${person.birth.year}-`
          : '';

      nodes.push({
        id: person.id,
        type: 'personNode',
        position: { x: xOffset, y: gen * (NODE_HEIGHT + V_GAP) },
        data: {
          id: person.id,
          ref: person.ref,
          firstName: person.firstName,
          lastName: person.lastName,
          years,
          gender: person.gender,
          isAlive: person.isAlive,
        },
      });
    });
  }

  // Maak edges
  for (const rel of relations) {
    if (rel.type === 'PARENT_CHILD') {
      edges.push({
        id: rel.id,
        source: rel.person1Id,
        target: rel.person2Id,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#a8a29e', strokeWidth: 1.5 },
      });
    }
    if (rel.type === 'SPOUSE') {
      edges.push({
        id: rel.id,
        source: rel.person1Id,
        target: rel.person2Id,
        type: 'straight',
        style: { stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '5,5' },
        label: '💒',
      });
    }
  }

  return { nodes, edges };
}
