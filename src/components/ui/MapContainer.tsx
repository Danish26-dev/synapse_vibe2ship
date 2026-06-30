import React, { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Globe } from "lucide-react";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}

interface MapContainerProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
}

export default function MapContainer({
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 12,
  markers = [],
  className = ""
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return;
    }

    try {
      setOptions({
        key: apiKey,
        v: "weekly",
        libraries: ["places"]
      });

      Promise.all([
        importLibrary("maps"),
        importLibrary("marker")
      ])
        .then(([mapsLib, markerLib]: [any, any]) => {
          setGoogleMapsLoaded(true);
          if (mapRef.current) {
            const { Map } = mapsLib;
            const { Marker } = markerLib;

            const map = new Map(mapRef.current, {
              center,
              zoom,
              mapId: "DEMO_MAP_ID",
              disableDefaultUI: true,
              zoomControl: true,
            });

            markers.forEach((markerInfo) => {
              new Marker({
                position: { lat: markerInfo.lat, lng: markerInfo.lng },
                map,
                title: markerInfo.title,
              });
            });
          }
        })
        .catch((e: any) => {
          console.error("⚠️ Failed to load Google Maps SDK:", e);
          setError("Map initialization failed. Falling back to mesh layout.");
        });
    } catch (err: any) {
      console.error("⚠️ Failed to setOptions for Google Maps loader:", err);
      setError("Map initialization options failed.");
    }
  }, [center, zoom, markers]);

  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey || error) {
    return (
      <div className={`relative rounded-2xl border border-[#DCE7EE] bg-[#F1F7FA] flex flex-col items-center justify-center overflow-hidden shadow-inner min-h-[350px] ${className}`}>
        {/* Soft layout grid */}
        <div className="absolute inset-0 opacity-[0.55] bg-[linear-gradient(to_right,rgba(16,42,67,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,42,67,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Glowing concentric circle grids */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[#DCE7EE]/40 animate-ping opacity-30" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#DCE7EE]/50" />
        <div className="absolute w-[150px] h-[150px] rounded-full border border-dashed border-[#22C97E]/30" />

        {/* Info panel */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
          <div className="p-3 bg-white rounded-full border border-[#DCE7EE] text-[#22C97E] mb-4 shadow-md animate-pulse">
            <Globe size={20} />
          </div>
          <p className="font-display font-bold text-sm text-[#102A43] tracking-tight uppercase">
            Civic Spatial Mesh
          </p>
          <p className="font-sans text-[11px] text-[#52667A] mt-1.5 leading-relaxed">
            Google Maps API Key unconfigured. Standard localized Geographic Coordinate and GPS Boundary Mesh mapping is active.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#DCE7EE] bg-white text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold shadow-xs">
            <MapPin size={10} className="text-[#22C97E]" />
            Lat: {center.lat.toFixed(4)} / Lng: {center.lng.toFixed(4)}
          </div>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={`rounded-2xl border border-[#DCE7EE] shadow-sm min-h-[350px] ${className}`} />;
}
