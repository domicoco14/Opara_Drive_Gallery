import { updatePassword } from '../../actions'

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const error = searchParams?.error as string
  const message = searchParams?.message as string

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider mb-8">Admin Settings</h1>
      
      <div className="max-w-xl bg-neutral-900 border border-[#D4AF37]/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Change Master Password</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
            {message}
          </div>
        )}

        <form action={updatePassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-wider py-4 rounded-lg transition-colors mt-4"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
