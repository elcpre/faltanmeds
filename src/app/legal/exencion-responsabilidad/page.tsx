
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Exención de Responsabilidad Médica - FaltanMeds',
    description: 'Descargo de responsabilidad importante sobre la información médica.',
};

export default function DisclaimerPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-200">
                <AlertTriangle className="w-10 h-10 text-red-600" />
                <h1 className="text-3xl font-bold text-gray-900">Exención de Responsabilidad</h1>
            </div>

            <div className="prose prose-blue max-w-none text-gray-700">
                <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500 mb-8">
                    <p className="text-lg font-bold text-red-800 mb-2">IMPORTANTE: Este sitio web NO proporciona consejo médico.</p>
                    <p className="text-red-700 m-0">
                        FaltanMeds es una herramienta informativa que automatiza la consulta de datos públicos. El contenido nunca debe sustituir el juicio clínico de un médico o farmacéutico.
                    </p>
                </div>

                <h2>1. Naturaleza de la Información</h2>
                <p>
                    La información contenida en FaltanMeds se obtiene de forma automatizada de la base de datos pública CIMA (Centro de Información online de Medicamentos de la AEMPS). Aunque nos esforzamos por mantener la información actualizada, <strong>no podemos garantizar la exactitud, integridad o inmediatez de los datos</strong> mostrados.
                </p>
                <p>
                    Puede haber un desfase temporal entre la publicación oficial de la AEMPS y su reflejo en este sitio web.
                </p>

                <h2>2. No es un Servicio Médico</h2>
                <p>
                    El contenido de este sitio web (texto, gráficos, imágenes y otra información) tiene únicamente fines informativos generales.
                    <strong>Nunca ignore el consejo médico profesional ni demore en buscarlo debido a algo que haya leído en FaltanMeds.</strong>
                </p>

                <h2>3. Uso de Medicamentos</h2>
                <p>
                    No tome decisiones sobre la medicación (como dejar de tomarla, cambiar la dosis o sustituirla por otra) basándose únicamente en la información de este sitio web. Consulte siempre con su médico o farmacéutico ante cualquier duda sobre su tratamiento o problemas de suministro.
                </p>

                <h2>4. Enlaces Externos</h2>
                <p>
                    Este sitio puede contener enlaces a sitios web de terceros (como farmacias online, Amazon, etc.). FaltanMeds no recomienda ni respalda ningún producto o servicio específico y no es responsable del contenido o servicios de dichos sitios de terceros.
                </p>
            </div>
        </main>
    );
}
