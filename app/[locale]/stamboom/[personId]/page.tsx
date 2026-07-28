import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getPerson } from '@/lib/data/persons';
import { getRelationsForPerson } from '@/lib/data/relations';
import { getPerson as getPersonById } from '@/lib/data/persons';
import { PersonDetail } from '@/components/person/PersonDetail';
import { PDFExportButton } from '@/components/export/PDFExportButton';

export default async function PersonPage({
  params,
}: {
  params: Promise<{ locale: string; personId: string }>;
}) {
  const { locale, personId } = await params;
  const person = await getPerson(personId);
  if (!person) notFound();

  const t = await getTranslations('person');
  const c = await getTranslations('common');
  const relations = getRelationsForPerson(person.id);
  const parentIds = relations.filter(r => r.type === 'PARENT_CHILD' && r.person2Id === person.id).map(r => r.person1Id);
  const childIds = relations.filter(r => r.type === 'PARENT_CHILD' && r.person1Id === person.id).map(r => r.person2Id);
  const spouseIds = relations.filter(r => r.type === 'SPOUSE').map(r => (r.person1Id === person.id ? r.person2Id : r.person1Id));
  const siblingIds = relations.filter(r => r.type === 'SIBLING').map(r => (r.person1Id === person.id ? r.person2Id : r.person1Id));

  return (
    <div className="space-y-8">
      <Link href={`/${locale}/stamboom`} className="text-sm text-emerald-700 dark:text-emerald-400 hover:underline">
        ← {c('back')}
      </Link>
      <PersonDetail person={person} />
      <PDFExportButton person={person} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title={t('parents')} ids={parentIds} locale={locale} empty={t('noParents')} />
        <Section title={t('spouses')} ids={spouseIds} locale={locale} empty={t('noSpouses')} />
        <Section title={t('children')} ids={childIds} locale={locale} empty={t('noChildren')} />
        <Section title={t('siblings')} ids={siblingIds} locale={locale} empty={locale === 'nl' ? 'Geen broers/zussen bekend' : 'No siblings known'} />
      </div>
    </div>
  );
}

function Section({ title, ids, locale, empty }: { title: string; ids: string[]; locale: string; empty: string }) {
  return (
    <div>
      <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200 mb-3">{title}</h3>
      {ids.length === 0 ? (
        <p className="text-sm text-stone-500 dark:text-stone-400">{empty}</p>
      ) : (
        <div className="space-y-2">
          {ids.map(id => (<FamilyLink key={id} personId={id} locale={locale} />))}
        </div>
      )}
    </div>
  );
}

async function FamilyLink({ personId, locale }: { personId: string; locale: string }) {
  const person = await getPersonById(personId);
  if (!person) return null;
  return (
    <Link href={`/${locale}/stamboom/${person.id}`}
      className="block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-3 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
      <p className="font-medium text-stone-800 dark:text-stone-200">{person.firstName} {person.lastName}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">
        {person.birth?.year ?? '?'} — {person.death?.year ?? (person.isAlive ? (locale === 'nl' ? 'heden' : 'now') : '?')}
      </p>
    </Link>
  );
}
