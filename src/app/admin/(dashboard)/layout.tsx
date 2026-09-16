import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SidebarNav from './SidebarNav'
import { signOut } from '../actions'

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
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-900 bg-[#0a0a0a] flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-20 flex items-center px-8 border-b border-neutral-900">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase">
            Opara <span className="text-[#D4AF37]">Admin</span>
          </Link>
        </div>
        
        <SidebarNav />

        <div className="p-4 border-t border-neutral-900">
          <div className="px-4 py-3 mb-2">
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user.email}</p>
          </div>
          <form action={signOut}>
            <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition font-medium">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 relative bg-[#0a0a0a]">
        <header className="h-20 border-b border-neutral-900 flex items-center justify-between px-6 md:hidden">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase">
            Opara <span className="text-[#D4AF37]">Admin</span>
          </Link>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
