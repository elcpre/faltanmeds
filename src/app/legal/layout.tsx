
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white font-sans">
            {/* Clinical Navbar (Shared with DrugPage) */}
            <div className="bg-blue-900 text-white px-4 py-4 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="mr-4 text-blue-200 hover:text-white transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <span className="font-bold text-xl tracking-wide uppercase">FaltanMeds <span className="text-blue-300 font-light hidden sm:inline">| Datos Oficiales</span></span>
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}
