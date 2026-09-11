'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { login } from './actions'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={login} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          defaultValue="opara_drive_gallery"
          className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition placeholder:text-neutral-600"
          placeholder="admin@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider" htmlFor="password">Password</label>
        <div className="relative">
          <input 
            id="password" 
            name="password" 
            type={showPassword ? 'text' : 'password'} 
            required 
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 pr-12 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition placeholder:text-neutral-600"
            placeholder="••••••••"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B89A30] text-white transition-all duration-300 py-4 rounded-xl font-bold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 uppercase tracking-widest text-sm mt-8">
        Log In securely
      </button>
    </form>
  )
}
