
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aviso Legal - FaltanMeds',
    description: 'Información legal y titularidad del sitio web FaltanMeds.',
};

export default function AvisoLegalPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 pb-4 border-b-2 border-gray-100">Aviso Legal</h1>

            <div className="prose prose-lg prose-slate max-w-none">
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Datos Identificativos</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se exponen los siguientes datos identificativos del titular del sitio web:
                    </p>
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <ul className="list-none space-y-2 m-0 p-0">
                            <li><span className="font-semibold text-slate-900">Denominación del sitio:</span> FaltanMeds</li>
                            <li><span className="font-semibold text-slate-900">Dirección:</span> Camino de las Viñas s/n, 18120, Alhama de Granada, España</li>
                            <li><span className="font-semibold text-slate-900">Correo electrónico:</span> <a href="mailto:info@faltanmeds.com" className="text-blue-600 hover:underline">info@faltanmeds.com</a></li>
                        </ul>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Propiedad Intelectual y Fuentes de Datos</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        El diseño, logotipos y código fuente de este sitio web son propiedad del titular.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 className="text-lg font-bold text-blue-900 mt-0 mb-3">Fuentes de Información Oficial</h3>
                        <p className="text-blue-800 mb-2 text-sm leading-relaxed">
                            Este sitio web agrega y visualiza datos públicos procedentes de fuentes gubernamentales oficiales para facilitar su acceso al ciudadano:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-blue-900 text-sm">
                            <li><strong>Medicamentos:</strong> Datos en tiempo real de la <a href="https://cima.aemps.es/" target="_blank" rel="nofollow noopener" className="underline hover:text-blue-600">Agencia Española de Medicamentos y Productos Sanitarios (AEMPS)</a>.</li>
                            <li><strong>Centros Sanitarios:</strong> Datos geolocalizados del Catálogo Nacional de Hospitales 2025 y el Sistema de Información de Atención Primaria (SIAP) del Ministerio de Sanidad.</li>
                        </ul>
                        <p className="text-blue-800 mt-3 text-xs">
                            FaltanMeds no es propietario de dichos datos y su reutilización se realiza conforme a las políticas de datos abiertos de la administración pública española.
                        </p>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Condiciones de Uso</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        El acceso a este sitio web es libre y gratuito. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios, y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al orden público.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Exclusión de Responsabilidad</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        FaltanMeds ofrece esta información como un servicio de utilidad pública, pero <strong>no garantiza la infalibilidad de los datos</strong> debido a posibles errores técnicos de sincronización con las fuentes oficiales.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        La información médica mostrada es meramente orientativa. <strong>Nunca debe utilizarse para autodiagnóstico o autotratamiento.</strong> Consulte siempre a un profesional sanitario.
                    </p>
                </section>
            </div>
        </main>
    );
}
