import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import CarForm from '../CarForm'
import { addCar } from '../../../actions'

export default async function AddVehiclePage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  return (
    <div>
      <div className="mb-8 flex items-start gap-4">
        <Link 
          href="/admin/inventory" 
          className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#111] hover:bg-[#1a1a1a] flex items-center justify-center text-neutral-400 hover:text-white transition-colors border border-neutral-900"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wide mb-1">Add New Vehicle</h1>
          <p className="text-neutral-500 text-[11px] uppercase tracking-wider">Enter the details for the new car</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-500 rounded-xl flex items-start gap-3 mb-6 max-w-4xl">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <CarForm action={addCar} />
    </div>
  )
}
