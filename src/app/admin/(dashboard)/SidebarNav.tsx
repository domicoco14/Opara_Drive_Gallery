'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CarFront, Settings } from 'lucide-react'

export default function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin/overview', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin', icon: CarFront },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="flex-1 py-8 px-4 flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        // For inventory, exact match on /admin or starts with /admin/cars
        const isActive = 
          item.href === '/admin' 
            ? pathname === '/admin' || pathname.startsWith('/admin/cars')
            : pathname.startsWith(item.href)

        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive 
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 shadow-inner' 
                : 'text-neutral-500 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
