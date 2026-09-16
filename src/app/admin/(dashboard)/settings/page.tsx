import { updatePassword } from '../../actions'
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react'

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const error = searchParams?.error as string
  const message = searchParams?.message as string

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider mb-2">Security Settings</h1>
        <p className="text-neutral-400">Manage your administrative access credentials.</p>
      </div>
      
      <div className="max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Master Password</h2>
            <p className="text-sm text-neutral-400">Update your secure login phrase.</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-500">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-xl flex items-start gap-3 text-emerald-500">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <form action={updatePassword} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider" htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37] focus:bg-neutral-950/80 transition-all placeholder:text-neutral-600"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="w-full bg-neutral-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37] focus:bg-neutral-950/80 transition-all placeholder:text-neutral-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FACC15] hover:opacity-90 text-black font-bold uppercase tracking-widest py-4 rounded-xl transition-opacity mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            Update Security Credentials
          </button>
        </form>
      </div>
    </div>
  )
}
