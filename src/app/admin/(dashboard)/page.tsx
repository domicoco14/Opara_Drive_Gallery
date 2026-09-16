import { CarFront, Plus, Search } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider mb-2">Fleet Management</h1>
          <p className="text-neutral-400">Oversee and update your showroom inventory.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <Plus className="w-5 h-5" />
          <span>Add Vehicle</span>
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-center">
        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CarFront className="w-10 h-10 text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-white mb-4">Inventory System Ready</h2>
        <p className="text-neutral-400 max-w-md mx-auto">
          The secure admin portal is fully styled and operational. Ready to connect the live database tables to add, edit, and remove vehicles.
        </p>
      </div>
    </div>
  )
}
