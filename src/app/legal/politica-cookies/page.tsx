
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Cookies - FaltanMeds',
    description: 'Información sobre el uso de cookies y tecnologías de seguimiento.',
};

export default function CookiesPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Política de Cookies</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <p>
                    Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
                </p>

                <h2>Cookies utilizadas en este sitio web</h2>
                <p>
                    Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web con el fin de informarle con la máxima exactitud posible.
                </p>

                <h3>Cookies de terceros</h3>
                <ul className="list-disc list-inside">
                    <li><strong>Google Analytics:</strong> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google.</li>
                    <li><strong>Google AdSense:</strong> Utiliza cookies para mejorar la publicidad. Una cookie común es la de "DoubleClick", que permite mostrar anuncios relevantes basados en sus búsquedas anteriores.</li>
                </ul>

                <div className="bg-yellow-50 p-6 my-6 rounded-md border border-yellow-200">
                    <h3 className="text-yellow-800 font-bold mt-0">Nota sobre Publicidad de Google</h3>
                    <p className="text-sm">
                        Google utiliza cookies para permitirle a él y a sus socios publicar anuncios basados en sus visitas a sus sitios y/o a otros sitios de Internet. Los usuarios pueden inhabilitar la publicidad personalizada visitando la <a href="https://adssettings.google.com/" target="_blank" rel="nofollow noopener" className="underline">Configuración de anuncios</a>.
                    </p>
                </div>

                <h2>Desactivación o eliminación de cookies</h2>
                <p>
                    En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que esté usando (Chrome, Firefox, Safari, Edge...).
                </p>
            </div>
        </main>
    );
}
