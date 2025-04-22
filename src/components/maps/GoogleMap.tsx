import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  address: string;
  height?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function GoogleMap({ address, height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          if (mapRef.current) {
            const mapElement = mapRef.current as HTMLElement;
            const map = new window.google.maps.Map(mapElement, {
              zoom: 15,
              center: { lat: 5.2945, lng: 100.2593 }, // Default to Bayan Lepas area
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results: any, status: any) => {
              if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                map.setCenter(location);
                new window.google.maps.Marker({
                  map,
                  position: location,
                  title: "Danny's CKT",
                });
              }
            });
          }
        };
      }
    };

    loadGoogleMaps();
  }, [address]);

  return (
    <div 
      ref={mapRef}
      style={{ height, width: '100%' }}
      className="rounded-lg shadow-md"
    />
  );
} 