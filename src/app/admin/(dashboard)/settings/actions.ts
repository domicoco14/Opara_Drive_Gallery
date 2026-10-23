'use server'

import { createClient } from '@/utils/supabase/server'
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
      return { success: false, error: 'The new email must be different from your current email.' }
    }

    const { error } = await supabase.auth.updateUser({ email: cleanEmail })
    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/settings')
    return { 
      success: true, 
      message: 'Verification link sent! Please check the inbox of your new email address to complete the update.' 
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
