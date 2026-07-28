import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getPerson } from '@/lib/data/persons';
import { validateToken } from '@/app/api/auth/login/route';
import { PersonEditor } from '@/components/admin/PersonEditor';

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ locale: string; personId: string }>;
}) {
  const { locale, personId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || !validateToken(token)) {
    redirect(`/${locale}/beheer/login`);
  }

  const person = await getPerson(personId);
  if (!person) notFound();

  return (
    <div className="space-y-6">
      <Link href={`/${locale}/beheer`} className="text-sm text-emerald-700 dark:text-emerald-400 hover:underline">
        ← Terug naar beheer
      </Link>
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
          ✏️ Bewerken: {person.firstName} {person.lastName}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Ref: {person.ref}</p>
      </div>
      <PersonEditor person={person} />
    </div>
  );
}
