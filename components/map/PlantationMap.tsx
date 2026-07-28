'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllPlaces } from '@/lib/data/places';

// Fix Leaflet default icon issue in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitBounds() {
  const map = useMap();
  const places = getAllPlaces();
  const bounds = L.latLngBounds(
    places
      .filter(p => p.coordinates)
      .map(p => [p.coordinates!.lat, p.coordinates!.lng])
  );
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
}

export function PlantationMap() {
  const places = getAllPlaces();

  return (
    <MapContainer
      center={[5.0, -55.0]}
      zoom={7}
      style={{ height: '500px', width: '100%' }}
      className="rounded-xl border border-stone-200 z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds />
      {places.map((place) => {
        if (!place.coordinates) return null;
        const typeColors: Record<string, string> = {
          PLANTATION: '#b45309',
          CITY: '#1d4ed8',
          VILLAGE: '#15803d',
          DISTRICT: '#7c3aed',
          COUNTRY: '#be123c',
          REGION: '#0891b2',
        };
        return (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm min-w-[180px]">
                <h3 className="font-serif font-bold text-base">{place.name}</h3>
                <span
                  className="inline-block px-2 py-0.5 text-xs rounded mt-1"
                  style={{
                    backgroundColor: typeColors[place.type] + '20',
                    color: typeColors[place.type],
                  }}
                >
                  {place.type === 'PLANTATION' ? '🏭 Plantage' :
                   place.type === 'CITY' ? '🏙️ Stad' :
                   place.type === 'VILLAGE' ? '🏘️ Dorp' :
                   place.type === 'REGION' ? '🌿 Regio' :
                   place.type === 'COUNTRY' ? '🌍 Land' : place.type}
                </span>
                {place.historicalNames.length > 0 && (
                  <p className="text-xs text-stone-500 mt-2">
                    <strong>Ook bekend als:</strong> {place.historicalNames.join(', ')}
                  </p>
                )}
                <p className="text-xs text-stone-500 mt-1">{place.country}</p>
                {place.coordinates && (
                  <p className="text-[10px] text-stone-400 mt-1 font-mono">
                    {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
