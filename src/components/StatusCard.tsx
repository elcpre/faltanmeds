
import { AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

interface StatusCardProps {
    name: string;
    nregistro: string;
    startDate: string;
    endDate: string;
    reason: string;
}

export function StatusCard({ name, nregistro, startDate, endDate, reason }: StatusCardProps) {
    // Simple check to see if end date is passed or "Indefinite"
    // API timestamp is milliseconds.

    const formatDate = (timestamp: string | number) => {
        try {
            return new Date(timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch (e) {
            return 'Fecha desconocida';
        }
    }

    return (
        <Link href={`/medicamento/${nregistro}`} className="block group">
            <div className="bg-white rounded-xl border border-red-50 p-6 shadow-sm hover:shadow-md transition-all group-hover:border-red-200">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-2">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Suministro Irregular
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Ref: {nregistro}</p>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Desde: <span className="font-semibold">{formatDate(Number(startDate))}</span></span>
                    </div>
                    {endDate && (
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-green-600" />
                            <span>Vuelve: <span className="font-semibold text-green-700">{formatDate(Number(endDate))}</span></span>
                        </div>
                    )}
                </div>

                {reason && (
                    <p className="mt-3 text-xs text-gray-500 italic line-clamp-1 border-t pt-2 border-gray-100">
                        {reason}
                    </p>
                )}
            </div>
        </Link>
    );
}
