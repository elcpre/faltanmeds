import Link from "next/link";
import { Pill } from "lucide-react";

export function Header() {
    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                        <Pill className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">
                        Faltan<span className="text-red-600">Meds</span>.es
                    </span>
                </Link>

                {/* Placeholder for future nav items or search */}
                <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
                    <a href="#" className="hover:text-red-600 transition-colors">Sobre Nosotros</a>
                </nav>
            </div>
        </header>
    );
}
