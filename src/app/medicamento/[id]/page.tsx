
import { getDrugStatus } from '@/lib/aemps';
import { Metadata } from 'next';
import { AlertCircle, CheckCircle, ArrowLeft, Pill, Car, TriangleAlert, Syringe } from 'lucide-react';
import Link from 'next/link';
import { AdSenseBlock } from '@/components/AdSenseBlock';
import { SearchBar } from '@/components/SearchBar';
import { DrugCarousel } from '@/components/DrugCarousel';
import { HealthMap } from '@/components/HealthMap';


interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const data = await getDrugStatus(id);
    const drugName = data?.nombre || 'Medicamento Desconocido';

    return {
        title: `¿${drugName} Agotado? Estado Oficial de Suministro - FaltanMeds`,
        description: `Consulta si hay desabastecimiento de ${drugName} en farmacias de España. Fechas oficiales de la AEMPS y alternativas disponibles.`,
    };
}

export default async function DrugPage({ params }: PageProps) {
    const { id } = await params;
    const data = await getDrugStatus(id);

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                {/* Clinical Navbar */}
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

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="bg-white p-12 rounded-lg shadow-md border-t-8 border-gray-400">
                        <div className="flex justify-center mb-6">
                            <AlertCircle className="w-16 h-16 text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Medicamento No Identificado</h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                            No hemos encontrado información oficial para el código <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span> en la base de datos de la AEMPS.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-md border border-blue-100 max-w-xl mx-auto mb-8 text-left">
                            <h3 className="font-bold text-blue-900 mb-2">Posibles razones:</h3>
                            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                                <li>El código nacional es incorrecto.</li>
                                <li>El medicamento ha sido retirado del mercado oficialmente.</li>
                                <li>Es un producto de parafarmacia no registrado en CIMA.</li>
                                <li>Error temporal de conexión con la AEMPS.</li>
                            </ul>
                        </div>

                        <div className="max-w-lg mx-auto mb-8">
                            <SearchBar />
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Volver al Inicio
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const isShortage = data.isShortage;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Clinical Navbar */}
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

            {/* Alert Banner (Full Width for Authoritative feel) */}
            {isShortage ? (
                <div className="bg-red-700 text-white px-4 py-4 border-b-4 border-red-900 shadow-inner">
                    <div className="max-w-6xl mx-auto flex items-center">
                        <AlertCircle className="w-8 h-8 mr-4 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-lg uppercase tracking-wide">Desabastecimiento Activo Confirmado</h2>
                            <p className="text-red-100 text-sm">Este medicamento presenta problemas de suministro notificados a la AEMPS.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-green-700 text-white px-4 py-4 border-b-4 border-green-900 shadow-inner">
                    <div className="max-w-6xl mx-auto flex items-center">
                        <CheckCircle className="w-8 h-8 mr-4 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-lg uppercase tracking-wide">Suministro Normal</h2>
                            <p className="text-green-100 text-sm">No constan incidencias activas en el registro oficial.</p>
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Safety Warnings */}
                        {(data.drivingWarning || data.monitored) && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm shadow-sm space-y-4">
                                <h3 className="font-bold text-yellow-800 uppercase text-xs tracking-wider mb-2">
                                    Información de Seguridad
                                </h3>

                                {data.drivingWarning && (
                                    <div className="flex gap-3">
                                        <div className="bg-yellow-100 p-2 rounded-full h-fit">
                                            <Car className="w-5 h-5 text-yellow-700" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-yellow-900 text-sm">Conducción</p>
                                            <p className="text-yellow-800 text-xs leading-relaxed">
                                                Este medicamento puede alterar la capacidad de conducción.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {data.monitored && (
                                    <div className="flex gap-3 pt-2 border-t border-yellow-200">
                                        <div className="bg-black p-2 rounded-full h-fit">
                                            <TriangleAlert className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Seguimiento Adicional</p>
                                            <p className="text-gray-700 text-xs leading-relaxed">
                                                Este medicamento está sujeto a seguimiento adicional (Triángulo Negro).
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Header Card */}
                        <div className="bg-white p-8 rounded-sm shadow-md border-t-4 border-blue-900">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left: Product Image */}
                                <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-start">
                                    {data.photos && data.photos.length > 0 ? (
                                        <div className="border border-gray-100 p-2 rounded-lg bg-white shadow-sm">
                                            <img
                                                src={data.photos[0]}
                                                alt={`Foto de ${data.nombre}`}
                                                className="max-w-full h-auto object-contain max-h-64 rounded-md"
                                                loading="eager"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                                            <div className="text-center text-gray-400">
                                                <Pill className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <span className="text-xs uppercase font-bold">Sin foto oficial</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Details */}
                                <div className="flex-grow">
                                    {/* Lab Tag & Badges */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {data.isGeneric && (
                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                                                    EFG (Genérico)
                                                </span>
                                            )}
                                            {data.hasPrescription && (
                                                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">
                                                    Con Receta
                                                </span>
                                            )}
                                            {data.prescriptionType && data.prescriptionType.toLowerCase().includes("hospital") && (
                                                <span className="bg-indigo-900 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                                    🏥 Uso Hospitalario
                                                </span>
                                            )}
                                        </div>

                                        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                                            {data.nombre}
                                        </h1>
                                        <p className="text-gray-500 font-medium mb-4">{data.labtitular}</p>

                                        <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Código Nacional</span>
                                                <span className="font-mono text-gray-700">{data.cn}</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Dosis y Vía</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium text-gray-900">{data.dosis}</span>
                                                    {data.adminRoute && (
                                                        <span className="text-gray-500 text-xs">
                                                            • {data.adminRoute}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {data.pactivos && (
                                        <div className="col-span-2 mt-4">
                                            <span className="font-bold block text-gray-400 text-xs uppercase mb-1">Principio Activo</span>
                                            <span className="font-medium text-base text-gray-900">{data.pactivos}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Details */}
                        {/* Incident Details (Only if Shortage) */}
                        {data.isShortage && (
                            <div className="bg-white p-6 rounded-sm shadow-md border-t-2 border-red-500">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                                    Detalle de la Incidencia Oficial
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                        <span className="block text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Fecha de Inicio</span>
                                        <span className="text-xl font-bold text-red-700">{data.startDate || 'N/A'}</span>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Previsión Fin</span>
                                        <span className="text-xl font-bold text-blue-700">{data.endDate || 'Pendiente'}</span>
                                    </div>
                                </div>

                                {data.shortageType && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Tipo de Problema</h4>
                                        <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                            {data.shortageType}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Observaciones AEMPS</h4>
                                    <div className="bg-gray-50 p-4 rounded-md border border-gray-100 text-sm text-gray-600 italic">
                                        "{data.shortageNote || data.reason || 'Sin observaciones oficiales.'}"
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Excipients (Allergens) */}
                        {data.excipients && data.excipients.length > 0 && (
                            <div className="bg-white p-6 rounded-sm shadow-md mt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Syringe className="w-5 h-5 text-gray-400" />
                                    <h3 className="text-sm font-bold text-gray-900 uppercase">
                                        Excipientes
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">
                                    Consulta si tienes intolerancias o alergias a estos componentes:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {data.excipients.map((exc, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200">
                                            {exc}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Documents Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.prospectoUrl && (
                                <a
                                    href={data.prospectoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 hover:bg-blue-50 transition uppercase tracking-wide text-xs rounded-sm shadow-sm"
                                >
                                    📄 Prospecto (Pacientes)
                                </a>
                            )}
                            {data.fichaTecnicaUrl && (
                                <a
                                    href={data.fichaTecnicaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 text-gray-700 font-bold py-3 px-4 hover:bg-gray-200 transition uppercase tracking-wide text-xs rounded-sm shadow-sm"
                                >
                                    🔬 Ficha Técnica (Prof)
                                </a>
                            )}
                        </div>

                        {/* Similar Drugs Carousel */}
                        <DrugCarousel alternatives={data.alternatives || []} />

                        {/* Health Centers Map */}
                        <HealthMap />
                    </div>

                    {/* Sidebar / Actions */}
                    <div className="space-y-6">
                        {/* Action Box */}
                        <div className="bg-white p-6 rounded-sm shadow-md border-t-4 border-orange-500">
                            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Acciones Recomendadas</h3>

                            <ul className="space-y-4 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <ArrowLeft className="w-5 h-5 text-brand-600 mr-2 rotate-180 flex-shrink-0" />
                                    <span>Consulte a su médico para prescripción de alternativas.</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowLeft className="w-5 h-5 text-brand-600 mr-2 rotate-180 flex-shrink-0" />
                                    <span>Verifique stock en farmacias cercanas (presencialmente).</span>
                                </li>
                            </ul>
                        </div>

                        {/* Ad Block */}
                        <div className="mt-6 bg-gray-50 p-4 rounded-sm border border-gray-100">
                            <div className="text-xs text-gray-400 text-center mb-2 uppercase tracking-wider">Publicidad</div>
                            <AdSenseBlock slot="1234567890" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
