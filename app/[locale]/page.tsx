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

      {/* ── Welkom / Intro ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100">Welkom bij de Familie Landveld</h2>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            Deze stamboom volgt de nakomelingen van de <strong>Brooskampers</strong> (Bakabusi Sama) —
            een Marron-gemeenschap die onder leiding van <strong>Kapitein Broos</strong> (1821–1880)
            in vrijheid leefde in het ontoegankelijke moerasgebied Kaaimangrasi in Suriname.
          </p>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            Anders dan veel Surinaamse families stammen de Landvelds <strong>niet</strong> af van tot slaaf
            gemaakten die op plantages werkten. Zij waren gevluchte Marrons die zich pas
            <strong>na de emancipatie van 1 juli 1863</strong> officieel lieten registreren bij de
            Burgerlijke Stand op <strong>Plantage Rorac</strong> aan de Surinamerivier.
          </p>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            De stamgrootmoeder <strong>Ma Amba</strong> werd nog in <strong>Ghana (Afrika)</strong> geboren.
            Haar nazaten vormden de families <strong>Babel</strong>, <strong>Landveld</strong>,
            <strong>Meiland</strong> en <strong>Deekman</strong>. Kapitein Broos is de enige Surinaamse
            vrijheidsstrijder van wie een foto bewaard is gebleven — zijn portret siert deze pagina.
          </p>
        </div>
        <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">📖 Aanbevolen literatuur</h3>
          <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            <p>
              <strong>Wim Hoogbergen</strong> — <em>Het kamp van Broos en Kaliko: de geschiedenis van een Afro-Surinaamse familie</em>
              (Prometheus, 1996; heruitgave VACO). 232 pagina's. Bekroond met de Eureka-prijs 1998.
            </p>
            <p>
              Dit boek bevat mondelinge overleveringen, genealogische gegevens en de complete geschiedenis
              van de Brooskampers. Een must-read voor iedereen die de familiegeschiedenis wil verdiepen.
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500">
              📚 Dit onderzoek maakt gebruik van 11 bronnen waaronder het Nationaal Archief,
              WieWasWie (77 documenten), Open Archieven (308 vermeldingen) en het Delpher
              krantenarchief (796 artikelen).
            </p>
          </div>
        </div>
      </div>

      {/* ── Uitgelichte Personen ───────────────────────── */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">⭐ Uitgelichte Personen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'landveld-ma-amba', label: 'Stamgrootmoeder', desc: 'Geboren in Ghana, Afrika' },
            { id: 'landveld-broos', label: 'Vrijheidsstrijder', desc: 'Kapitein Broos (1821–1880)' },
            { id: 'landveld-gen1863', label: 'Eerste Generatie', desc: 'Landveld op Rorac, 1863' },
            { id: 'landveld-raymond', label: 'Minister TCT', desc: 'Raymond Landveld (2025–heden)' },
          ].map(p => {
            const person = persons.find(x => x.id === p.id);
            if (!person) return null;
            return (
              <Link key={p.id} href={`/stamboom/${p.id}`}
                className="block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl">
                    {person.portraitUrl || person.portraitMediaId ? '📸' : person.firstName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {person.firstName} {person.lastName}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{p.label}</p>
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">{p.desc}</p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2">
                  {person.birth?.year ?? '?'} — {person.death?.year ?? (person.isAlive ? 'heden' : '?')}
                </p>
              </Link>
            );
          })}
        </div>
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
