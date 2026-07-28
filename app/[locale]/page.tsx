import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllPersons } from '@/lib/data/persons';

export default async function HomePage() {
  const t = await getTranslations('app');
  const h = await getTranslations('home');
  const persons = await getAllPersons();
  const ancestorCount = persons.filter(p => !p.isAlive).length;
  const livingCount = persons.filter(p => p.isAlive).length;

  return (
    <div className="space-y-12">
      {/* ── Hero met Kapitein Broos foto ───────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-stone-100 to-emerald-100 dark:from-stone-800 dark:via-stone-700 dark:to-emerald-900">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-10" />
        <div className="relative z-20 flex flex-col md:flex-row items-center gap-6 md:gap-8 px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="flex-shrink-0">
            <img
              src="/media/kapitein-broos-1870.png"
              alt="Kapitein Broos, circa 1870 — foto door S. del Castilho"
              className="w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-64 object-cover rounded-xl border-4 border-white/20 dark:border-white/20 shadow-2xl sepia-[0.4]"
            />
            <p className="text-center text-sm text-stone-400 dark:text-stone-400 mt-2 font-medium">Kapitein Broos, ca. 1870</p>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 dark:text-white mb-3">
              🧬 {t('title')}
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 text-xs rounded-full bg-stone-800/10 dark:bg-white/10 text-stone-700 dark:text-white border border-stone-300 dark:border-white/20">🏃 Brooskampers</span>
              <span className="px-3 py-1 text-xs rounded-full bg-stone-800/10 dark:bg-white/10 text-stone-700 dark:text-white border border-stone-300 dark:border-white/20">🏭 Plantage Rorac</span>
              <span className="px-3 py-1 text-xs rounded-full bg-stone-800/10 dark:bg-white/10 text-stone-700 dark:text-white border border-stone-300 dark:border-white/20">🕊️ Emancipatie 1863</span>
              <span className="px-3 py-1 text-xs rounded-full bg-stone-800/10 dark:bg-white/10 text-stone-700 dark:text-white border border-stone-300 dark:border-white/20">🇸🇷 Suriname</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label={h('persons')} value={persons.length} icon="👥" />
        <StatCard label={h('ancestors')} value={ancestorCount} icon="🕊️" />
        <StatCard label={h('living')} value={livingCount} icon="🟢" />
        <StatCard label={h('generations')} value={5} icon="📊" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickLink href="/stamboom" icon="🌳" title={h('treeLink')} desc={h('treeDesc')} />
        <QuickLink href="/bronnen" icon="📚" title={h('sourcesLink')} desc={h('sourcesDesc')} />
        <QuickLink href="/verhalen" icon="📖" title={h('storiesLink')} desc={h('storiesDesc')} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 text-center shadow-sm">
      <span className="text-3xl">{icon}</span>
      <p className="text-3xl font-bold text-stone-900 dark:text-stone-100 mt-2">{value}</p>
      <p className="text-sm text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}

function QuickLink({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 group">
      <span className="text-4xl">{icon}</span>
      <h3 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mt-3 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{desc}</p>
    </Link>
  );
}
