import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Trash2, Plus } from 'lucide-react'

export default async function InventoryPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">Inventory</h1>
          <p className="text-neutral-500 text-sm">Manage the vehicles in your database.</p>
        </div>
        <Link 
          href="/admin/inventory/add" 
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Vehicle</span>
        </Link>
      </div>

      <div className="bg-[#111] border border-neutral-900 rounded-2xl overflow-hidden shadow-sm">
        {error ? (
          <div className="p-8 text-center text-red-500">
            Error loading inventory: {error.message}
          </div>
        ) : cars?.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            No vehicles in the database yet.
          </div>
        ) : (
          <div className="divide-y divide-neutral-900">
            {cars?.map((car) => (
              <div key={car.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:bg-[#151515] transition-colors group">
                
                {/* Thumbnail */}
                <div className="relative w-full sm:w-24 h-24 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900">
                  <Image 
                    src={car.images?.[0] || '/placeholder.png'} 
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider truncate">
                    {car.year} {car.make}
                  </h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1 truncate">{car.model}</p>
                </div>

                {/* Price */}
                <div className="w-full sm:w-32">
                  <p className="text-sm font-bold text-white">₦{car.price_ngn?.toLocaleString()}</p>
                  {car.price_usd && (
                    <p className="text-xs text-neutral-500 mt-1">${car.price_usd?.toLocaleString()}</p>
                  )}
                </div>

                {/* Condition Badge */}
                <div className="hidden md:block w-32">
                  <span className="inline-flex px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {car.mileage_type}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="w-24">
                  <span className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    car.status === 'Available' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'
                  }`}>
                    {car.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                  <Link 
                    href={`/admin/inventory/${car.id}/edit`}
                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <form action={async () => {
                    'use server'
                    const { deleteCar } = await import('../../actions')
                    const formData = new FormData()
                    formData.append('id', car.id)
                    await deleteCar(formData)
                  }}>
                    <button type="submit" className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
