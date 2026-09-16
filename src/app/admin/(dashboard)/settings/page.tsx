import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User, Shield, Key } from 'lucide-react'

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your administrator account.</p>
      </div>

      <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl space-y-8">
        
        {/* Profile Info */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-yellow-500" />
            Account Details
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
              <input 
                readOnly 
                value={user?.email || ''} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm outline-none text-neutral-400 cursor-not-allowed"
              />
              <p className="text-xs text-neutral-500">To change your email, contact database administrator.</p>
            </div>
          </div>
        </div>

        <hr className="border-neutral-800" />

        {/* Security Info */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-yellow-500" />
            Security
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
              <div>
                <p className="font-bold text-sm">Password</p>
                <p className="text-xs text-neutral-500 mt-1">Change your admin portal password</p>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-lg text-white border border-white/10">
                <Key className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
