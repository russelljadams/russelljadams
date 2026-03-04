"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Green marker icon matching cyberpunk theme
const greenIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="%2300ffaa"/><circle cx="12" cy="12" r="5" fill="%23080c14"/></svg>'
    ),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

interface DashboardMapProps {
  lat: number;
  lng: number;
  timestamp?: number;
}

export default function DashboardMap({
  lat,
  lng,
  timestamp,
}: DashboardMapProps) {
  const timeStr = timestamp
    ? new Date(timestamp).toLocaleString()
    : "Unknown";

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--color-border)]">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={greenIcon}>
          <Popup>
            <span style={{ fontFamily: "monospace", fontSize: "12px" }}>
              {lat.toFixed(6)}, {lng.toFixed(6)}
              <br />
              {timeStr}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
