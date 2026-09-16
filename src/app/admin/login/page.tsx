import { login } from '../actions'

export default async function LoginPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const error = searchParams?.error as string

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md p-8 bg-neutral-900 border border-[#D4AF37]/20 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider mb-2">Admin Access</h1>
          <p className="text-neutral-400 text-sm">Sign in to manage Opara Drive Gallery</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form action={login} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="admin@oparadrive.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-wider py-4 rounded-lg transition-colors mt-4"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
