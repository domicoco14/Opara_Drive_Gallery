'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CarForm({ 
  car = null, 
  action 
}: { 
  car?: any, 
  action: (formData: FormData) => void 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // This allows the form to visually show it's submitting while the server action runs
    setIsSubmitting(true)
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="bg-[#111] border border-neutral-900 rounded-2xl p-8 max-w-4xl">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        {/* MAKE */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Make</label>
          <input 
            name="make" 
            required 
            defaultValue={car?.make}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. Mercedes-Benz"
          />
        </div>
        
        {/* MODEL */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Model</label>
          <input 
            name="model" 
            required 
            defaultValue={car?.model}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. G63 AMG"
          />
        </div>

        {/* YEAR */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Year</label>
          <input 
            name="year" 
            type="number" 
            required 
            defaultValue={car?.year}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. 2023"
          />
        </div>

        {/* BODY TYPE */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Body Type</label>
          <select 
            name="body_type" 
            required
            defaultValue={car?.body_type || "SUV"}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Pickup">Pickup</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* PRICE NGN */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Price (NGN)</label>
          <input 
            name="price_ngn" 
            type="number" 
            required 
            defaultValue={car?.price_ngn}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. 250000000"
          />
        </div>
        
        {/* PRICE USD */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Price (USD - Optional)</label>
          <input 
            name="price_usd" 
            type="number" 
            defaultValue={car?.price_usd}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. 180000"
          />
        </div>

        {/* CONDITION */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Condition</label>
          <select 
            name="mileage_type" 
            required
            defaultValue={car?.mileage_type || "Brand New"}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="Brand New">Brand New</option>
            <option value="Foreign Used">Foreign Used</option>
            <option value="Locally Used">Locally Used</option>
          </select>
        </div>

        {/* STATUS */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Status</label>
          <select 
            name="status" 
            required
            defaultValue={car?.status || "Available"}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="Available">Available</option>
            <option value="Pending Sale">Pending Sale</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

      </div>

      <div className="mt-8 border-t border-neutral-900 pt-8">
        {/* VEHICLE IMAGES */}
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Vehicle Images</label>
          <p className="text-[10px] text-neutral-500 mb-3">Upload new images directly from your device (JPG, PNG, WEBP).</p>
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            required={!car?.images?.length}
            className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg p-2 text-sm text-neutral-400 
              file:bg-[#D4AF37] file:border-0 file:rounded-md file:px-6 file:py-2.5 file:text-black file:font-bold file:uppercase file:tracking-widest file:text-[10px] file:mr-4 file:cursor-pointer hover:file:bg-[#B89A30] file:transition-colors
              focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.2)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)] text-[11px] disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : (car ? 'Update Vehicle' : 'Add Vehicle')}
        </button>
      </div>
    </form>
  )
}
