'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/admin/login?error=Could not authenticate user')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return redirect('/admin/settings?error=Passwords do not match')
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return redirect('/admin/settings?error=Failed to update password')
  }

  return redirect('/admin/settings?message=Password updated successfully')
}

export async function signOut() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  return redirect('/admin/login')
}

export async function addCar(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const make = formData.get('make') as string
  const model = formData.get('model') as string
  const year = parseInt(formData.get('year') as string)
  const price_ngn = parseInt(formData.get('price_ngn') as string)
  const price_usd = parseInt(formData.get('price_usd') as string)
  const mileage_type = formData.get('mileage_type') as string
  const body_type = formData.get('body_type') as string
  const status = formData.get('status') as string

  const imageFile = formData.get('image') as File | null;
  let imageUrls: string[] = [];

  if (imageFile && imageFile.size > 0) {
    const fileName = \\-\\;
    const { data, error } = await supabase.storage.from('car-images').upload(fileName, imageFile);
    
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('car-images').getPublicUrl(fileName);
      imageUrls = [publicUrl];
    }
  }

  const { error } = await supabase.from('cars').insert([
    {
      make,
      model,
      year,
      price_ngn,
      price_usd,
      mileage_type,
      body_type,
      status,
      images: imageUrls,
    }
  ])

  if (error) {
    return redirect('/admin/inventory/add?error=Failed to add vehicle')
  }

  revalidatePath('/admin/inventory')
  revalidatePath('/')
  redirect('/admin/inventory')
}

export async function editCar(id: string, formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const make = formData.get('make') as string
  const model = formData.get('model') as string
  const year = parseInt(formData.get('year') as string)
  const price_ngn = parseInt(formData.get('price_ngn') as string)
  const price_usd = parseInt(formData.get('price_usd') as string)
  const mileage_type = formData.get('mileage_type') as string
  const body_type = formData.get('body_type') as string
  const status = formData.get('status') as string

  const updateData: any = {
    make,
    model,
    year,
    price_ngn,
    price_usd,
    mileage_type,
    body_type,
    status,
  }

  const imageFile = formData.get('image') as File | null;
  if (imageFile && imageFile.size > 0) {
    const fileName = \\-\\;
    const { data, error } = await supabase.storage.from('car-images').upload(fileName, imageFile);
    
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('car-images').getPublicUrl(fileName);
      updateData.images = [publicUrl];
    }
  }

  const { error } = await supabase.from('cars').update(updateData).eq('id', id)

  if (error) {
    return redirect(\/admin/inventory/\/edit?error=Failed to update vehicle\)
  }

  revalidatePath('/admin/inventory')
  revalidatePath('/')
  redirect('/admin/inventory')
}

export async function deleteCar(formData: FormData) {
  const id = formData.get('id') as string
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  await supabase.from('cars').delete().eq('id', id)
  
  revalidatePath('/admin/inventory')
  revalidatePath('/')
  redirect('/admin/inventory')
}
