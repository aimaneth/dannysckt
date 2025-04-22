'use client';

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

// Danny's CKT location (example coordinates - please replace with actual coordinates)
const center = {
  lat: 3.1390,  // Replace with actual latitude
  lng: 101.6869 // Replace with actual longitude
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function LocationMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const renderMap = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        <MarkerF
          position={center}
          title="Danny's CKT"
        />
      </GoogleMap>
    ),
    []
  );

  if (loadError) {
    return <div className="text-center p-4">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="text-center p-4">Loading maps...</div>;
  }

  return renderMap;
} 