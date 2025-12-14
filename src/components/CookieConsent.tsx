'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useConsent, ConsentState } from '@/context/ConsentContext';
import { Settings, X } from 'lucide-react';

export function CookieConsent() {
    const { consent, acceptAll, rejectNonEssential, setConsent } = useConsent();
    const [isVisible, setIsVisible] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

    // Internal state for the config modal
    const [configState, setConfigState] = useState<ConsentState>({
        necessary: true,
        analytics: false,
        marketing: false,
        undecided: false
    });

    useEffect(() => {
        if (consent.undecided) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [consent.undecided]);

    const handleSaveConfig = () => {
        setConsent({ ...configState, undecided: false });
        setShowConfig(false);
    };

    if (!isVisible && !showConfig) return null;

    if (showConfig) {
        return (
            <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-lg text-gray-800">Configuración de Cookies</h3>
                        <button onClick={() => setShowConfig(false)} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Necessary */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Esenciales</h4>
                                <p className="text-xs text-gray-500 mt-1">Necesarias para el funcionamiento básico del sitio.</p>
                            </div>
                            <input type="checkbox" checked={true} disabled className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 opacity-50 cursor-not-allowed" />
                        </div>

                        {/* Analytics */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Analíticas</h4>
                                <p className="text-xs text-gray-500 mt-1">Nos ayudan a entender cómo usas la web (Google Analytics).</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={configState.analytics}
                                onChange={(e) => setConfigState(prev => ({ ...prev, analytics: e.target.checked }))}
                                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                        </div>

                        {/* Marketing */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Marketing</h4>
                                <p className="text-xs text-gray-500 mt-1">Permiten mostrar publicidad relevante (Google AdSense).</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={configState.marketing}
                                onChange={(e) => setConfigState(prev => ({ ...prev, marketing: e.target.checked }))}
                                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button
                            onClick={handleSaveConfig}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition"
                        >
                            Guardar Preferencias
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 transition-transform duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-sm text-gray-600 flex-1">
                    <p className="mb-2 font-bold text-gray-900 text-lg">🍪 Configuración de Privacidad</p>
                    <p className="leading-relaxed">
                        Usamos cookies para mejorar tu experiencia. Puedes aceptarlas todas, rechazar las no esenciales o configurarlas a tu gusto.
                        Consulta nuestra <Link href="/legal/politica-cookies" className="text-blue-600 hover:underline">Política de Cookies</Link>.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-end shrink-0 w-full lg:w-auto">
                    <button
                        onClick={() => setShowConfig(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" /> Configurar
                    </button>
                    <button
                        onClick={rejectNonEssential}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Rechazar No Esenciales
                    </button>
                    <button
                        onClick={acceptAll}
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm transition-colors"
                    >
                        Aceptar Todas
                    </button>
                </div>
            </div>
        </div>
    );
}
