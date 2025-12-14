import Link from "next/link";
import { Pill } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-blue-900 text-blue-100 py-12 mt-12 mb-16 md:mb-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
                            <div className="bg-blue-800 p-2 rounded-lg group-hover:bg-blue-700 transition-colors border border-blue-700">
                                <Pill className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">
                                FaltanMeds.com
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                            Plataforma ciudadana para la consulta en tiempo real del estado de suministro de medicamentos en España.
                            Datos obtenidos directamente de fuentes oficiales (AEMPS y Ministerio de Sanidad) para garantizar información veraz y accesible.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-span-1">
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/legal/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link></li>
                            <li><Link href="/legal/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/legal/politica-cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
                            <li><Link href="/legal/exencion-responsabilidad" className="hover:text-white transition-colors">Exención de Responsabilidad</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        {/* Empty for now or social links */}
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-sm text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} FaltanMeds.com. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
