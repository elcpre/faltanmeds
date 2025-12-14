import { ShortageGrid } from '@/components/ShortageGrid';
import { getActiveShortages } from '@/lib/aemps';
import { SearchBar } from '@/components/SearchBar';
import { AlertTriangle, Pill } from 'lucide-react';

export default async function Home() {
  const shortages = await getActiveShortages();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clinical Style */}
      <div className="bg-blue-900 text-white border-b-4 border-blue-700">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          {/* FaltanMeds Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-blue-800 p-2 rounded-xl shadow-lg border border-blue-700">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <span className="font-bold text-3xl tracking-tight text-white drop-shadow-md">
              FaltanMeds.com
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Verificador de <span className="text-blue-200">Abastecimiento Farmacéutico</span>
          </h1>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Base de datos sincronizada en tiempo real con la Agencia Española de Medicamentos (AEMPS).
            Consulte el estado de suministro oficial.
          </p>

          <div className="flex justify-center mb-12">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8 space-x-2">
          <AlertTriangle className="text-red-500 w-6 h-6" />
          <h2 className="text-2xl font-bold text-slate-800">
            Problemas de Suministro Activos ({shortages.length})
          </h2>
        </div>

        <ShortageGrid initialShortages={shortages} />
      </div>

    </main>
  );
}
