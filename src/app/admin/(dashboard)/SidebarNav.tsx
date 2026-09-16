'use client'

import Link from 'next/link'
import { LayoutDashboard, Car, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin/inventory', icon: Car },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <nav className="flex-1 px-4 py-8 space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              isActive 
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
