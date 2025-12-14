
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad - FaltanMeds',
    description: 'Cómo tratamos sus datos personales en FaltanMeds de acuerdo al RGPD.',
};

export default function PrivacidadPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 pb-4 border-b-2 border-gray-100">Política de Privacidad</h1>

            <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-gray-600 mb-8 leading-relaxed text-xl font-light">
                    En FaltanMeds nos tomamos muy en serio su privacidad. Esta política describe con transparencia cómo tratamos los datos personales, garantizando el cumplimiento del RGPD y la LOPDGDD.
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Recopilación de Datos</h2>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-100 mb-4">
                        <p className="text-green-900 font-medium m-0">
                            <strong>Resumen Rápido:</strong> Este sitio web NO requiere registro de usuarios. No recopilamos nombres, correos electrónicos ni teléfonos de forma directa.
                        </p>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Únicamente se recopilan datos técnicos de forma automática para el correcto funcionamiento del servicio y la analítica web:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Dirección IP (anonimizada).</li>
                        <li>Datos de navegación (páginas visitadas, tiempo de sesión).</li>
                        <li>Preferencias de consentimiento de cookies.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Finalidad y Servicios de Terceros</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Utilizamos servicios de proveedores externos para mantener el sitio gratuito y funcional. Estos servicios <strong>solo se activan si usted otorga su consentimiento expreso</strong>:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-2">Google Analytics 4</h3>
                            <p className="text-gray-500 text-sm mb-0">
                                Nos ayuda a entender qué medicamentos son los más buscados y si la web funciona correctamente. Los datos son estidísticos y agregados.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mt-0 mb-2">Google AdSense</h3>
                            <p className="text-gray-500 text-sm mb-0">
                                Muestra publicidad para financiar el proyecto. Si acepta las cookies de marketing, los anuncios pueden ser personalizados según su navegación previa.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Base Jurídica</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        El tratamiento de sus datos de navegación se basa exclusivamente en su <strong>Consentimiento (Art. 6.1.a RGPD)</strong>, el cual puede retirar o modificar en cualquier momento mediante el botón de "Configuración de Cookies" situado en el pie de página.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Sus Derechos</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Como usuario, tiene derecho a solicitar el acceso, rectificación o supresión de sus datos. Dado que no almacenamos datos identificativos, la gestión de la privacidad se realiza principalmente a través de la gestión de cookies en su propio navegador.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Para cualquier duda específica, puede contactarnos en <a href="mailto:info@faltanmeds.com" className="text-blue-600 hover:underline">info@faltanmeds.com</a>.
                    </p>
                </section>
            </div>
        </main>
    );
}
