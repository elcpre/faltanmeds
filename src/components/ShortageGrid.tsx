'use client';

import { useState, useMemo } from 'react';
import { ProblemaSuministro } from '@/lib/types';
import { StatusCard } from '@/components/StatusCard';
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ShortageGridProps {
    initialShortages: ProblemaSuministro[];
}

type SortOption = 'date_desc' | 'date_asc' | 'name_asc' | 'end_date_asc';

export function ShortageGrid({ initialShortages }: ShortageGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [sortBy, setSortBy] = useState<SortOption>('date_desc');

    // Logic to handle "All" results
    // We use a safe large number logic or simple ternary in render.
    // Let's stick strictly to the requirement: 10, 20, 50, or "All"

    const sortedShortages = useMemo(() => {
        let sorted = [...initialShortages];
        switch (sortBy) {
            case 'name_asc':
                sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'date_desc': // Default (Newest issues first)
                sorted.sort((a, b) => b.fini - a.fini);
                break;
            case 'date_asc':
                sorted.sort((a, b) => a.fini - b.fini);
                break;
            case 'end_date_asc': // Ending soonest
                sorted.sort((a, b) => a.ffin - b.ffin);
                break;
        }
        return sorted;
    }, [initialShortages, sortBy]);

    // If itemsPerPage is -1 or very large, show all
    const isShowAll = itemsPerPage === -1;
    const effectiveItemsPerPage = isShowAll ? sortedShortages.length : itemsPerPage;

    const totalPages = Math.ceil(sortedShortages.length / effectiveItemsPerPage);

    // Ensure current page is valid when changing limit
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }

    const startIndex = (currentPage - 1) * effectiveItemsPerPage;
    const endIndex = Math.min(startIndex + effectiveItemsPerPage, sortedShortages.length);
    const currentItems = sortedShortages.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="font-medium">Opciones:</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Sort Control */}
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 uppercase font-bold">Ordenar por</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors cursor-pointer"
                            >
                                <option value="date_desc">Inicio: Más reciente</option>
                                <option value="date_asc">Inicio: Más antiguo</option>
                                <option value="end_date_asc">Finalización: Próxima</option>
                                <option value="name_asc">Nombre (A-Z)</option>
                            </select>
                            <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Items Per Page Control */}
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 uppercase font-bold">Mostrar</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset to page 1 on limit change
                            }}
                            className="bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={-1}>Todos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Info Text */}
            <div className="text-sm text-slate-500 text-center sm:text-left">
                Mostrando <strong>{sortedShortages.length > 0 ? startIndex + 1 : 0}</strong> - <strong>{endIndex}</strong> de <strong>{sortedShortages.length}</strong> problemas activos.
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((shortage) => (
                    <StatusCard
                        key={shortage.cn}
                        name={shortage.nombre}
                        nregistro={shortage.cn}
                        startDate={String(shortage.fini)}
                        endDate={String(shortage.ffin)}
                        reason={shortage.observ}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {!isShowAll && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-sm font-medium text-slate-700 px-4">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
