'use server'

import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateAdminEmail(newEmail: string) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Unauthorized session. Please log in again.' }
    }

    const cleanEmail = newEmail?.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please provide a valid email address.' }
    }

    if (cleanEmail === user.email?.toLowerCase()) {
      return { success: false, error: 'The new email must be different from your current active email.' }
    }

    // 1. If SUPABASE_SERVICE_ROLE_KEY is set, update immediately via Admin API without email rate limits or confirmation delays
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (serviceRoleKey && supabaseUrl) {
      const adminClient = createSupabaseAdminClient(supabaseUrl, serviceRoleKey)
      const { error: adminErr } = await adminClient.auth.admin.updateUserById(user.id, {
        email: cleanEmail,
        email_confirm: true,
      })

      if (adminErr) {
        return { success: false, error: adminErr.message }
      }

      revalidatePath('/admin/settings')
      return { 
        success: true, 
        message: `Email updated directly to ${cleanEmail}! Please log in with this new email going forward.` 
      }
    }

    // 2. Otherwise, update via client-initiated email verification flow
    const { error } = await supabase.auth.updateUser({ email: cleanEmail })
    if (error) {
      const errMsg = error.message.toLowerCase()
      if (errMsg.includes('rate limit')) {
        return { 
          success: false, 
          error: 'Supabase email rate limit reached. The verification email was already sent on your previous attempt — please check your Gmail inbox (and Spam) for the confirmation link, or update it directly in the Supabase Dashboard.' 
        }
      }
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/settings')
    return { 
      success: true, 
      message: `Verification link sent to ${cleanEmail}! Please open your inbox (and Spam folder) and click the link to finalize the change.` 
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}

export async function updateAdminPassword(newPassword: string, confirmPassword: string) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: 'Unauthorized session. Please log in again.' }
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' }
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: 'Passwords do not match. Please ensure both fields are identical.' }
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/settings')
    return { success: true, message: 'Password has been successfully changed!' }
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}
