import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { CarFront, DollarSign, Activity, Wallet } from 'lucide-react'

export default async function OverviewPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: cars } = await supabase.from('cars').select('*')

  const totalInventory = cars?.length || 0
  const availableCars = cars?.filter(car => car.status === 'Available').length || 0
  
  const totalValueNGN = cars?.filter(car => car.status === 'Available').reduce((acc, car) => acc + (Number(car.price_ngn) || 0), 0) || 0
  const totalValueUSD = cars?.filter(car => car.status === 'Available').reduce((acc, car) => acc + (Number(car.price_usd) || 0), 0) || 0

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase">Analytics Overview</h1>
        <p className="text-neutral-500 mt-1">Real-time statistics for Opara Auto's.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Inventory */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Total Inventory</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <CarFront className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black">{totalInventory}</p>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Vehicles in database</p>
        </div>

        {/* Available Cars */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Available</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black">{availableCars}</p>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Ready for sale</p>
        </div>

        {/* Total Value NGN */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Fleet Value</h3>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black truncate">₦{totalValueNGN.toLocaleString()}</p>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Total value (Available)</p>
        </div>

        {/* Total Value USD */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Fleet Value</h3>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black truncate">${totalValueUSD.toLocaleString()}</p>
          <p className="text-xs text-neutral-500 mt-2 font-medium">Total value (Available)</p>
        </div>

      </div>

    </div>
  )
}
