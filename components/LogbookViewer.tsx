'use client';

import { useCallback, useEffect, useState } from 'react';

interface LogbookViewerProps {
  pages: number;
  basePath: string;
}

function fileNumber(n: number): string {
  return String(n).padStart(4, '0');
}

function pageUrl(basePath: string, n: number): string {
  return `${basePath}/NL-MdbZA_20_1077_${fileNumber(n)}.jpg`;
}

function thumbUrl(basePath: string, n: number): string {
  return `${basePath}/thumbs/NL-MdbZA_20_1077_${fileNumber(n)}.jpg`;
}

export function LogbookViewer({ pages, basePath }: LogbookViewerProps) {
  const [page, setPage] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const goTo = useCallback(
    (n: number) => setPage(Math.min(pages, Math.max(1, n))),
    [pages]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(page - 1);
      if (e.key === 'ArrowRight') goTo(page + 1);
      if (e.key === 'Escape') setZoomed(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, goTo]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Vorige
        </button>
        <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
          Pagina {page} van {pages}
        </span>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page === pages}
          className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Volgende →
        </button>
      </div>

      {/* Main page */}
      <div
        className={`bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-4 flex items-center justify-center ${
          zoomed ? 'fixed inset-0 z-50 m-0 rounded-none border-0 bg-stone-900/90 p-4 cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setZoomed(z => !z)}
        title={zoomed ? 'Klik om te sluiten (Esc)' : 'Klik om te vergroten'}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pageUrl(basePath, page)}
          alt={`Scheepsjournaal pagina ${page}`}
          className={`object-contain rounded shadow ${
            zoomed ? 'max-h-full max-w-full' : 'max-h-[75vh] w-auto max-w-full'
          }`}
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-1.5 overflow-x-auto pb-2" role="tablist" aria-label="Pagina-overzicht">
        {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            type="button"
            onClick={() => goTo(n)}
            className={`shrink-0 rounded overflow-hidden border-2 transition-colors ${
              n === page
                ? 'border-emerald-600 dark:border-emerald-400'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            title={`Pagina ${n}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl(basePath, n)}
              alt={`Pagina ${n}`}
              loading="lazy"
              className="h-16 w-12 object-cover"
            />
          </button>
        ))}
      </div>

      <p className="text-xs text-stone-400 dark:text-stone-500">
        Gebruik de pijltjestoetsen ← → om te bladeren. Klik op een pagina om te vergroten.
      </p>
    </div>
  );
}
