'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Search, Filter } from 'lucide-react';
import { useMap } from 'react-leaflet';

// Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Icons fix (move inside component or keep global if working, keeping inside to be safe with rebuilds)
const fixLeafletIcons = () => {
    if (typeof window !== 'undefined') {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }
};

interface HealthCenter {
    name: string;
    type: 'HOSPITAL' | 'PRIMARY_CARE';
    lat: number;
    lng: number;
    city: string;
    address: string;
}

// Controller to handle FlyTo animations
function MapController({ center }: { center: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            // Safety check: Ensure map is still mounted and valid
            try {
                if (map && map.getContainer()) {
                    map.flyTo(center, 13, { duration: 1.5 });
                }
            } catch (error) {
                console.warn("Map animation interrupted:", error);
            }
        }
    }, [center, map]);
    return null;
}

export function HealthMap() {
    const [centers, setCenters] = useState<HealthCenter[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Filters & Search State
    const [showHospitals, setShowHospitals] = useState(true);
    const [showPrimary, setShowPrimary] = useState(false); // Default: Hidden to save performance
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCityCenter, setFilteredCityCenter] = useState<[number, number] | null>(null);
    const [suggestions, setSuggestions] = useState<{ city: string, lat: number, lng: number }[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [mapId, setMapId] = useState<string>("init-map");

    useEffect(() => {
        setIsMounted(true);
        setMapId(`map-${Math.random().toString(36).substr(2, 9)}`); // Generate random ID on client mount
        fixLeafletIcons();

        Promise.all([
            fetch('/data/health-centers.json').then(res => res.ok ? res.json() : []),
            fetch('/data/health-centers-primary.json').then(res => res.ok ? res.json() : [])
        ])
            .then(([hospitals, primary]) => {
                console.log(`Loaded ${hospitals.length} hospitals and ${primary.length} health centers.`);
                setCenters([...hospitals, ...primary]);
            })
            .catch(err => console.error("Failed to load centers", err));
    }, []);

    // Filter Logic: "Smart Visibility"
    const visibleCenters = useMemo(() => {
        return centers.filter(c => {
            // 1. Check Toggles
            if (c.type === 'HOSPITAL' && !showHospitals) return false;
            if (c.type === 'PRIMARY_CARE' && !showPrimary) return false;

            // 2. Search Filter (Only applies if a city is actively selected)
            // If NO city is selected, we show EVERYTHING that is toggled on.
            if (selectedCity && c.city !== selectedCity) return false;

            return true;
        });
    }, [centers, showHospitals, showPrimary, selectedCity]);

    // Autocomplete Logic
    useEffect(() => {
        if (searchQuery.length > 2) {
            const matches = new Map();
            // Normalize helper: "València" -> "valencia"
            const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const queryNorm = normalize(searchQuery);

            centers.forEach(c => {
                if (c.city && normalize(c.city).includes(queryNorm)) {
                    if (!matches.has(c.city)) {
                        matches.set(c.city, { city: c.city, lat: c.lat, lng: c.lng });
                    }
                }
            });
            setSuggestions(Array.from(matches.values()).slice(0, 5));
            setIsSearching(true);
        } else {
            setSuggestions([]);
            setIsSearching(false);
        }
    }, [searchQuery, centers]);

    const handleSelectCity = (cityData: { city: string, lat: number, lng: number }) => {
        setSearchQuery(cityData.city);
        setSelectedCity(cityData.city); // Active Filter
        setFilteredCityCenter([cityData.lat, cityData.lng]);
        setIsSearching(false);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setSelectedCity(null);
        setFilteredCityCenter([40.4168, -3.7038]); // Reset to Madrid
    };

    if (!isMounted) return <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />;

    return (
        <div className="bg-white p-6 rounded-sm shadow-md mt-6 border-t-2 border-green-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="text-green-600" />
                        Mapa Sanitario
                    </h3>
                    <p className="text-xs text-gray-500">Encuentra hospitales y centros de salud.</p>
                </div>

                {/* Controls Container */}
                <div className="flex flex-col gap-2 w-full md:w-auto">

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar ciudad..."
                                className="bg-transparent text-sm outline-none w-full md:w-48"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    if (e.target.value === "") {
                                        setSelectedCity(null); // Clear filter if cleared manually
                                    }
                                }}
                                onFocus={() => searchQuery.length > 2 && setIsSearching(true)}
                            />
                            {searchQuery && (
                                <button onClick={handleClearSearch} className="ml-1 text-gray-400 hover:text-gray-600">
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Autocomplete Dropdown */}
                        {isSearching && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-md mt-1 z-50">
                                {suggestions.map((s) => (
                                    <button
                                        key={s.city}
                                        onClick={() => handleSelectCity(s)}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b last:border-0 border-gray-100"
                                    >
                                        {s.city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 text-xs">
                        <label className="flex items-center gap-1 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={showHospitals}
                                onChange={(e) => setShowHospitals(e.target.checked)}
                                className="rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">Hospitales</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={showPrimary}
                                onChange={(e) => setShowPrimary(e.target.checked)}
                                className="rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">C. Salud</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200 z-0 relative">
                <MapContainer
                    key={mapId}
                    center={[40.4168, -3.7038]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <MapController center={filteredCityCenter} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {visibleCenters.map((center, idx) => (
                        <Marker key={idx} position={[center.lat, center.lng]}>
                            <Popup>
                                <div className="p-1">
                                    <h4 className="font-bold text-sm">{center.name}</h4>
                                    <p className="text-xs text-gray-600 mb-1">{center.address}</p>
                                    <span className={`text-[10px] font-bold px-1 py-0.5 rounded ${center.type === 'HOSPITAL' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {center.type === 'HOSPITAL' ? 'HOSPITAL' : 'CENTRO SALUD'}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
                Datos del Catálogo Nacional de Hospitales 2025 y SIAP
            </p>
        </div>
    );
}
