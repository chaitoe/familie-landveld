'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Person, Place } from '@/lib/types';
import { getPlace } from '@/lib/data/places';
import { formatPartialDate } from '@/lib/date';

interface PersonDetailProps {
  person: Person;
}

export function PersonDetail({ person }: PersonDetailProps) {
  const locale = useLocale();
  const t = useTranslations('person');
  const birthStr = person.birth ? formatPartialDate(person.birth, locale as 'nl' | 'en') : t('unknown');
  const deathStr = person.death ? formatPartialDate(person.death, locale as 'nl' | 'en') : (person.isAlive ? '—' : t('unknown'));

  const birthPlace: Place | undefined = person.birthPlaceId ? getPlace(person.birthPlaceId) : undefined;
  const deathPlace: Place | undefined = person.deathPlaceId ? getPlace(person.deathPlaceId) : undefined;
  const genderLabel = person.gender === 'M' ? t('male') : person.gender === 'F' ? t('female') : t('other');
  const statusLabel = person.isAlive ? t('alive') : t('deceased');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Portrait (if available) */}
        {person.portraitMediaId && (
          <div className="flex-shrink-0">
            <img
              src="/media/kapitein-broos-1870.png"
              alt={`${person.firstName} ${person.lastName}`}
              className="w-36 h-48 object-cover rounded-lg border-2 border-stone-200 dark:border-stone-600 shadow-md sepia-[0.3]"
            />
          </div>
        )}
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            {person.firstName} {person.lastName}
          </h1>
          {person.birthName && person.birthName !== person.lastName && (
            <p className="text-stone-500 dark:text-stone-400 mt-1">{t('birthName')}: {person.birthName}</p>
          )}
          <div className="flex items-center gap-1 mt-1 text-sm text-stone-500 dark:text-stone-400">
            <span className="font-mono">{person.ref}</span>
            <span>{person.gender === 'M' ? '♂️' : person.gender === 'F' ? '♀️' : '⚧'} {genderLabel}</span>
            <span>{person.isAlive ? '🟢' : '⚫'} {statusLabel}</span>
          </div>
        </div>
      </div>

      {/* Birth / Death */}
      <div className="grid grid-cols-2 gap-4 bg-stone-50 dark:bg-stone-800 rounded-lg p-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">{t('born')}</span>
          <p className="font-medium text-stone-800 dark:text-stone-200">{birthStr}</p>
          {birthPlace && <p className="text-sm text-stone-500 dark:text-stone-400">{birthPlace.name}, {birthPlace.country}</p>}
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">{t('died')}</span>
          <p className="font-medium text-stone-800 dark:text-stone-200">{deathStr}</p>
          {deathPlace && <p className="text-sm text-stone-500 dark:text-stone-400">{deathPlace.name}, {deathPlace.country}</p>}
        </div>
      </div>

      {/* Biography */}
      {person.biography && (
        <div>
          <h2 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">{t('biography')}</h2>
          <div className="prose prose-stone dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
            {person.biography}
          </div>
        </div>
      )}

      {/* Custom Fields */}
      {person.customFields.length > 0 && (
        <div>
          <h2 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">{t('customFields')}</h2>
          <dl className="grid grid-cols-2 gap-2">
            {person.customFields.map((field) => (
              <div key={field.key} className="bg-stone-50 dark:bg-stone-800 rounded p-2">
                <dt className="text-xs text-stone-500 dark:text-stone-400">{field.key}</dt>
                <dd className="text-sm font-medium text-stone-800 dark:text-stone-200">{String(field.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
