
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Cookies - FaltanMeds',
    description: 'Información sobre el uso de cookies y tecnologías de seguimiento.',
};

export default function CookiesPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 pb-4 border-b-2 border-gray-100">Política de Cookies</h1>

            <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar sus preferencias y mejorar su experiencia de navegación.
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Qué cookies utilizamos?</h2>
                    <p className="text-gray-600 mb-4">
                        En FaltanMeds priorizamos la privacidad. Por defecto, solo cargamos la configuración esencial. Usted tiene control total para habilitar o bloquear el resto.
                    </p>

                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 mt-0 flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span> Necesarias (Técnicas)
                            </h3>
                            <p className="text-gray-600 text-sm mb-0 mt-2">
                                Son imprescindibles para que la web funcione (ej. recordar si aceptó o no las cookies). No se pueden desactivar y no recopilan datos personales de navegación.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mt-0 flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Analíticas (Opcionales)
                            </h3>
                            <p className="text-gray-600 text-sm mb-0 mt-2">
                                <strong>Proveedor: Google Analytics.</strong> Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico. Ayudan a saber qué páginas son las más útiles.
                            </p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mt-0 flex items-center gap-2">
                                <span className="w-3 h-3 bg-purple-500 rounded-full"></span> Publicitarias (Opcionales)
                            </h3>
                            <p className="text-gray-600 text-sm mb-0 mt-2">
                                <strong>Proveedor: Google AdSense.</strong> Analizan sus hábitos de navegación para mostrarle publicidad relacionada con su perfil de navegación.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Control de sus Cookies</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Puede cambiar su elección en cualquier momento desde nuestro banner de configuración. Además, puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de su navegador:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="nofollow" className="text-blue-600 hover:underline">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="nofollow" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="nofollow" className="text-blue-600 hover:underline">Safari</a></li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
