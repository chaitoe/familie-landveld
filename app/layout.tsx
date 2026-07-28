import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Familie Landveld — Stamboom Suriname',
  description:
    'Genealogisch onderzoek naar de familie Landveld uit Suriname, afstammelingen van de Brooskampers onder Kapitein Broos (1821–1880).',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
