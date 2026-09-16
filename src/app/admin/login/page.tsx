import LoginForm from './LoginForm'
import Link from 'next/link'
import { Info } from 'lucide-react'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 font-sans selection:bg-[#D4AF37] selection:text-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background Glowing Orbs for Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute w-[40vw] h-[40vw] bg-[#D4AF37]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-[#151515] border border-white/5 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter uppercase inline-block mb-2">
            Opara <span className="text-[#D4AF37]">Drive</span>
          </Link>
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest">Admin Portal</p>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-500 rounded-xl flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <LoginForm />
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-neutral-500 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider">
            &larr; Back to Showroom
          </Link>
        </div>
      </div>
    </div>
  )
}
