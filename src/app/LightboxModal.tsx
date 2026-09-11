'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'

export default function LightboxModal({ car }: { car: any }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    // Construct new URL without the 'gallery' parameter
    const params = new URLSearchParams(searchParams.toString())
    params.delete('gallery')
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  const images: string[] = car?.images || []

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!car) return null

  const phoneNumber = "2349032903453"
  const waMessage = `Hello Opara Drive Gallery, I am interested in purchasing the ${car.year} ${car.make} ${car.model}. Is it still available?${car.images?.[0] ? `\n\nVehicle Image: ${car.images[0]}` : ''}`
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={handleClose}
    >
      {/* Top Header / Close Button */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="text-white drop-shadow-md pointer-events-auto max-w-[70%]">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{car.year} {car.make} {car.model}</h2>
          <p className="text-[#D4AF37] font-medium tracking-widest uppercase text-sm mt-1">₦{Number(car.price_ngn).toLocaleString()}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors pointer-events-auto"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Image Area */}
      {images.length > 0 ? (
        <div 
          className="relative w-full h-full flex items-center justify-center px-4 md:px-20"
          onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
        >
          {/* Blurred Background Layer for ambient effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <Image 
              src={images[selectedIndex]} 
              alt="Background blur"
              fill
              sizes="100vw"
              className="object-cover blur-[100px] opacity-30 scale-110"
            />
          </div>

          <div className="relative w-full h-[80vh] flex items-center justify-center z-10">
            <Image 
              src={images[selectedIndex]} 
              alt={`Gallery image ${selectedIndex + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain drop-shadow-2xl"
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 z-30 shadow-2xl"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 z-30 shadow-2xl"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10 z-30 tracking-widest shadow-xl">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      ) : (
        <div className="text-white/50 text-xl font-medium tracking-widest uppercase">No Images Available</div>
      )}

      {/* Floating Action Button inside Modal */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-300 px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-105 pointer-events-auto text-sm md:text-base tracking-wider uppercase"
        >
          <MessageCircle className="w-6 h-6" />
          Secure via WhatsApp
        </a>
      </div>
    </div>
  )
}
