import { cookies } from 'next/headers';
import Link from 'next/link';
import { getAllPersons } from '@/lib/data/persons';
import { getAllSources } from '@/lib/data/sources';
import { getAllRelations } from '@/lib/data/relations';
import { validateToken } from '@/app/api/auth/login/route';
import { LogoutButton } from '@/components/admin/LogoutButton';

export default async function BeheerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const isAuthenticated = token ? validateToken(token) : false;

  const persons = await getAllPersons();
  const sources = getAllSources();
  const relations = getAllRelations();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">⚙️ Beheer</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">Beheer personen, bronnen en relaties</p>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link href="/nl/beheer/login" className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm hover:bg-emerald-800">
              Inloggen
            </Link>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
          <p className="text-amber-800 dark:text-amber-200">🔐 Log in om personen te kunnen bewerken of toevoegen.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Personen" value={persons.length} icon="👥" />
        <StatCard label="Bronnen" value={sources.length} icon="📚" />
        <StatCard label="Relaties" value={relations.length} icon="🔗" />
        <StatCard label="Plaatsen" value={7} icon="📍" />
      </div>

      {isAuthenticated && (
        <div className="flex gap-3">
          <Link href="/nl/beheer/nieuw"
            className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm hover:bg-emerald-800 inline-flex items-center gap-2">
            ➕ Nieuwe persoon
          </Link>
        </div>
      )}

      <div>
        <h2 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mb-4">Personen</h2>
        <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 dark:bg-stone-700 border-b border-stone-200 dark:border-stone-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-stone-600 dark:text-stone-400">Ref</th>
                <th className="text-left px-4 py-3 font-medium text-stone-600 dark:text-stone-400">Naam</th>
                <th className="text-left px-4 py-3 font-medium text-stone-600 dark:text-stone-400">Geboren</th>
                <th className="text-left px-4 py-3 font-medium text-stone-600 dark:text-stone-400">Status</th>
                {isAuthenticated && <th className="text-left px-4 py-3 font-medium text-stone-600 dark:text-stone-400">Acties</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
              {persons.map((person) => (
                <tr key={person.id} className="hover:bg-stone-50 dark:hover:bg-stone-700">
                  <td className="px-4 py-2 font-mono text-xs text-stone-500 dark:text-stone-400">{person.ref}</td>
                  <td className="px-4 py-2">
                    <Link href={`/nl/stamboom/${person.id}`} className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                      {person.firstName} {person.lastName}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-stone-500 dark:text-stone-400">{person.birth?.year ?? '?'}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${person.isAlive ? 'bg-green-500' : 'bg-stone-400'}`} />
                  </td>
                  {isAuthenticated && (
                    <td className="px-4 py-2">
                      <Link href={`/nl/beheer/${person.id}`}
                        className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-700 rounded hover:bg-stone-200 dark:hover:bg-stone-600">
                        ✏️ Bewerken
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-4 text-center shadow-sm">
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">{value}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}
