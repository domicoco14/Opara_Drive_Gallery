'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CarFront, Settings, LogOut } from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin/overview', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin', icon: CarFront },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-neutral-900 bg-neutral-950/90 backdrop-blur-xl md:hidden z-50 flex items-center justify-around py-3 px-2 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = 
          item.href === '/admin' 
            ? pathname === '/admin' || pathname.startsWith('/admin/cars')
            : pathname.startsWith(item.href)

        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${
              isActive 
                ? 'text-yellow-500' 
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        )
      })}
      
      <form action="/auth/signout" method="post" className="flex flex-col items-center">
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-neutral-500 hover:text-yellow-500 transition">
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </form>
    </div>
  )
}
