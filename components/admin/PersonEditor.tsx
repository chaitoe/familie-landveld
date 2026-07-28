'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Person } from '@/lib/types';

interface PersonEditorProps {
  person?: Person; // undefined = new person
  onSaved?: () => void;
}

export function PersonEditor({ person, onSaved }: PersonEditorProps) {
  const router = useRouter();
  const isNew = !person;

  const [form, setForm] = useState({
    id: person?.id || '',
    ref: person?.ref || '',
    firstName: person?.firstName || '',
    lastName: person?.lastName || 'Landveld',
    birthName: person?.birthName || '',
    gender: person?.gender || 'M',
    isAlive: person?.isAlive ?? true,
    birthYear: person?.birth?.year?.toString() || '',
    deathYear: person?.death?.year?.toString() || '',
    birthPlaceId: person?.birthPlaceId || '',
    deathPlaceId: person?.deathPlaceId || '',
    biography: person?.biography || '',
    customFields: person?.customFields?.map(f => ({ key: f.key, value: String(f.value) })) || [],
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...(isNew && { id: form.id || undefined, ref: form.ref || undefined }),
      firstName: form.firstName,
      lastName: form.lastName,
      birthName: form.birthName || undefined,
      gender: form.gender,
      isAlive: form.isAlive,
      birth: form.birthYear ? { year: parseInt(form.birthYear), circa: false } : null,
      death: form.deathYear ? { year: parseInt(form.deathYear), circa: false } : null,
      birthPlaceId: form.birthPlaceId || null,
      deathPlaceId: form.deathPlaceId || null,
      biography: form.biography,
      customFields: form.customFields.filter(f => f.key).map(f => ({ key: f.key, value: f.value, type: 'TEXT' as const })),
    };

    const url = isNew ? '/api/persons' : `/api/persons/${person!.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMessage(isNew ? '✅ Persoon aangemaakt!' : '✅ Persoon bijgewerkt!');
      if (onSaved) onSaved();
      router.refresh();
      if (isNew) {
        // Reset form
        setForm(f => ({ ...f, id: '', ref: '', firstName: '', biography: '', customFields: [] }));
      }
    } else {
      setMessage('❌ Fout bij opslaan');
    }
    setSaving(false);
  };

  const addCustomField = () => {
    setForm(f => ({ ...f, customFields: [...f.customFields, { key: '', value: '' }] }));
  };

  const updateCustomField = (idx: number, field: 'key' | 'value', val: string) => {
    setForm(f => {
      const updated = [...f.customFields];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...f, customFields: updated };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isNew && (
          <>
            <Field label="Bestands-ID" value={form.id} onChange={v => setForm(f => ({ ...f, id: v }))} placeholder="landveld-nieuw" />
            <Field label="Referentie" value={form.ref} onChange={v => setForm(f => ({ ...f, ref: v }))} placeholder="LANDVELD-NEW" />
          </>
        )}
        <Field label="Voornaam" value={form.firstName} onChange={v => setForm(f => ({ ...f, firstName: v }))} required />
        <Field label="Achternaam" value={form.lastName} onChange={v => setForm(f => ({ ...f, lastName: v }))} required />
        <Field label="Geboortenaam" value={form.birthName} onChange={v => setForm(f => ({ ...f, birthName: v }))} />
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Geslacht</label>
          <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value as 'M' | 'F' | 'X' }))}
            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100">
            <option value="M">Man</option>
            <option value="F">Vrouw</option>
            <option value="X">Anders</option>
          </select>
        </div>
        <div className="flex items-center gap-4 pt-6">
          <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
            <input type="checkbox" checked={form.isAlive} onChange={e => setForm(f => ({ ...f, isAlive: e.target.checked }))}
              className="rounded" /> In leven
          </label>
        </div>
        <Field label="Geboortejaar" value={form.birthYear} onChange={v => setForm(f => ({ ...f, birthYear: v }))} placeholder="1821" type="number" />
        <Field label="Overlijdensjaar" value={form.deathYear} onChange={v => setForm(f => ({ ...f, deathYear: v }))} placeholder="1880" type="number" disabled={form.isAlive} />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Biografie (Markdown)</label>
        <textarea value={form.biography} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))}
          rows={8}
          className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Schrijf de biografie in Markdown..." />
      </div>

      {/* Custom Fields */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Aanvullende velden</label>
          <button type="button" onClick={addCustomField}
            className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-700 rounded hover:bg-stone-200 dark:hover:bg-stone-600">
            + Veld toevoegen
          </button>
        </div>
        {form.customFields.map((field, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={field.key} onChange={e => updateCustomField(idx, 'key', e.target.value)}
              placeholder="Sleutel (bv. srananName)" className="flex-1 px-2 py-1 text-sm border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100" />
            <input value={field.value} onChange={e => updateCustomField(idx, 'value', e.target.value)}
              placeholder="Waarde" className="flex-1 px-2 py-1 text-sm border border-stone-300 dark:border-stone-600 rounded bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100" />
            <button type="button" onClick={() => setForm(f => ({ ...f, customFields: f.customFields.filter((_, i) => i !== idx) }))}
              className="text-red-500 hover:text-red-700 px-2">✕</button>
          </div>
        ))}
      </div>

      {message && (
        <p className={`text-sm p-3 rounded ${message.startsWith('✅') ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
          {message}
        </p>
      )}

      <button type="submit" disabled={saving}
        className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
        {saving ? 'Opslaan...' : (isNew ? '➕ Persoon aanmaken' : '💾 Wijzigingen opslaan')}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required, disabled }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} disabled={disabled}
        className="w-full px-3 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 disabled:opacity-50 focus:ring-2 focus:ring-emerald-500 outline-none"
      />
    </div>
  );
}
