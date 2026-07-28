import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { MainNav } from '@/components/layout/MainNav';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors">
        <MainNav />
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {children}
        </main>
        <footer className="border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 py-6 sm:py-8 mt-12 sm:mt-16 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs sm:text-sm">
            <p className="text-stone-600 dark:text-stone-300 font-serif">🧬 Familie Landveld — Stamboomonderzoek Suriname</p>
            <p className="text-stone-400 dark:text-stone-500 mt-1">Afstammelingen van de Brooskampers onder Kapitein Broos (1821–1880)</p>
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-700">
              <p className="text-stone-400 dark:text-stone-500">
                © {new Date().getFullYear()} — Designed by{' '}
                <a href="https://chai2.net" target="_blank" rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  Chai2Net
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
