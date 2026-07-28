'use client';

import dynamic from 'next/dynamic';
import { getAllPlaces } from '@/lib/data/places';
import type { Place } from '@/lib/types';

const PlantationMapDynamic = dynamic(
  () => import('@/components/map/PlantationMap').then(mod => ({ default: mod.PlantationMap })),
  { ssr: false, loading: () => <div className="h-[520px] bg-stone-100 dark:bg-stone-800 rounded-xl animate-pulse flex items-center justify-center text-stone-400 dark:text-stone-500">🗺️ Kaart laden...</div> }
);

const typeLabel: Record<string, string> = {
  COUNTRY: 'Land',
  CITY: 'Stad',
  PLANTATION: 'Plantage',
  VILLAGE: 'Dorp',
  DISTRICT: 'District',
  REGION: 'Regio',
};

const typeColor: Record<string, string> = {
  COUNTRY: '#b91c1c',
  CITY: '#1d4ed8',
  PLANTATION: '#92400e',
  VILLAGE: '#15803d',
  DISTRICT: '#7c3aed',
  REGION: '#0891b2',
};

const typeBg: Record<string, string> = {
  COUNTRY: '#fecaca',
  CITY: '#dbeafe',
  PLANTATION: '#fde68a',
  VILLAGE: '#dcfce7',
  DISTRICT: '#ede9fe',
  REGION: '#cffafe',
};

export default function KaartPage() {
  const places = getAllPlaces();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">🗺️ Kaart — Suriname</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Historische locaties: plantages, steden en marrongebieden verbonden aan de familie Landveld.
          <span className="hidden sm:inline"> Klik op een marker voor details, of op 🛰️ rechtsboven voor satellietweergave.</span>
        </p>
      </div>

      <PlantationMapDynamic />

      {/* ── Legenda ──────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {Object.entries(typeLabel).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 rounded-lg px-3 py-2">
            <span className="w-3 h-3 rounded-full border-2" style={{ backgroundColor: (typeBg as any)[type], borderColor: (typeColor as any)[type] }} />
            {label}
          </div>
        ))}
      </div>

      {/* ── Routes legenda ───────────────────────────────── */}
      <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 rounded-lg p-3">
        <span className="font-medium text-stone-700 dark:text-stone-300">🛤️ Routes:</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0.5 rounded" style={{ background: '#dc2626', opacity: 0.7 }} /> Trans-Atlantisch</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0.5 rounded" style={{ background: '#d97706', opacity: 0.7 }} /> Rorac → Kaaimangrasi</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0.5 rounded" style={{ background: '#059669', opacity: 0.7 }} /> Kaaimangrasi → Surnaukreek</span>
        <span className="flex items-center gap-1"><span className="w-8 h-0.5 rounded" style={{ background: '#2563eb', opacity: 0.7 }} /> Paramaribo ↔ Rorac</span>
      </div>

      {/* ── Locatiekaartjes ──────────────────────────────── */}
      <div>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">📍 Locaties & hun betekenis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {places.filter(p => p.description).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const color = typeColor[place.type] ?? '#0891b2';
  const bg = typeBg[place.type] ?? '#cffafe';
  const label = typeLabel[place.type] ?? place.type;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: bg, border: `2px solid ${color}` }}
        >
          {place.type === 'PLANTATION' ? '🌾' :
           place.type === 'CITY' ? '🏙️' :
           place.type === 'VILLAGE' ? '🏘️' :
           place.type === 'REGION' ? '🌿' :
           place.type === 'COUNTRY' ? '🌍' : '📍'}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100">{place.name}</h3>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: bg, color }}
            >
              {label}
            </span>
            {place.period && (
              <span className="text-[10px] text-stone-400 dark:text-stone-500">🕐 {place.period}</span>
            )}
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
            {place.description}
          </p>
          {place.significance && (
            <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-md p-2">
              <strong>👨‍👩‍👧‍👦 Familieband:</strong> {place.significance}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

