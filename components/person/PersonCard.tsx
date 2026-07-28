'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Person } from '@/lib/types';
import { formatPartialDate } from '@/lib/date';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const locale = useLocale();
  const t = useTranslations('person');
  const birthStr = person.birth ? formatPartialDate(person.birth, locale as 'nl' | 'en') : null;
  const deathStr = person.death ? formatPartialDate(person.death, locale as 'nl' | 'en') : null;

  const genderIcon = person.gender === 'M' ? '♂️' : person.gender === 'F' ? '♀️' : '⚧';
  const statusIcon = person.isAlive ? '🟢' : '⚫';

  return (
    <Link
      href={`/${locale}/stamboom/${person.id}`}
      className="block group"
    >
      <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200">
        <div className="flex items-start gap-3">
          {/* Avatar placeholder */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
            person.gender === 'M' ? 'bg-blue-400 dark:bg-blue-600' :
            person.gender === 'F' ? 'bg-pink-400 dark:bg-pink-600' :
            'bg-purple-400 dark:bg-purple-600'
          }`}>
            {person.firstName.charAt(0)}{person.lastName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-800 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {person.firstName} {person.lastName}
                </h3>
            {person.birthName && person.birthName !== person.lastName && (
              <p className="text-xs text-stone-500 dark:text-stone-400">{t('birthName')}: {person.birthName}</p>
            )}
          </div>
          <span className="text-lg" title={person.gender === 'M' ? t('male') : t('female')}>
            {genderIcon} {statusIcon}
          </span>
        </div>

        {(birthStr || deathStr) && (
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
            {birthStr && <span>★ {birthStr}</span>}
            {deathStr && (
              <>
                <span className="text-stone-300 dark:text-stone-600">—</span>
                <span>✝ {deathStr}</span>
              </>
            )}
          </div>
        )}

        {person.ref && (
          <div className="mt-2">
            <span className="inline-block px-2 py-0.5 text-xs font-mono bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 rounded">
              {person.ref}
            </span>
          </div>
        )}
          </div>
        </div>
      </div>
    </Link>
  );
}
