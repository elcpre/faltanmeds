
import Link from 'next/link';
import { Pill } from 'lucide-react';

interface Alternative {
    cn: string;
    nombre: string;
    lab: string;
    photo?: string;
}

interface DrugCarouselProps {
    alternatives: Alternative[];
}

export function DrugCarousel({ alternatives }: DrugCarouselProps) {
    if (!alternatives || alternatives.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-sm shadow-md mt-6 border-t-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                    Medicamentos con la misma composición
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Mismo Principio Activo y Dosis
                </span>
            </div>

            <div className="relative">
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                    {alternatives.map((alt) => (
                        <Link
                            href={`/medicamento/${alt.cn}`}
                            key={alt.cn}
                            className="bg-white border border-gray-200 rounded-lg p-3 w-48 flex-shrink-0 snap-start hover:shadow-lg transition-shadow duration-200 block group"
                        >
                            <div className="h-32 mb-3 bg-gray-50 rounded-md flex items-center justify-center p-2">
                                {alt.photo ? (
                                    <img
                                        src={alt.photo}
                                        alt={alt.nombre}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                                        loading="lazy"
                                    />
                                ) : (
                                    <Pill className="text-gray-300 w-12 h-12" />
                                )}
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase truncate">
                                    {alt.lab}
                                </p>
                                <p className="text-sm font-bold text-blue-900 leading-tight line-clamp-3 group-hover:text-blue-700">
                                    {alt.nombre}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Fade effect on right to hint scroll */}
                <div className="absolute right-0 top-0 bottom-16 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
