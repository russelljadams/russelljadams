"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Rose pink heart marker for Amanda's theme
const heartIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.3 21.7 0 14 0z" fill="%23E8788A"/><path d="M14 19.5l-1.2-1.1C9.5 15.6 7.5 13.7 7.5 11.5c0-1.7 1.3-3 3-3 1 0 2 .5 2.5 1.2L14 10.5l1-0.8c.5-.7 1.5-1.2 2.5-1.2 1.7 0 3 1.3 3 3 0 2.2-2 4.1-5.3 6.9L14 19.5z" fill="white"/></svg>'
    ),
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

interface RussellMapProps {
  lat: number;
  lng: number;
}

export default function RussellMap({ lat, lng }: RussellMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={heartIcon}>
        <Popup>
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: "13px", color: "#4A3728" }}>
            Russell is here
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
