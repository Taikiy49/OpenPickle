// src/features/courts/CourtMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../../styles/features.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function CourtMap({
  courts,
  computedById,
  selectedId,
  onSelect,
}) {
  return (
    <MapContainer
      center={[21.3069, -157.8583]} // Honolulu default
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "420px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {courts.map((court) => (
        <Marker
          key={court.id}
          position={[court.lat, court.lng]}
          eventHandlers={{
            click: () => onSelect(court.id),
          }}
        >
          <Popup>
            <div style={{ fontWeight: 700 }}>
              {court.name}
            </div>
            <div style={{ fontSize: 13 }}>
              {court.address}
            </div>
            <div style={{ marginTop: 6 }}>
              {computedById[court.id]?.isOpenNow
                ? "🟢 Open Now"
                : computedById[court.id]?.nextStartLabel
                ? `⏰ Next: ${computedById[court.id].nextStartLabel}`
                : "Schedule varies"}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
