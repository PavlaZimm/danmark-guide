import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface MapMarker {
  lat: number;
  lng: number;
  title?: string;
  description?: string;
}

export interface ArticleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  caption?: string;
}

// Component to fit bounds when markers change
function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
}

const ArticleMap = ({
  lat,
  lng,
  zoom = 13,
  markers = [],
  height = '400px',
  caption
}: ArticleMapProps) => {
  // If no markers provided, add one at the center
  const mapMarkers = markers.length > 0 ? markers : [{ lat, lng }];

  return (
    <figure style={{ margin: '30px 0' }}>
      <div
        style={{
          height,
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              {(marker.title || marker.description) && (
                <Popup>
                  {marker.title && <strong>{marker.title}</strong>}
                  {marker.description && <p style={{ margin: '4px 0 0 0' }}>{marker.description}</p>}
                </Popup>
              )}
            </Marker>
          ))}
          {mapMarkers.length > 1 && <FitBounds markers={mapMarkers} />}
        </MapContainer>
      </div>
      {caption && (
        <figcaption style={{
          color: '#666',
          fontSize: '14px',
          marginTop: '12px',
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ArticleMap;
