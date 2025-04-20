
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  trackingMode?: boolean;
  initialPosition?: { lat: number; lng: number };
  destinationPosition?: { lat: number; lng: number };
  estimatedTime?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  onLocationSelect, 
  trackingMode = false,
  initialPosition,
  destinationPosition,
  estimatedTime
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const destinationMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Default view is India if no initial position
      const defaultPosition: [number, number] = initialPosition 
        ? [initialPosition.lat, initialPosition.lng] 
        : [20.5937, 78.9629];
      
      const zoomLevel = initialPosition ? 15 : 5;
      
      const map = L.map('map').setView(defaultPosition, zoomLevel);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // If not in tracking mode, setup click handler
      if (!trackingMode) {
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
            
            if (onLocationSelect) {
              onLocationSelect({
                lat,
                lng,
                address: data.display_name || `${lat}, ${lng}`
              });
            }
          } catch (error) {
            console.error('Error getting address:', error);
            if (onLocationSelect) {
              onLocationSelect({
                lat,
                lng,
                address: `${lat}, ${lng}`
              });
            }
          }
        });
      } 
      // If in tracking mode, setup the tracking view
      else {
        if (initialPosition) {
          // Create ambulance icon
          const ambulanceIcon = L.divIcon({
            html: `<div class="flex items-center justify-center bg-primary text-white rounded-full p-1 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <path d="M8 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
                      <path d="M10.5 17h6.5a2 2 0 0 0 2-2v-2.5"></path>
                      <path d="M17 8h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1.5"></path>
                      <path d="M5 17h3"></path>
                      <path d="M5 8h11"></path>
                      <path d="M5 11v3a2 2 0 0 0 2 2h1"></path>
                      <path d="M5 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"></path>
                    </svg>
                   </div>`,
            className: '',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          
          markerRef.current = L.marker(
            [initialPosition.lat, initialPosition.lng],
            { icon: ambulanceIcon }
          ).addTo(map);
          
          // If we have a destination, add that marker too
          if (destinationPosition) {
            const hospitalIcon = L.divIcon({
              html: `<div class="flex items-center justify-center bg-blue-600 text-white rounded-full p-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                        <path d="M8 9h8"></path>
                        <path d="M8 15h6"></path>
                        <path d="M9 18h4"></path>
                        <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                        <path d="M12 6v2"></path>
                        <path d="M12 12v2"></path>
                      </svg>
                     </div>`,
              className: '',
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            });
            
            destinationMarkerRef.current = L.marker(
              [destinationPosition.lat, destinationPosition.lng],
              { icon: hospitalIcon }
            ).addTo(map);
            
            // Draw route between current position and destination
            const points = [
              [initialPosition.lat, initialPosition.lng],
              [destinationPosition.lat, destinationPosition.lng]
            ];
            
            routeLayerRef.current = L.polyline(points as L.LatLngExpression[], {
              color: 'blue',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 10',
              lineJoin: 'round'
            }).addTo(map);
            
            // Make sure both markers are visible
            map.fitBounds(L.latLngBounds(points as L.LatLngExpression[]));
            
            // Add ETA info as a custom control
            if (estimatedTime) {
              const etaControl = L.control({ position: 'bottomleft' });
              etaControl.onAdd = () => {
                const div = L.DomUtil.create('div', 'bg-white px-3 py-2 rounded-md shadow-md');
                div.innerHTML = `<div class="flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  <span class="font-medium">ETA: ${estimatedTime}</span>
                                </div>`;
                return div;
              };
              etaControl.addTo(map);
            }
          }
          
          // Simulate ambulance movement
          if (trackingMode) {
            let currentLat = initialPosition.lat;
            let currentLng = initialPosition.lng;
            
            if (destinationPosition) {
              // Simulate movement every 2 seconds
              const interval = setInterval(() => {
                // Move slightly towards destination
                const latDiff = destinationPosition.lat - currentLat;
                const lngDiff = destinationPosition.lng - currentLng;
                
                // Small step toward destination (about 1/50 of the way)
                const stepFactor = 0.02;
                currentLat += latDiff * stepFactor;
                currentLng += lngDiff * stepFactor;
                
                // Update marker position
                if (markerRef.current) {
                  markerRef.current.setLatLng([currentLat, currentLng]);
                }
                
                // Update the route
                if (routeLayerRef.current) {
                  map.removeLayer(routeLayerRef.current);
                  routeLayerRef.current = L.polyline([
                    [currentLat, currentLng],
                    [destinationPosition.lat, destinationPosition.lng]
                  ] as L.LatLngExpression[], {
                    color: 'blue',
                    weight: 4,
                    opacity: 0.7,
                    dashArray: '10, 10',
                    lineJoin: 'round'
                  }).addTo(map);
                }
                
                setCurrentPosition([currentLat, currentLng]);
                
                // If we've reached very close to the destination, stop the interval
                const distance = Math.sqrt(
                  Math.pow(currentLat - destinationPosition.lat, 2) + 
                  Math.pow(currentLng - destinationPosition.lng, 2)
                );
                
                if (distance < 0.0001) {
                  clearInterval(interval);
                }
              }, 2000);
              
              // Cleanup interval on component unmount
              return () => clearInterval(interval);
            }
          }
        }
      }

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect, trackingMode, initialPosition, destinationPosition, estimatedTime]);

  return <div id="map" className="h-[400px] w-full rounded-lg border" />;
};

export default LocationMap;

