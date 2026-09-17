'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveCar(formData: FormData, id?: string) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Handle Image Uploads
    const imageFiles = formData.getAll('image_files') as File[]
    const uploadedUrls: string[] = []

    for (const file of imageFiles) {
      if (file.size > 0) { // Check if file is actually present
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data, error } = await supabase.storage
          .from('car-images')
          .upload(fileName, file, { upsert: false })

        if (error) {
          console.error('Error uploading image:', error)
          return { success: false, error: `Failed to upload image: ${error.message}` }
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from('car-images').getPublicUrl(fileName)
        uploadedUrls.push(publicUrl)
      }
    }

    // Parse existing images (if editing)
    const existingImagesStr = formData.get('existing_images') as string
    const existingImages = existingImagesStr ? existingImagesStr.split(',').filter(Boolean) : []
    
    const allImages = [...existingImages, ...uploadedUrls]

    // Parse form data
    const data = {
      make: formData.get('make') as string,
      model: formData.get('model') as string,
      year: parseInt(formData.get('year') as string, 10),
      price_ngn: parseFloat(formData.get('price_ngn') as string),
      price_usd: formData.get('price_usd') ? parseFloat(formData.get('price_usd') as string) : 0,
      mileage_type: formData.get('mileage_type') as string,
      body_type: formData.get('body_type') as string,
      status: formData.get('status') as string,
      images: allImages,
    }

    if (id) {
      // Update
      const { error } = await supabase.from('cars').update(data).eq('id', id)
      if (error) return { success: false, error: error.message }
    } else {
      // Insert
      const { error } = await supabase.from('cars').insert(data)
      if (error) return { success: false, error: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true }
  } catch (err: any) {
    console.error("Uncaught error in saveCar:", err)
    return { success: false, error: err.message || String(err) }
  }
}
