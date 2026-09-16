'use client'

import { UploadCloud } from 'lucide-react'
import { useState } from 'react'

export default function CarForm({ 
  car = null, 
  action 
}: { 
  car?: any, 
  action: (formData: FormData) => void 
}) {
  const [fileName, setFileName] = useState('')

  return (
    <form action={action} className="bg-[#111] border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-6">
      
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Make</label>
          <input 
            name="make" 
            required 
            defaultValue={car?.make}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. Mercedes-Benz"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Model</label>
          <input 
            name="model" 
            required 
            defaultValue={car?.model}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="e.g. G63 AMG"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Year</label>
          <input 
            name="year" 
            type="number" 
            required 
            defaultValue={car?.year}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="2024"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Body Type</label>
          <select 
            name="body_type" 
            required
            defaultValue={car?.body_type || "SUV"}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Pickup">Pickup</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>
      </div>

      <div className="h-px bg-neutral-900 w-full my-6"></div>

      {/* Pricing & Condition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price (NGN)</label>
          <input 
            name="price_ngn" 
            type="number" 
            required 
            defaultValue={car?.price_ngn}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="250000000"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price (USD - Optional)</label>
          <input 
            name="price_usd" 
            type="number" 
            defaultValue={car?.price_usd}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white"
            placeholder="180000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Condition</label>
          <select 
            name="mileage_type" 
            required
            defaultValue={car?.mileage_type || "Foreign Used"}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="Brand New">Brand New</option>
            <option value="Foreign Used">Foreign Used</option>
            <option value="Locally Used">Locally Used</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</label>
          <select 
            name="status" 
            required
            defaultValue={car?.status || "Available"}
            className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition text-white appearance-none"
          >
            <option value="Available">Available</option>
            <option value="Pending Sale">Pending Sale</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="h-px bg-neutral-900 w-full my-6"></div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Vehicle Image</label>
        <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-8 text-center hover:bg-[#1a1a1a] transition-colors relative">
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            required={!car?.images?.length}
          />
          <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
            <UploadCloud className="w-8 h-8 text-[#D4AF37]" />
            <p className="text-sm text-neutral-300 font-medium">
              {fileName || (car?.images?.length ? "Upload new image to replace existing" : "Click or drag image here to upload")}
            </p>
            <p className="text-xs text-neutral-600">JPG, PNG or WebP (max 5MB)</p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button type="submit" className="w-full md:w-auto px-8 bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm">
          {car ? 'Update Vehicle Details' : 'Add Vehicle to Database'}
        </button>
      </div>
    </form>
  )
}
