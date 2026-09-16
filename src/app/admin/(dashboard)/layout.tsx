import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { signOut } from '../actions'
import { CarFront, Settings, LogOut, LayoutDashboard } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-[#D4AF37] selection:text-black flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="relative z-20 w-full md:w-72 bg-neutral-900/50 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <Link href="/admin" className="text-2xl font-serif font-bold text-white uppercase tracking-wider block">
            Opara <span className="text-[#D4AF37]">Admin</span>
          </Link>
          <div className="mt-4 flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FACC15] flex items-center justify-center flex-shrink-0 text-black font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <p className="text-neutral-400 text-xs font-medium truncate">{user.email}</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 text-neutral-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all group font-medium">
            <LayoutDashboard className="w-5 h-5 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3.5 text-neutral-300 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all group font-medium">
            <Settings className="w-5 h-5 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5">
          <form action={signOut}>
            <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-900/50 rounded-xl transition-all font-medium">
              <LogOut className="w-5 h-5" />
              <span>Secure Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 p-6 md:p-12 overflow-y-auto bg-transparent">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
