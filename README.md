# 🧬 Familie Landveld — Stamboom Suriname

> Een interactieve genealogische webapplicatie voor de familie Landveld, afstammelingen van de **Brooskampers** onder leiding van Kapitein Broos (1821–1880).

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Features

| Feature | Beschrijving |
|---|---|
| 🌳 **Interactieve Stamboom** | React Flow visualisatie met zoom/pan, custom nodes, mini-map |
| 📊 **Historische Tijdlijn** | 17 gebeurtenissen van 1650 tot 2025, filterbaar per categorie |
| 🗺️ **Kaartweergave** | Leaflet kaart met gekleurde markers, migratieroutes, satelliet-toggle, rijke popups |
| 📍 **Locatiekaartjes** | 7 plaatsen met historische beschrijving, periode en familiebetekenis |
| 📚 **Bronnenbeheer** | 11 gedocumenteerde bronnen (boeken, kranten, archieven, interviews) |
| 📖 **Familieverhalen** | Verhalen over de Brooskampers, Plantage Rorac, Ma Amba |
| 🎭 **3 Thema's** | Light / Dark / Sepia met localStorage persistentie |
| 🌐 **i18n** | Nederlands & Engels, ~90 vertaalsleutels |
| 📱 **Mobile Responsive** | Hamburger menu, adaptieve layouts voor alle schermformaten |
| 🔐 **Admin Panel** | Beveiligde login, CRUD voor personen met image upload & social links |
| 📄 **PDF Export** | Persoonsbladen exporteren als PDF |
| 📸 **Portretfoto's** | Kapitein Broos (ca. 1870), Raymond Landveld, plus avatar-placeholders |
| 🏠 **Uitgebreide Homepage** | Welkomsttekst, boekaanbeveling, uitgelichte personen, statistieken |

---

## 🚀 Quick Start

```bash
# 1. Clone de repository
git clone https://github.com/chaitoe/familie-landveld.git
cd familie-landveld-app

# 2. Installeer dependencies
npm install

# 3. Maak .env.local aan (kopieer van .env.example)
cp .env.example .env.local
# Bewerk .env.local met eigen admin credentials

# 4. Start de dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## 🔐 Admin Login

Ga naar `/nl/beheer` → klik **Inloggen**.

| Veld | Default (.env.example) |
|---|---|
| Gebruikersnaam | `admin` |
| Wachtwoord | `changeme` |

> ⚠️ **Wijzig deze voor productie!** Zie `.env.local`.

---

## 📂 Projectstructuur

```
familie-landveld-app/
├── app/
│   ├── [locale]/               # i18n routing (nl/en)
│   │   ├── page.tsx             # Homepage met hero
│   │   ├── stamboom/            # 🌳 Interactieve stamboom
│   │   ├── tijdlijn/            # 📊 Historische tijdlijn
│   │   ├── kaart/               # 🗺️ Kaart (Leaflet: markers, routes, satelliet)
│   │   ├── bronnen/             # 📚 Bronnenoverzicht
│   │   ├── verhalen/            # 📖 Familieverhalen
│   │   └── beheer/              # 🔐 Admin (login + CRUD)
│   └── api/                     # REST API (auth, persons, sources, places)
├── components/                  # React componenten
│   ├── tree/                    # React Flow stamboom
│   ├── person/                  # PersonCard, PersonDetail
│   ├── timeline/                # Tijdlijn component
│   ├── map/                     # Leaflet kaart
│   ├── admin/                   # PersonEditor, LogoutButton
│   └── layout/                  # MainNav, ThemeToggle
├── lib/                         # Data layer, types, tree algoritme
├── data/                        # JSON databestanden
│   ├── persons/                 # 14 personen (één per JSON)
│   ├── relations.json           # 15 familierelaties
│   ├── sources.json             # 11 bronnen
│   ├── places.json              # 7 plaatsen
│   └── config/                  # Uitbreidbare configuratie
├── messages/                    # i18n vertalingen (nl.json, en.json)
└── public/media/                # Afbeeldingen
```

---

## 🛠️ Tech Stack

| Laag | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Taal | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Stamboom | React Flow (@xyflow/react) |
| Kaart | Leaflet + React-Leaflet |
| PDF | jsPDF |
| i18n | next-intl |
| State | Zustand |
| Auth | Cookie-based sessie |

---

## 📖 Historische Context

De familie **Landveld** stamt af van de **Brooskampers** (Bakabusi Sama), een Marron-gemeenschap die onder leiding van **Kapitein Broos** (1821–1880) in vrijheid leefde in het ontoegankelijke moerasgebied Kaaimangrasi in Suriname.

Na de afschaffing van de slavernij op **1 juli 1863** vestigden de Brooskampers zich op **Plantage Rorac** aan de Surinamerivier. De grootste families namen de achternamen **Babel** en **Landveld** aan.

> 📖 **Aanbevolen literatuur**: Wim Hoogbergen, *Het kamp van Broos en Kaliko* (1996, heruitgave VACO).

---

## 📄 Licentie

MIT — © 2026 [Chai2Net](https://chai2.net)
