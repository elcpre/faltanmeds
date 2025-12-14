
'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ cn: string; nombre: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Debounce Logic could be added here, simplified for now
    const handleSearch = async (val: string) => {
        setQuery(val);
        if (val.length > 2) {
            // We need to call the server-side search function. 
            // Since this is a client component, we should ideally use a Server Action or API route.
            // For simplicity/speed in this Next.js App Router setup, let's assuming we can't import the lib direct in client without issues if it uses 'fs' (it uses fetch so it's fine usually, but 'searchDrugs' is async).
            // However, to be safe and clean, let's fetch from a quick internal API route or just fetch client-side if CORS allows.
            // CORS usually blocks CIMA from client. We need a proxy.
            // Let's use a Server Action if possible, OR create a proxy route.
            // Plan B: Create a simple API route /api/search?q=... in next step. For now, let's Assume /api/search exists.

            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data);
                    setIsOpen(true);
                }
            } catch (e) { console.error(e); }
        } else {
            setResults([]);
            setIsOpen(false);
        }
    };

    const handleSelect = (cn: string) => {
        router.push(`/medicamento/${cn}`);
        setIsOpen(false);
    };

    // Fallback for enter key
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // If results exist, pick first
        if (results.length > 0) {
            handleSelect(results[0].cn);
        }
    };

    return (
        <div className="w-full max-w-2xl relative">
            <form onSubmit={onSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Busca tu medicamento (ej. Ozempic, Concerta...)"
                    className="w-full p-4 pl-12 rounded-full bg-white border-2 border-transparent focus:border-blue-300 shadow-xl text-lg outline-none transition-all placeholder-gray-400 text-gray-900"
                    style={{ color: '#111827' }} // Force Dark Text
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-6 h-6" />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                    Buscar
                </button>
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left">
                    {results.map((item) => (
                        <div
                            key={item.cn}
                            onClick={() => handleSelect(item.cn)}
                            className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 text-gray-800 transition-colors"
                        >
                            <p className="font-semibold text-sm">{item.nombre}</p>
                            <p className="text-xs text-gray-400 font-mono">CN: {item.cn}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
