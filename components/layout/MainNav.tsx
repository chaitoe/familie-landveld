'use client';

import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 sm:gap-2 font-serif text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
          >
            <span className="text-xl sm:text-2xl">🧬</span>
            <span className="hidden sm:inline">Familie Landveld</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
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

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <LanguageSwitch />
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-md text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-700 py-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
        )}
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
      className="px-1.5 sm:px-2 py-1 text-xs font-medium rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
    >
      {switchTo === 'nl' ? '🇳🇱' : '🇬🇧'}
    </Link>
  );
}
