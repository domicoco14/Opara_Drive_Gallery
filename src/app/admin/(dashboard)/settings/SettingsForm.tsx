'use client'

import { useState, useTransition } from 'react'
import { User, Shield, Key, Mail, Eye, EyeOff, Check, AlertCircle, Loader2 } from '@/components/Icons'
import { updateAdminEmail, updateAdminPassword } from './actions'

interface SettingsFormProps {
  initialEmail: string
}

export default function SettingsForm({ initialEmail }: SettingsFormProps) {
  // Email state
  const [currentEmail, setCurrentEmail] = useState(initialEmail)
  const [newEmail, setNewEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPendingEmail, startEmailTransition] = useTransition()

  // Password state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPendingPassword, startPasswordTransition] = useTransition()

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailStatus(null)

    if (!newEmail.trim()) {
      setEmailStatus({ type: 'error', message: 'Please enter a new email address.' })
      return
    }

    startEmailTransition(async () => {
      const res = await updateAdminEmail(newEmail)
      if (res.success) {
        setEmailStatus({ type: 'success', message: res.message || 'Email update initiated successfully!' })
        setNewEmail('')
      } else {
        setEmailStatus({ type: 'error', message: res.error || 'Failed to update email.' })
      }
    })
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordStatus(null)

    if (!newPassword) {
      setPasswordStatus({ type: 'error', message: 'Please enter a new password.' })
      return
    }
    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters long.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match. Please verify both fields.' })
      return
    }

    startPasswordTransition(async () => {
      const res = await updateAdminPassword(newPassword, confirmPassword)
      if (res.success) {
        setPasswordStatus({ type: 'success', message: res.message || 'Password changed successfully!' })
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setPasswordStatus({ type: 'error', message: res.error || 'Failed to update password.' })
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Account Profile Card */}
      <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-white">Owner Account Details</h2>
              <p className="text-xs text-neutral-400">Current credentials used to access the Dealer Portal</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Active Admin
          </span>
        </div>

        {/* Current Email Display */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Current Active Email</label>
          <div className="flex items-center gap-3 bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-300">
            <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
            <span className="font-mono text-white">{currentEmail || 'Not loaded'}</span>
          </div>
        </div>

        {/* Change Email Form */}
        <form onSubmit={handleUpdateEmail} className="pt-2 space-y-4">
          <div className="space-y-2">
            <label htmlFor="newEmail" className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between">
              <span>Change To Preferred Email</span>
              <span className="text-[11px] font-normal text-neutral-500 lowercase">e.g. owner@gmail.com</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                required
                className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition"
              />
              <button
                type="submit"
                disabled={isPendingEmail || !newEmail.trim()}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B89A30] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 shrink-0"
              >
                {isPendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Email</span>
                )}
              </button>
            </div>
            <p className="text-xs text-neutral-500">
              Note: When you update your email, Supabase may send a verification email to your new address to confirm ownership.
            </p>
          </div>

          {emailStatus && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
                emailStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              {emailStatus.type === 'success' ? (
                <Check className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="flex-1">{emailStatus.message}</div>
            </div>
          )}
        </form>
      </div>

      {/* Security & Password Card */}
      <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-white">Password & Security</h2>
            <p className="text-xs text-neutral-400">Update your dealer portal password anytime</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-4 pr-11 py-3 text-sm text-white outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  required
                  minLength={6}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-4 pr-11 py-3 text-sm text-white outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 order-2 sm:order-1 text-center sm:text-left">
              Password will take effect immediately for subsequent logins.
            </p>
            <button
              type="submit"
              disabled={isPendingPassword || !newPassword || newPassword.length < 6}
              className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] hover:bg-[#B89A30] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 order-1 sm:order-2 shrink-0"
            >
              {isPendingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>

          {passwordStatus && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
                passwordStatus.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              {passwordStatus.type === 'success' ? (
                <Check className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="flex-1">{passwordStatus.message}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
