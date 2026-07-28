import { Timeline } from '@/components/timeline/Timeline';

export default function TijdlijnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">📊 Historische Tijdlijn</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Van de eerste Marrons (1740) tot minister Raymond Landveld (2025)</p>
      </div>
      <Timeline />
    </div>
  );
}
