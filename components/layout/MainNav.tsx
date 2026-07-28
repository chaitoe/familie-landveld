'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { key: 'stamboom', href: '/stamboom' },
  { key: 'tijdlijn', href: '/tijdlijn' },
  { key: 'kaart', href: '/kaart' },
  { key: 'bronnen', href: '/bronnen' },
  { key: 'verhalen', href: '/verhalen' },
  { key: 'beheer', href: '/beheer' },
];

export function MainNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  return (
    <nav className="border-b border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-serif text-xl font-bold text-stone-800 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
          >
            <span className="text-2xl">🧬</span>
            <span className="hidden sm:inline">Familie Landveld</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher + Theme */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}

function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchTo = locale === 'nl' ? 'en' : 'nl';
  const newPath = pathname.replace(`/${locale}`, `/${switchTo}`);

  return (
    <Link
      href={newPath}
      className="px-2 py-1 text-xs font-medium rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
    >
      {switchTo === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}
    </Link>
  );
}
