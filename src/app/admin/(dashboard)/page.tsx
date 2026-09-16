import { Car, DollarSign, Wallet, Activity } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">Analytics Overview</h1>
        <p className="text-neutral-500 text-sm">Real-time statistics for Opara Drive Gallery.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inventory */}
        <div className="bg-[#111] border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Inventory</h3>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-black mb-1">6</p>
          <p className="text-xs text-neutral-600">Vehicles in database</p>
        </div>

        {/* Available */}
        <div className="bg-[#111] border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Available</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-3xl font-black mb-1">5</p>
          <p className="text-xs text-neutral-600">Ready for sale</p>
        </div>

        {/* Fleet Value (NGN) */}
        <div className="bg-[#111] border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Fleet Value</h3>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <p className="text-3xl font-black mb-1">₦950,000,...</p>
          <p className="text-xs text-neutral-600">Total value (Available)</p>
        </div>

        {/* Fleet Value (USD) */}
        <div className="bg-[#111] border border-neutral-900 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Fleet Value</h3>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-purple-500" />
            </div>
          </div>
          <p className="text-3xl font-black mb-1">$676,000</p>
          <p className="text-xs text-neutral-600">Total value (Available)</p>
        </div>
      </div>
    </div>
  )
}
