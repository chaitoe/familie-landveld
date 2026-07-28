'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllPlaces } from '@/lib/data/places';
import type { Place } from '@/lib/types';

// ── Type configuratie ──────────────────────────────────────
const typeConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  COUNTRY:    { color: '#b91c1c', bg: '#fecaca', icon: '🌍', label: 'Land' },
  CITY:       { color: '#1d4ed8', bg: '#dbeafe', icon: '🏙️', label: 'Stad' },
  PLANTATION: { color: '#92400e', bg: '#fde68a', icon: '🌾', label: 'Plantage' },
  VILLAGE:    { color: '#15803d', bg: '#dcfce7', icon: '🏘️', label: 'Dorp' },
  DISTRICT:   { color: '#7c3aed', bg: '#ede9fe', icon: '🏛️', label: 'District' },
  REGION:     { color: '#0891b2', bg: '#cffafe', icon: '🌿', label: 'Regio' },
};

function createColoredIcon(type: string): L.DivIcon {
  const cfg = typeConfig[type] ?? typeConfig.REGION;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background:${cfg.bg};
      border:2px solid ${cfg.color};
      border-radius:50%;
      width:32px;height:32px;
      display:flex;align-items:center;justify-content:center;
      font-size:16px;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
      cursor:pointer;
      transition:transform 0.15s;
    ">${cfg.icon}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

// ── Migratieroute: Ghana → Suriname → plantages ───────────
const migrationRoutes: { label: string; color: string; dash: string; path: [number, number][] }[] = [
  {
    label: 'Trans-Atlantische route (Goudkust → Suriname)',
    color: '#dc2626',
    dash: '12 6',
    path: [[7.9465, -1.0232], [3.9193, -56.0278]],
  },
  {
    label: 'Plantage Rorac → Kaaimangrasi (Brooskampers na 1863)',
    color: '#d97706',
    dash: '8 4',
    path: [[5.55, -55.05], [5.6, -54.9]],
  },
  {
    label: 'Kaaimangrasi → Surnaukreek',
    color: '#059669',
    dash: '4 4',
    path: [[5.6, -54.9], [5.5, -54.8]],
  },
  {
    label: 'Suriname-rivier verbinding (Paramaribo ↔ Rorac)',
    color: '#2563eb',
    dash: '6 4',
    path: [[5.8520, -55.2038], [5.55, -55.05]],
  },
];

function FitBounds() {
  const map = useMap();
  const places = getAllPlaces();
  useEffect(() => {
    const coords = places
      .filter(p => p.coordinates)
      .map(p => [p.coordinates!.lat, p.coordinates!.lng] as [number, number]);
    // Include Ghana for full route view
    coords.push([7.9465, -1.0232]);
    const bounds = L.latLngBounds(coords);
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, places]);
  return null;
}

function PlacePopup({ place }: { place: Place }) {
  const cfg = typeConfig[place.type] ?? typeConfig.REGION;
  return (
    <div className="text-sm min-w-[220px] max-w-[280px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{cfg.icon}</span>
        <h3 className="font-serif font-bold text-base text-stone-900">{place.name}</h3>
      </div>
      <span
        className="inline-block px-2 py-0.5 text-xs rounded-full font-medium"
        style={{ backgroundColor: cfg.bg, color: cfg.color }}
      >
        {cfg.label}
      </span>
      {place.period && (
        <span className="ml-2 text-xs text-stone-400">🕐 {place.period}</span>
      )}
      {place.historicalNames.length > 0 && (
        <p className="text-xs text-stone-500 mt-2">
          <strong>Ook bekend als:</strong> {place.historicalNames.join(', ')}
        </p>
      )}
      {place.description && (
        <p className="text-xs text-stone-600 mt-2 leading-relaxed border-t border-stone-100 pt-2 dark:border-stone-700 dark:text-stone-400">
          {place.description}
        </p>
      )}
      {place.significance && (
        <div className="mt-2 bg-amber-50 dark:bg-amber-900/30 rounded p-2 text-xs text-amber-900 dark:text-amber-200">
          <strong>👨‍👩‍👧‍👦 Familiebetekenis:</strong> {place.significance}
        </div>
      )}
    </div>
  );
}

// ── Layer toggle control component ─────────────────────────
function LayerToggle() {
  const map = useMap();
  const [layer, setLayer] = useState<'street' | 'satellite'>('street');

  useEffect(() => {
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community', maxZoom: 18 }
    );
    const streetLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
    );

    // Default: street
    streetLayer.addTo(map);

    const CustomControl = L.Control.extend({
      onAdd: function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.style.cssText = 'background:white;padding:4px;border-radius:6px;box-shadow:0 1px 5px rgba(0,0,0,0.3);cursor:pointer;font-size:18px;user-select:none;';
        div.innerHTML = '🛰️';
        div.title = 'Schakel naar satellietweergave';
        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.on(div, 'click', () => {
          if (map.hasLayer(streetLayer)) {
            map.removeLayer(streetLayer);
            satelliteLayer.addTo(map);
            div.innerHTML = '🗺️';
            div.title = 'Schakel naar stratenkaart';
          } else {
            map.removeLayer(satelliteLayer);
            streetLayer.addTo(map);
            div.innerHTML = '🛰️';
            div.title = 'Schakel naar satellietweergave';
          }
        });
        return div;
      },
    });

    const control = new CustomControl({ position: 'topright' });
    control.addTo(map);

    return () => {
      control.remove();
      map.removeLayer(streetLayer);
      map.removeLayer(satelliteLayer);
    };
  }, [map]);

  return null;
}

export function PlantationMap() {
  const places = getAllPlaces();

  return (
    <MapContainer
      center={[5.0, -55.0]}
      zoom={7}
      style={{ height: '520px', width: '100%' }}
      className="rounded-xl border border-stone-200 dark:border-stone-700 z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerToggle />
      <FitBounds />

      {/* ── Migratieroutes ──────────────────────────────── */}
      {migrationRoutes.map((route, i) => (
        <Polyline
          key={i}
          positions={route.path}
          pathOptions={{
            color: route.color,
            weight: 2.5,
            dashArray: route.dash,
            opacity: 0.7,
          }}
        >
          <Popup>
            <div className="text-xs font-medium">{route.label}</div>
          </Popup>
        </Polyline>
      ))}

      {/* ── Locatiemarkers ──────────────────────────────── */}
      {places.map((place) => {
        if (!place.coordinates) return null;
        return (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={createColoredIcon(place.type)}
          >
            <Popup>
              <PlacePopup place={place} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

