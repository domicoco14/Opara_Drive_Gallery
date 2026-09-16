'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Search, MessageCircle, User } from 'lucide-react'

// Custom hook for mouse parallax
function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth the raw mouse values
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  // Transform into tiny, subtle parallax movements (5-10px range)
  const xBackground = useTransform(smoothX, [-0.5, 0.5], [-10, 10])
  const yBackground = useTransform(smoothY, [-0.5, 0.5], [-10, 10])
  
  const xForeground = useTransform(smoothX, [-0.5, 0.5], [10, -10])
  const yForeground = useTransform(smoothY, [-0.5, 0.5], [10, -10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -0.5 to +0.5 range based on screen size
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return { xBackground, yBackground, xForeground, yForeground }
}

export default function PremiumHero({ searchParams }: { searchParams: any }) {
  const { xBackground, yBackground, xForeground, yForeground } = useMouseParallax()
  const phoneNumber = "2349032903453"

  // Animation orchestration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  }

  const itemFadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeOut" as const } 
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes liquidSweep {
          0% { background-position: 200% center; }
          20% { background-position: -200% center; }
          100% { background-position: -200% center; }
        }
        .animate-sweep {
          background-size: 200% auto;
          animation: liquidSweep 3s linear infinite;
        }
      `}</style>

      {/* Floating Liquid Glass Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-[20px] px-4 md:px-6 py-3 flex items-center justify-between"
        style={{
          background: 'rgba(10, 10, 10, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.jpg" 
            alt="Opara Drive Gallery Logo" 
            width={180} 
            height={60} 
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {/* Active item with subtle glow */}
          <Link href="#inventory" className="text-sm font-medium text-white transition-colors duration-300 relative group">
            Inventory
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100" />
          </Link>
          <Link href="?preorder=true" scroll={false} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">Source My Car</Link>
          <Link href="#about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">About</Link>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300" aria-label="Admin Dashboard">
            <User className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <a 
            href={`https://wa.me/${phoneNumber}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 text-xs md:text-sm font-medium bg-[#D4AF37] text-white px-4 md:px-5 py-2.5 rounded-full transition-all duration-400 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-[2px]"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
            <span className="hidden sm:inline">Contact Us</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </div>
      </motion.nav>

      {/* Cinematic Hero Environment */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F172A]">
        
        {/* Parallax Local Background Video */}
        <motion.div 
          className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
          style={{ x: xBackground, y: yBackground }}
        >
          {/* Desktop Video (Horizontal) */}
          <video 
            src="/hero-video.mp4"
            autoPlay 
            muted 
            loop 
            playsInline
            className="hidden md:block w-full h-full object-cover object-center opacity-70"
          />
          {/* Mobile Video (Vertical) */}
          <video 
            src="/hero-video-mobile.mp4"
            autoPlay 
            muted 
            loop 
            playsInline
            className="block md:hidden w-full h-full object-cover object-center opacity-70"
          />
        </motion.div>

        {/* Cinematic Lighting Layers */}
        {/* 1. Soft Top Gradient for Navbar legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-transparent to-transparent z-10 h-1/2 pointer-events-none" />
        
        {/* 2. Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent z-10 pointer-events-none" />
        
        {/* 3. Radial Spotlight over the car (assuming center focus) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] mix-blend-overlay z-10 pointer-events-none" />

        {/* 4. Subtle Ambient Red Glow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#D4AF37]/10 blur-[120px] rounded-full z-10 pointer-events-none" 
        />

        {/* Foreground Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-20 text-center px-4 max-w-6xl mx-auto mt-20 w-full"
          style={{ x: xForeground, y: yForeground }}
        >
          <motion.h1 
            variants={itemFadeUp}
            className="text-[14vw] sm:text-7xl md:text-[7.5rem] lg:text-[8rem] font-serif font-bold tracking-tight mb-4 md:mb-6 uppercase leading-[1.05] md:leading-[0.9] text-white drop-shadow-2xl"
          >
            OPARA DRIVE <br className="md:hidden" />
            GALLERY
          </motion.h1>

          <motion.p 
            variants={itemFadeUp}
            className="text-xl md:text-3xl text-[#D4AF37] italic font-serif mb-6 md:mb-10 drop-shadow-md"
          >
            ...driven by excellence...
          </motion.p>

          <motion.p 
            variants={itemFadeIn}
            className="text-lg md:text-2xl text-neutral-300 mb-16 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md"
          >
            Lagos' premier destination for luxury, performance, and imported vehicles.
          </motion.p>
          
          {/* Premium Liquid Glass Search Bar */}
          <motion.form 
            variants={itemFadeUp}
            className="group max-w-xl mx-auto flex items-center p-2 rounded-full transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
            }}
            action="/" 
            method="GET"
          >
            <Search className="w-5 h-5 text-neutral-500 ml-3 md:ml-5 mr-2 md:mr-3 transition-colors duration-300 group-focus-within:text-white shrink-0" />
            
            <input 
              name="make"
              type="text" 
              placeholder="Search by make..." 
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-neutral-500/80 py-3 text-sm md:text-base font-medium transition-colors"
              defaultValue={searchParams?.make || ''}
            />
            
            {/* Preserve other search params if present */}
            {searchParams?.body_type && <input type="hidden" name="body_type" value={searchParams.body_type} />}
            {searchParams?.mileage_type && <input type="hidden" name="mileage_type" value={searchParams.mileage_type} />}
            
            <button 
              type="submit" 
              className="bg-[#D4AF37] text-white px-5 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-400 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-[2px] shrink-0"
            >
              Search
            </button>
          </motion.form>
        </motion.div>
      </section>
    </>
  )
}
