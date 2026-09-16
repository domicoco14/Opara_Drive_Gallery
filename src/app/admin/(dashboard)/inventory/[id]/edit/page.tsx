import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import CarForm from '../../CarForm'
import { editCar } from '../../../../actions'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function EditVehiclePage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ error?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const id = params.id;
  const error = searchParams?.error;

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: car } = await supabase.from('cars').select('*').eq('id', id).single()

  if (!car) {
    notFound()
  }

  // Bind the id to the server action
  const updateVehicleAction = editCar.bind(null, id)

  return (
    <div>
      <div className="mb-10">
        <Link href="/admin/inventory" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Back to Inventory
        </Link>
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">Edit Vehicle</h1>
        <p className="text-neutral-500 text-sm">Update details for {car.year} {car.make} {car.model}.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-500 rounded-xl flex items-start gap-3 mb-6">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="max-w-4xl">
        <CarForm car={car} action={updateVehicleAction} />
      </div>
    </div>
  )
}
