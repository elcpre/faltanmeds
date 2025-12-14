
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aviso Legal - FaltanMeds',
    description: 'Información legal y titularidad del sitio web FaltanMeds.',
};

export default function AvisoLegalPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Aviso Legal</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <h2>1. Datos Identificativos</h2>
                <p>
                    En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se exponen los siguientes datos identificativos del titular del sitio web:
                </p>
                <ul className="list-disc list-inside bg-gray-50 p-6 rounded-md border border-gray-100">
                    <li><strong>Denominación del sitio:</strong> FaltanMeds</li>
                    <li><strong>Dirección:</strong> Camino de las Viñas s/n, 18120, Alhama de Granada, España</li>
                    <li><strong>Correo electrónico de contacto:</strong> info@faltanmeds.com</li>
                </ul>

                <h2>2. Propiedad Intelectual e Industrial</h2>
                <p>
                    El titular es propietario de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: diseño, logotipos, código fuente).
                </p>
                <p>
                    <strong>Atribución de Datos:</strong> Este sitio web utiliza datos públicos procedentes de la <a href="https://cima.aemps.es/" target="_blank" rel="nofollow noopener" className="text-blue-600 underline">Agencia Española de Medicamentos y Productos Sanitarios (AEMPS)</a>. FaltanMeds no es propietario de dichos datos y se limita a facilitar su acceso y visualización. La reutilización de estos datos se realiza conforme a las condiciones de uso de la AEMPS.
                </p>

                <h2>3. Condiciones de Uso</h2>
                <p>
                    El usuario asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que FaltanMeds ofrece.
                </p>

                <h2>4. Exclusión de Garantías y Responsabilidad</h2>
                <p>
                    FaltanMeds no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                </p>
                <p>
                    La información sobre medicamentos es meramente informativa y proviene de fuentes oficiales, pero puede contener errores de sincronización. <strong>Siempre verifique la información con un profesional de la salud.</strong>
                </p>

                <h2>5. Modificaciones</h2>
                <p>
                    El titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
                </p>

                <h2>6. Enlaces</h2>
                <p>
                    En el caso de que en FaltanMeds se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, el titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.
                </p>
            </div>
        </main>
    );
}
