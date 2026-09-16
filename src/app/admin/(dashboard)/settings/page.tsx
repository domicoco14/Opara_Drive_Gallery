import { updatePassword } from '../../actions'
import { User, Shield, Key } from 'lucide-react'

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const error = searchParams?.error as string
  const message = searchParams?.message as string

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">Settings</h1>
        <p className="text-neutral-500 text-sm">Manage your administrator account.</p>
      </div>
      
      <div className="max-w-3xl bg-[#111] border border-neutral-900 rounded-2xl p-8">
        
        {/* Account Details */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6 text-white">
            <User className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Account Details</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              disabled
              defaultValue="admin@oparadrive.com"
              className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm text-neutral-500 cursor-not-allowed"
            />
            <p className="text-xs text-neutral-600 mt-2">To change your email, contact database administrator.</p>
          </div>
        </div>

        <div className="h-px bg-neutral-900 w-full mb-10"></div>

        {/* Security */}
        <div>
          <div className="flex items-center gap-2 mb-6 text-white">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Security</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-emerald-500 text-sm font-medium">
              {message}
            </div>
          )}

          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white mb-1">Password</p>
              <p className="text-xs text-neutral-500">Change your admin portal password</p>
            </div>
            
            <form action={updatePassword} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input 
                name="password" 
                type="password" 
                required
                placeholder="New Password"
                className="bg-[#111] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition"
              />
              <input 
                name="confirmPassword" 
                type="password" 
                required
                placeholder="Confirm"
                className="bg-[#111] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition"
              />
              <button type="submit" className="flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white transition-colors py-2 px-4 rounded-lg text-sm font-bold">
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
