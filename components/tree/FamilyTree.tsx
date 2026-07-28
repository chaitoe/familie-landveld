'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Person } from '@/lib/types';
import { getAllRelations } from '@/lib/data/relations';
import { buildTreeData } from '@/lib/tree/transforms';

// ── Custom Person Node ──────────────────────────────────
function PersonNode({ data }: NodeProps) {
  const locale = useLocale();
  const { firstName, lastName, years, gender, isAlive, ref } = data as {
    id: string;
    firstName: string;
    lastName: string;
    years: string;
    gender: string;
    isAlive: boolean;
    ref: string;
  };

  const genderColor =
    gender === 'M' ? 'border-blue-300' : gender === 'F' ? 'border-pink-300' : 'border-purple-300';
  const statusColor = isAlive ? 'bg-green-500' : 'bg-stone-400';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-stone-400" />
      <Link href={`/${locale}/stamboom/${data.id}`} className="block no-underline">
        <div
          className={`bg-white dark:bg-stone-800 border-2 ${genderColor} rounded-lg px-4 py-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 min-w-[180px] cursor-pointer`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${statusColor} flex-shrink-0`}
              title={isAlive ? 'In leven' : 'Overleden'}
            />
            <span className="font-serif font-semibold text-stone-800 dark:text-stone-100 text-sm truncate">
              {firstName} {lastName}
            </span>
          </div>
          {years && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 ml-4">{years}</p>
          )}
          <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 ml-4 font-mono">{ref}</p>
        </div>
      </Link>
      <Handle type="source" position={Position.Bottom} className="!bg-stone-400" />
    </>
  );
}

const nodeTypes = { personNode: PersonNode };

// ── Family Tree Component ───────────────────────────────
interface FamilyTreeProps {
  persons: Person[];
}

export function FamilyTree({ persons }: FamilyTreeProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildTreeData(persons, getAllRelations()),
    [persons]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const defaultViewport = useMemo(() => ({ x: 300, y: 50, zoom: 0.9 }), []);

  return (
    <div className="w-full h-[600px] border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#78716c" gap={24} className="dark:!bg-stone-900" />
        <Controls className="!bg-white dark:!bg-stone-700 !border-stone-200 dark:!border-stone-600 !rounded-lg [&>button]:!bg-white dark:[&>button]:!bg-stone-700 dark:[&>button]:!text-stone-300 dark:[&>button]:!border-stone-600 dark:[&>button]:hover:!bg-stone-600" />
        <MiniMap
          className="!bg-stone-100 dark:!bg-stone-700 !border-stone-200 dark:!border-stone-600 !rounded-lg"
          nodeColor={(node) => {
            const gender = node.data?.gender;
            return gender === 'M' ? '#93c5fd' : gender === 'F' ? '#f9a8d4' : '#d8b4fe';
          }}
        />
      </ReactFlow>
    </div>
  );
}
