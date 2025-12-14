
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad - FaltanMeds',
    description: 'Cómo tratamos sus datos personales en FaltanMeds de acuerdo al RGPD.',
};

export default function PrivacidadPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Política de Privacidad</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <p>
                    En FaltanMeds nos comprometemos a proteger su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal, en cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
                </p>

                <h2>1. Responsable del Tratamiento</h2>
                <div className="bg-gray-50 p-6 rounded-md border border-gray-100 mb-6">
                    <ul className="list-none space-y-2">
                        <li><strong>Denominación del sitio:</strong> FaltanMeds</li>
                        <li><strong>Dirección:</strong> Camino de las Viñas s/n, 18120, Alhama de Granada, España</li>
                        <li><strong>Correo electrónico de contacto:</strong> info@faltanmeds.com</li>
                    </ul>
                </div>

                <h2>2. Datos que Recopilamos</h2>
                <p>
                    Este sitio web <strong>NO utiliza formularios de registro ni recopila nombres, direcciones o teléfonos</strong> de forma directa.
                </p>
                <p>
                    Sin embargo, se recopilan datos técnicos de forma automática para el funcionamiento del servicio y análisis:
                </p>
                <ul className="list-disc list-inside">
                    <li>Dirección IP (anonimizada en la medida de lo posible).</li>
                    <li>Datos de navegación y cookies (ver Política de Cookies).</li>
                </ul>

                <h2>3. Finalidad del Tratamiento</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Análisis Web:</strong> Utilizamos Google Analytics para entender cómo los usuarios interactúan con la web (páginas visitadas, tiempo en el sitio) y mejorar nuestro servicio.</li>
                    <li><strong>Publicidad:</strong> Utilizamos Google AdSense para mostrar anuncios. Google puede utilizar datos de navegación para personalizar la publicidad.</li>
                </ul>

                <h2>4. Legitimación</h2>
                <p>
                    La base legal para el tratamiento de sus datos es el <strong>consentimiento</strong> del usuario (mediante la aceptación de cookies) y el interés legítimo del titular para garantizar la seguridad y funcionamiento del sitio web.
                </p>

                <h2>5. Destinatarios de los Datos</h2>
                <p>
                    No cedemos datos personales a terceros, salvo obligación legal.
                    No obstante, compartimos datos de navegación no identificativos con proveedores de servicios como:
                </p>
                <ul className="list-disc list-inside">
                    <li><strong>Google Ireland Limited</strong> (Analytics y AdSense).</li>
                </ul>

                <h2>6. Derechos del Usuario</h2>
                <p>
                    <p>
                        Puede ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición enviando un correo electrónico a info@faltanmeds.com. También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que se han vulnerado sus derechos.
                    </p>
                </p>
            </div>
        </main>
    );
}
