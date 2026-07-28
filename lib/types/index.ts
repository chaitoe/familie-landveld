// ============================================================
// Familie Landveld — Core Type Definitions
// Volledig uitbreidbaar datamodel voor genealogisch onderzoek
// ============================================================

// ── Datum (ondersteunt onvolledige/onzekere data) ──────────
export interface PartialDate {
  year: number;
  month?: number;       // 1-12, undefined = onbekend
  day?: number;          // 1-31, undefined = onbekend
  circa: boolean;        // "ca. 1840"
  before?: boolean;      // "vóór 1863"
  after?: boolean;       // "na 1830"
}

// ── Uitbreidbaar aangepast veld ────────────────────────────
export interface CustomField {
  key: string;
  value: string | number | boolean | string[];
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'STRING_ARRAY' | 'MARKDOWN';
  category?: string;
}

// Custom field definitie (configuratie)
export interface CustomFieldDef {
  key: string;
  label: Record<string, string>;  // { nl: "Sranan naam", en: "Sranan name" }
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN' | 'STRING_ARRAY' | 'MARKDOWN';
  category: string;
}

// ── Plaats ─────────────────────────────────────────────────
export interface Place {
  id: string;
  name: string;
  type: 'PLANTATION' | 'CITY' | 'VILLAGE' | 'DISTRICT' | 'COUNTRY' | 'REGION';
  coordinates?: { lat: number; lng: number };
  historicalNames: string[];
  country: string;
}

// ── Bronverwijzing ─────────────────────────────────────────
export interface SourceReference {
  sourceId: string;
  page?: string;
  url?: string;
  notes?: string;
}

// ── Bron ───────────────────────────────────────────────────
export interface Source {
  id: string;
  title: string;
  type: 'ARCHIVE' | 'NEWSPAPER' | 'BOOK' | 'INTERVIEW' | 'WEBSITE' | 'PHOTO' | 'DNA' | 'OTHER';
  url?: string;
  archiveRef?: string;
  notes: string;          // Markdown
  attachedMedia: MediaReference[];
}

// ── Media ──────────────────────────────────────────────────
export interface MediaReference {
  mediaId: string;
  caption?: string;
}

export interface Media {
  id: string;
  url: string;
  type: 'IMAGE' | 'DOCUMENT' | 'AUDIO' | 'VIDEO';
  title: string;
  description?: string;
  date?: PartialDate;
  tags: string[];
}

// ── Gebeurtenis type definitie (configuratie) ──────────────
export interface EventTypeDef {
  key: string;
  label: Record<string, string>;
  icon: string;
  color: string;
  category: 'LEVEN' | 'FAMILIE' | 'SLAVERNIJ' | 'EMANCIPATIE' | 'WERK' | 'OVERIG';
}

// ── Levensgebeurtenis (Event Sourcing model) ───────────────
export interface LifeEvent {
  id: string;
  personId: string;
  type: string;           // Key uit event-types.json
  date: PartialDate;
  placeId?: string;
  description: string;    // Markdown
  sources: SourceReference[];
  witnessIds?: string[];
  customFields: CustomField[];
}

// ── Persoon (kernentiteit) ─────────────────────────────────
export interface Person {
  id: string;
  ref: string;            // "LANDVELD-001"
  firstName: string;
  lastName: string;
  birthName?: string;
  gender: 'M' | 'F' | 'X';
  isAlive: boolean;
  birth?: PartialDate;
  death?: PartialDate;
  birthPlaceId?: string;
  deathPlaceId?: string;
  portraitMediaId?: string;
  portraitUrl?: string;
  biography: string;      // Markdown
  socialLinks?: SocialLink[];
  customFields: CustomField[];
}

// ── Social media link ───────────────────────────────────
export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'website' | 'wikipedia' | 'other';
  url: string;
  label?: string;
}

// ── Relatie ────────────────────────────────────────────────
export interface Relation {
  id: string;
  type: 'PARENT_CHILD' | 'SPOUSE' | 'SIBLING' | 'CUSTOM';
  person1Id: string;
  person2Id: string;
  since?: PartialDate;
  until?: PartialDate;
  label?: string;         // "Echtgenoot", "Stiefvader", etc.
  description?: string;
  sources: SourceReference[];
}

// ── Verhaal ────────────────────────────────────────────────
export interface Story {
  id: string;
  title: string;
  content: string;        // Markdown
  relatedPersonIds: string[];
  relatedEventIds: string[];
  relatedPlaceIds: string[];
  date?: PartialDate;
  sources: SourceReference[];
  tags: string[];
}

// ── Configuratie ───────────────────────────────────────────
export interface AppTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    card: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

// ── API Response types ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  meta?: { total: number };
}

export interface PersonWithRelations extends Person {
  parents: Person[];
  spouses: Person[];
  children: Person[];
  siblings: Person[];
  events: LifeEvent[];
}

// ── Navigation types ───────────────────────────────────────
export type Locale = 'nl' | 'en';
