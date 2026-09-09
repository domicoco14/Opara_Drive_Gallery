import CarForm from '../CarForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewCarPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin" className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-neutral-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Add New Vehicle</h1>
          <p className="text-neutral-500 text-sm mt-1">Enter the details for the new car</p>
        </div>
      </div>
      
      <CarForm />
    </div>
  )
}
