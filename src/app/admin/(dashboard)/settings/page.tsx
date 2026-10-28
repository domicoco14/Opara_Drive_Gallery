import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your administrator account credentials.</p>
      </div>

      <SettingsForm 
        initialEmail={user?.email || ''} 
        pendingEmail={user?.new_email || ''} 
      />
    </div>
  )
}
