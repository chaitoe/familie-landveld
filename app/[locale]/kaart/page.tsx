'use client';

import dynamic from 'next/dynamic';

const PlantationMapDynamic = dynamic(
  () => import('@/components/map/PlantationMap').then(mod => ({ default: mod.PlantationMap })),
  { ssr: false, loading: () => <div className="h-[500px] bg-stone-100 dark:bg-stone-800 rounded-xl animate-pulse flex items-center justify-center text-stone-400 dark:text-stone-500">🗺️ Kaart laden...</div> }
);

export default function KaartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">🗺️ Kaart — Suriname</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Historische locaties: plantages, steden en marrongebieden verbonden aan de familie Landveld</p>
      </div>
      <PlantationMapDynamic />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <LegendItem color="#b45309" label="Plantage" />
        <LegendItem color="#1d4ed8" label="Stad" />
        <LegendItem color="#15803d" label="Dorp" />
        <LegendItem color="#7c3aed" label="District" />
        <LegendItem color="#be123c" label="Land" />
        <LegendItem color="#0891b2" label="Regio" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />{label}
    </div>
  );
}
