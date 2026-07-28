'use client';

import { useTranslations } from 'next-intl';
import { type Source } from '@/lib/types';

interface SourceCardProps {
  source: Source;
}

const typeIcons: Record<string, string> = {
  ARCHIVE: '🗄️', NEWSPAPER: '📰', BOOK: '📖', INTERVIEW: '🎙️',
  WEBSITE: '🌐', PHOTO: '📷', DNA: '🧬', OTHER: '📌',
};

export function SourceCard({ source }: SourceCardProps) {
  const t = useTranslations('source');
  const typeLabel = t(`types.${source.type}` as any);

  return (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{typeIcons[source.type] ?? '📌'}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-stone-800 dark:text-stone-200 truncate">{source.title}</h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded">
            {typeLabel}
          </span>
          {source.archiveRef && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-mono">{source.archiveRef}</p>
          )}
          {source.url && (
            <a href={source.url} target="_blank" rel="noopener noreferrer"
              className="block text-xs text-emerald-700 dark:text-emerald-400 hover:underline mt-1 truncate">
              {source.url}
            </a>
          )}
          {source.notes && (
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-3">{source.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
