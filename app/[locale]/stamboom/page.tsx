import { getTranslations } from 'next-intl/server';
import { getAllPersons } from '@/lib/data/persons';
import { getAllRelations } from '@/lib/data/relations';
import { FamilyTree } from '@/components/tree/FamilyTree';

export default async function StamboomPage() {
  const t = await getTranslations('nav');
  const persons = await getAllPersons();
  const relations = getAllRelations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">🌳 {t('stamboom')}</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          {persons.length} personen · {relations.length} relaties · Van Ma Amba (Ghana) tot heden
        </p>
      </div>

      {/* Banner met originele stamboom */}
      <div className="bg-stone-100 dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 text-center">📜 Originele stamboom — als referentie gebruikt voor dit onderzoek</p>
        <img
          src="/media/stamboom-origineel.jpeg"
          alt="Originele stamboom Familie Landveld"
          className="w-full max-h-96 object-contain rounded-lg"
        />
      </div>

      <FamilyTree persons={persons} />

      <div>
        <h2 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mb-4">Alle Personen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {persons.map((person) => (
            <a key={person.id} href={`/nl/stamboom/${person.id}`}
              className="block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm transition-all">
              <p className="font-medium text-stone-800 dark:text-stone-200">{person.firstName} {person.lastName}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {person.birth?.year ?? '?'} — {person.death?.year ?? (person.isAlive ? 'heden' : '?')}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-1">{person.ref}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
