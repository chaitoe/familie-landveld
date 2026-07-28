export default async function VerhalenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">📖 Familieverhalen</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">De geschiedenis van de Landveld familie en de Brooskampers</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VerhaalCard title="De Brooskampers — Bakabusi Sama"
          desc="Het verhaal van de Marron-gemeenschap die onder leiding van Kapitein Broos (1821–1880) in vrijheid leefde in het ontoegankelijke moerasgebied Kaaimangrasi."
          tags={['Marronage', 'Brooskampers', 'Vrijheidsstrijd']}
          img="/media/kapitein-broos-1870.png" />
        <VerhaalCard title="Plantage Rorac — Friti"
          desc="Na de emancipatie van 1863 werd Plantage Rorac bij Koninklijk Besluit geschonken aan de Brooskampers. Hier ontstonden de familienamen Babel, Landveld, Meiland en Deekman."
          tags={['Emancipatie', 'Plantage', '1863']}
          img="/media/stamboom-origineel.jpeg" />
        <VerhaalCard title="Kapitein Broos — De Vredesovereenkomst"
          desc="In 1862 sloot Kapitein Broos een historische vredesovereenkomst met Gouverneur-Generaal Van Lansberge. Hij is de enige Surinaamse vrijheidsstrijder van wie een foto bewaard is gebleven."
          tags={['Kapitein Broos', 'Vredesverdrag', '1862']} />
        <VerhaalCard title="Ma Amba — Stamgrootmoeder uit Ghana"
          desc="De stamgrootmoeder van de Brooskampers werd geboren in Ghana (Afrika) en als tot slaaf gemaakte naar Suriname gebracht. Haar nazaten vormen de families Babel, Landveld, Meiland en Deekman."
          tags={['Afrika', 'Ghana', 'Stamgrootmoeder']} />
      </div>
    </div>
  );
}

function VerhaalCard({ title, desc, tags, img }: { title: string; desc: string; tags: string[]; img?: string }) {
  return (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200">
      {img && (
        <div className="h-48 overflow-hidden bg-stone-100 dark:bg-stone-700">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mb-2">{title}</h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="inline-block px-2 py-0.5 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
