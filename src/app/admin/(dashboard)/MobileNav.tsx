'use client'

import Link from 'next/link'
import { LayoutDashboard, Car, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin/inventory', icon: Car },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-neutral-900 z-50 px-6 py-3 flex items-center justify-between">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 transition font-medium ${
              isActive 
                ? 'text-[#D4AF37]' 
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
            <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
