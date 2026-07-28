'use client';

import { useState } from 'react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
  category?: string;
}

const events: TimelineEvent[] = [
  { year: 1740, title: 'Eerste Marrons in Kaaimangrasi', description: 'De eerste gevluchte slaven vestigen zich in het ontoegankelijke moerasgebied Kaaimangrasi, tussen de Surinamerivier en de Boven-Commewijne.', icon: '🏃', category: 'Marronage' },
  { year: 1780, title: 'Geboorte Ma Amba (ca.)', description: 'Stamgrootmoeder Ma Amba wordt geboren in Ghana (Afrika). Zij wordt later als tot slaaf gemaakte naar Suriname gebracht.', icon: '👶', category: 'Familie' },
  { year: 1805, title: 'Geboorte Ma Uwa (ca.)', description: 'Dochter van Ma Amba, moeder van Kapitein Broos, Kaliko en Mandrijntje.', icon: '👶', category: 'Familie' },
  { year: 1821, title: 'Geboorte Kapitein Broos', description: 'De latere leider van de Brooskampers wordt geboren.', icon: '⭐', category: 'Familie' },
  { year: 1835, title: 'Geboorte Kaliko', description: 'Jongere broer van Broos, mede-leider van de Brooskampers.', icon: '👶', category: 'Familie' },
  { year: 1862, title: 'Vredesverdrag met Van Lansberge', description: 'Kapitein Broos sluit vrede met Gouverneur-Generaal Van Lansberge. Hij ontvangt zijn kapiteinstitel en Plantage Rorac wordt officieel toegewezen.', icon: '🤝', category: 'Emancipatie' },
  { year: 1863, title: 'Emancipatie & Vestiging Rorac', description: 'Op 1 juli 1863 wordt de slavernij afgeschaft. De Brooskampers vestigen zich definitief op Plantage Rorac. De familienamen Babel, Landveld, Meiland en Deekman worden geregistreerd bij de Burgerlijke Stand.', icon: '🕊️', category: 'Emancipatie' },
  { year: 1870, title: 'Foto Kapitein Broos', description: 'S. del Castilho maakt de enige bewaard gebleven foto van Kapitein Broos — de enige Surinaamse vrijheidsstrijder van wie een foto bestaat.', icon: '📷', category: 'Familie' },
  { year: 1880, title: 'Overlijden Kapitein Broos', description: 'Kapitein Broos overlijdt op ca. 59-jarige leeftijd op Plantage Rorac.', icon: '✝️', category: 'Familie' },
  { year: 1921, title: 'Volkstelling Suriname', description: '77 personen met de achternaam Landveld worden geregistreerd in Suriname. Open Archieven bevat 308 vermeldingen.', icon: '📋', category: 'Registratie' },
  { year: 1945, title: 'Landveld in De West', description: 'Eerste krantenvermelding in Delpher: "Uit de Rechtszaal — Bijna gelukt" in De West (13 juli 1945).', icon: '📰', category: 'Media' },
  { year: 1947, title: 'Arbeider op Paranam', description: 'Krantenbericht: "Arbeider op Paranam dood gevonden" — een Landveld werkzaam bij de Suralco bauxietmijn.', icon: '📰', category: 'Media' },
  { year: 1951, title: 'Jaguar-aanval', description: 'Een Landveld wordt door een jaguar aangevallen en raakt gewond aan beide armen. Opgenomen in \'s Lands Hospitaal. Het nieuws haalt de Nederlandse kranten.', icon: '🐆', category: 'Media' },
  { year: 1960, title: 'Geboorte Frits Landveld (ca.)', description: 'Geboren in Suriname. Wordt later genoemd op het SurinaamseGenealogie forum.', icon: '👶', category: 'Familie' },
  { year: 1970, title: 'Geboorte Raymond Landveld (ca.)', description: 'Toekomstig minister van Transport, Communicatie en Toerisme (TCT) van Suriname.', icon: '👶', category: 'Familie' },
  { year: 1996, title: 'Publicatie Hoogbergens boek', description: 'Wim Hoogbergen publiceert "Het kamp van Broos en Kaliko" — het standaardwerk over de Brooskampers. Bekroond met de Eureka-prijs 1998.', icon: '📖', category: 'Onderzoek' },
  { year: 2025, title: 'Minister Raymond Landveld', description: 'Raymond Harold Landveld wordt op 16 juli 2025 minister van TCT van Suriname. Eerder was hij presidentskandidaat namens de BEP.', icon: '🏛️', category: 'Familie' },
];

const categoryColors: Record<string, string> = {
  Marronage: 'bg-orange-100 text-orange-800 border-orange-300',
  Familie: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Emancipatie: 'bg-sky-100 text-sky-800 border-sky-300',
  Registratie: 'bg-purple-100 text-purple-800 border-purple-300',
  Media: 'bg-amber-100 text-amber-800 border-amber-300',
  Onderzoek: 'bg-rose-100 text-rose-800 border-rose-300',
};

export function Timeline() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = selectedCat
    ? events.filter(e => e.category === selectedCat)
    : events;

  const categories = [...new Set(events.map(e => e.category!))];

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCat(null)}
          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
            !selectedCat ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 border-stone-800 dark:border-stone-200' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700'
          }`}
        >
          Alles
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat === selectedCat ? null : cat)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              cat === selectedCat
                ? (categoryColors[cat]?.replace('100', '200') + ' font-medium')
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 -translate-x-1/2" />

        <div className="space-y-8">
          {filtered.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Year marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center text-xs font-bold shadow">
                    {event.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-sm font-bold text-stone-800">{event.year}</span>
                      {event.category && categoryColors[event.category] && (
                        <span className={`px-2 py-0.5 text-[10px] rounded-full border ${categoryColors[event.category]}`}>
                          {event.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-semibold text-stone-800">{event.title}</h3>
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
