import CarForm from '../../CarForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function EditCarPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: car } = await supabase.from('cars').select('*').eq('id', params.id).single()

  if (!car) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin" className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-neutral-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Edit Vehicle</h1>
          <p className="text-neutral-500 text-sm mt-1">Update details for {car.year} {car.make} {car.model}</p>
        </div>
      </div>
      
      <CarForm initialData={car} />
    </div>
  )
}
