'use client'

import { saveCar } from './actions'
import { useState } from 'react'

export default function CarForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false)
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || [])

  const handleRemoveExistingImage = (indexToRemove: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== indexToRemove))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Pass existing images that weren't removed as a comma-separated string
    formData.append('existing_images', existingImages.join(','))
    
    try {
      const result = await saveCar(formData, initialData?.id)
      if (result && !result.success) {
        alert("Failed to save car: " + result.error)
        setLoading(false)
      } else {
        window.location.href = '/admin'
      }
    } catch (err: any) {
      alert("Failed to save car: " + (err.message || String(err)))
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Make */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Make</label>
          <input required name="make" defaultValue={initialData?.make} placeholder="e.g. Mercedes-Benz" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition" />
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Model</label>
          <input required name="model" defaultValue={initialData?.model} placeholder="e.g. G63 AMG" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition" />
        </div>

        {/* Year */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Year</label>
          <input required type="number" name="year" defaultValue={initialData?.year} placeholder="e.g. 2023" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition" />
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Body Type</label>
          <select required name="body_type" defaultValue={initialData?.body_type || 'SUV'} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition">
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {/* Price NGN */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price (NGN)</label>
          <input required type="number" step="0.01" name="price_ngn" defaultValue={initialData?.price_ngn} placeholder="e.g. 250000000" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition" />
        </div>

        {/* Price USD */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price (USD - Optional)</label>
          <input type="number" step="0.01" name="price_usd" defaultValue={initialData?.price_usd} placeholder="e.g. 180000" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition" />
        </div>

        {/* Mileage Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Condition</label>
          <select required name="mileage_type" defaultValue={initialData?.mileage_type || 'Brand New'} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition">
            <option value="Brand New">Brand New</option>
            <option value="Foreign Used">Foreign Used</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</label>
          <select required name="status" defaultValue={initialData?.status || 'Available'} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition">
            <option value="Available">Available</option>
            <option value="Pending Sale">Pending Sale</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Image Uploads */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Vehicle Images</label>
        
        {/* Existing Images Preview */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {existingImages.map((url, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 group">
                <img src={url} alt={`Existing ${i}`} className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => handleRemoveExistingImage(i)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Upload new images directly from your device (JPG, PNG, WEBP).</p>
          <input 
            type="file" 
            name="image_files" 
            multiple 
            accept="image/*"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button disabled={loading} type="submit" className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-red-600/20">
          {loading ? 'Saving...' : (initialData ? 'Update Vehicle' : 'Add Vehicle')}
        </button>
      </div>
    </form>
  )
}
