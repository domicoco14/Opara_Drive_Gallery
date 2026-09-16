import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { deleteCar } from './actions'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: cars } = await supabase.from('cars').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">Inventory</h1>
          <p className="text-neutral-500 mt-1">Manage your showroom fleet ({cars?.length || 0} vehicles)</p>
        </div>
        <Link href="/admin/cars/new" className="bg-yellow-600 hover:bg-[#B89A30] text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 shadow-lg shadow-yellow-600/20">
          <Plus className="w-5 h-5" />
          Add Vehicle
        </Link>
      </div>

      <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-400 uppercase bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Vehicle</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Price</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Condition</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {(!cars || cars.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No vehicles found. Click "Add Vehicle" to build your showroom.
                  </td>
                </tr>
              )}
              {cars?.map((car) => (
                <tr key={car.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
                        {car.images?.[0] ? (
                          <Image src={car.images[0]} alt={car.model} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[10px] uppercase">No Img</div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white uppercase tracking-tight">{car.year} {car.make}</div>
                        <div className="text-neutral-400 text-xs mt-0.5">{car.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">₦{Number(car.price_ngn).toLocaleString()}</div>
                    {car.price_usd && <div className="text-xs text-neutral-500 mt-0.5">${Number(car.price_usd).toLocaleString()}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">
                      {car.mileage_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border ${
                      car.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/cars/${car.id}/edit`} className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteCar(car.id)
                      }}>
                        <button type="submit" className="p-2 text-neutral-400 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
