import { login } from '../actions'
import Link from 'next/link'
import { Info } from 'lucide-react'

export default async function LoginPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const error = searchParams?.error as string

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-[#D4AF37] selection:text-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background Glowing Orbs for Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute w-[40vw] h-[40vw] bg-[#D4AF37]/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] mx-4">
        
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-serif font-bold tracking-tighter uppercase inline-block mb-2 text-white">
            Opara Drive <span className="text-[#D4AF37]">Gallery</span>
          </Link>
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest">Admin Portal</p>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-500 rounded-xl flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form action={login} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider" htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37] focus:bg-neutral-950/80 transition-all placeholder:text-neutral-600"
              placeholder="admin@oparadrive.com"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37] focus:bg-neutral-950/80 transition-all placeholder:text-neutral-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FACC15] hover:opacity-90 text-black font-bold uppercase tracking-widest py-4 rounded-xl transition-opacity mt-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-neutral-500 hover:text-[#D4AF37] transition-colors text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2">
            &larr; Back to Showroom
          </Link>
        </div>
      </div>
    </div>
  )
}
