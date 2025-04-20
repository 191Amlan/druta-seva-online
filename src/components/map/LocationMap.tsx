
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([20.5937, 78.9629], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng]).addTo(map);

        // Reverse geocoding using Nominatim
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          
          onLocationSelect({
            lat,
            lng,
            address: data.display_name || `${lat}, ${lng}`
          });
        } catch (error) {
          console.error('Error getting address:', error);
          onLocationSelect({
            lat,
            lng,
            address: `${lat}, ${lng}`
          });
        }
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return <div id="map" className="h-[400px] w-full rounded-lg border" />;
};

export default LocationMap;
