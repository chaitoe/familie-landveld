import { getTranslations } from 'next-intl/server';
import { getAllSources } from '@/lib/data/sources';
import { SourceCard } from '@/components/source/SourceCard';

export default async function BronnenPage() {
  const t = await getTranslations('source');
  const sources = getAllSources();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">📚 {t('title')}</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">{sources.length} bronnen geraadpleegd in dit onderzoek</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>
    </div>
  );
}
