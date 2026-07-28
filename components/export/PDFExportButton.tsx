'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import jsPDF from 'jspdf';
import { Person } from '@/lib/types';
import { formatPartialDate } from '@/lib/date';

export function PDFExportButton({ person }: { person: Person }) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('export');

  const exportPDF = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const margin = 20;
      let y = margin;

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(`${person.firstName} ${person.lastName}`, margin, y);
      y += 10;

      // Ref
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150);
      doc.text(`Ref: ${person.ref}`, margin, y);
      y += 8;

      // Line
      doc.setDrawColor(200);
      doc.line(margin, y, 190, y);
      y += 8;

      // Birth/Death
      doc.setFontSize(11);
      doc.setTextColor(80);
      const birthStr = person.birth ? formatPartialDate(person.birth, 'nl') : 'Onbekend';
      const deathStr = person.death ? formatPartialDate(person.death, 'nl') : (person.isAlive ? '—' : 'Onbekend');
      doc.text(`★ Geboren: ${birthStr}`, margin, y);
      y += 7;
      doc.text(`✝ Overleden: ${deathStr}`, margin, y);
      y += 12;

      // Biography
      if (person.biography) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Biografie', margin, y);
        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(person.biography.replace(/\*\*/g, '').replace(/\*/g, ''), 170);
        for (const line of lines) {
          if (y > 270) { doc.addPage(); y = margin; }
          doc.text(line, margin, y);
          y += 5;
        }
        y += 8;
      }

      // Custom fields
      if (person.customFields.length > 0) {
        if (y > 250) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Aanvullende gegevens', margin, y);
        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        for (const field of person.customFields) {
          if (y > 270) { doc.addPage(); y = margin; }
          doc.text(`${field.key}: ${String(field.value)}`, margin, y);
          y += 5;
        }
      }

      // Footer
      doc.setFontSize(7);
      doc.setTextColor(180);
      doc.text('Gegenereerd door Familie Landveld Stamboom — 28 juli 2026', margin, 290);

      doc.save(`${person.ref}-${person.firstName}-${person.lastName}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={exportPDF}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-50 text-sm"
    >
      {loading ? t('generating') : t('pdf')}
    </button>
  );
}
