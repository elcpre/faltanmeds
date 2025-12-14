'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (consent === null) {
            // Slight delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 transition-transform duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 text-center md:text-left">
                    <p className="mb-1 font-bold text-gray-900">🍪 Valoramos tu privacidad</p>
                    <p>
                        Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico.
                        Puedes aceptar todas las cookies o rechazarlas. Para más información, consulta nuestra{' '}
                        <Link href="/legal/politica-cookies" className="text-green-600 hover:underline">
                            Política de Cookies
                        </Link>.
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm transition-colors"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}
