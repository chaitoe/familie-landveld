import { Locale } from '@/lib/types';

export function formatPartialDate(
  date: { year: number; month?: number; day?: number; circa?: boolean; before?: boolean; after?: boolean },
  locale: Locale = 'nl'
): string {
  const fmt = new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    year: 'numeric',
    month: date.month ? 'long' : undefined,
    day: date.day ? 'numeric' : undefined,
  });

  const d = new Date(date.year, (date.month ?? 1) - 1, date.day ?? 1);
  let result = fmt.format(d);

  if (date.circa) result = `ca. ${result}`;
  if (date.before) result = locale === 'nl' ? `vóór ${result}` : `before ${result}`;
  if (date.after) result = locale === 'nl' ? `na ${result}` : `after ${result}`;

  return result;
}

export function getYearsBetween(
  from: { year: number },
  to: { year: number }
): number {
  return to.year - from.year;
}
