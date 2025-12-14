
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Exención de Responsabilidad Médica - FaltanMeds',
    description: 'Descargo de responsabilidad importante sobre la información médica.',
};

export default function DisclaimerPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 pb-4 border-b-2 border-slate-100">
                <AlertTriangle className="w-12 h-12 text-red-600 shrink-0" />
                <h1 className="text-4xl font-bold text-gray-900">Exención de Responsabilidad</h1>
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
                <div className="bg-red-50 p-8 rounded-xl border-l-8 border-red-500 mb-10 shadow-sm">
                    <p className="text-xl font-bold text-red-900 mb-3 mt-0">
                        IMPORTANTE: Este sitio web NO proporciona consejo médico.
                    </p>
                    <p className="text-red-800 m-0 leading-relaxed">
                        FaltanMeds es una herramienta informativa que automatiza la consulta de datos públicos. El contenido nunca debe sustituir el juicio clínico de un médico o farmacéutico profesional.
                    </p>
                </div>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Naturaleza de la Información</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        La información de desabastecimiento se obtiene de forma automatizada de la base de datos CIMA (AEMPS). Aunque nos esforzamos por mantener la inmediatez, pueden existir desfases técnicos.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        <strong>Sobre el Mapa Sanitario:</strong> La ubicación de hospitales y centros de salud proviene del "Catálogo Nacional de Hospitales 2025" y el SIAP. Esta es una base de datos estática y podría no reflejar cambios recientes de dirección o cierres temporales.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Uso Responsable</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Nunca ignore el consejo médico profesional ni demore en buscarlo debido a algo que haya leído en FaltanMeds. No tome decisiones sobre su medicación (interrupción, cambio de dosis) basándose únicamente en esta web.
                    </p>
                    <div className="bg-yellow-50 p-6 rounded-lg text-yellow-900 text-sm font-medium border border-yellow-200">
                        Ante la duda sobre un medicamento en desabastecimiento, contacte siempre con su farmacia de confianza o su médico de cabecera.
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Enlaces Externos</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Este sitio puede contener enlaces a sitios web de terceros. FaltanMeds no tiene control sobre el contenido, políticas de privacidad o prácticas de sitios web de terceros y no asume ninguna responsabilidad por ellos.
                    </p>
                </section>
            </div>
        </main>
    );
}
