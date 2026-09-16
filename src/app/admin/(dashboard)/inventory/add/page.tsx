import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import CarForm from '../CarForm'
import { addCar } from '../../../actions'

export default async function AddVehiclePage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  return (
    <div>
      <div className="mb-10">
        <Link href="/admin/inventory" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Back to Inventory
        </Link>
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">Add Vehicle</h1>
        <p className="text-neutral-500 text-sm">Upload a new car to the showroom database.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-500 rounded-xl flex items-start gap-3 mb-6">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="max-w-4xl">
        <CarForm action={addCar} />
      </div>
    </div>
  )
}
