import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Phone, Mail, SlidersHorizontal, ChevronRight, MessageCircle, Info, User } from 'lucide-react'
import LightboxModal from './LightboxModal'
import PremiumHero from './PremiumHero'
import Preloader from '@/components/Preloader'
import BirthdaySplash from '@/components/BirthdaySplash'
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper'
import MagneticWrapper from '@/components/MagneticWrapper'
import PreOrderModal from '@/components/PreOrderModal'

export const metadata = {
  title: "Opara Drive Gallery | Premium Digital Showroom",
  description: "High-end digital showroom and transaction platform for Opara Drive Gallery in 184 Iju Road, Fagba, Lagos, Nigeria 100001.",
}

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Construct query dynamically based on searchParams
  let query = supabase.from('cars').select('*')

  if (searchParams.make) {
    query = query.ilike('make', `%${searchParams.make}%`)
  }
  if (searchParams.body_type) {
    query = query.ilike('body_type', `%${searchParams.body_type}%`)
  }
  if (searchParams.mileage_type) {
    query = query.eq('mileage_type', searchParams.mileage_type)
  }

  // Order by newest first
  query = query.order('created_at', { ascending: false })

  let { data: dbCars, error } = await query

  let cars = dbCars || []

  const phoneNumber = "2349032903453"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-[#D4AF37] selection:text-white relative">
      <BirthdaySplash />
      <PreOrderModal />
      <Preloader />
      {/* Background Glowing Orbs for Glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#D4AF37]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#D4AF37]/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <PremiumHero searchParams={searchParams} />

      {/* Main Content */}
      <main id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">



          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight">Available Vehicles</h2>
                <p className="text-neutral-500 text-sm mt-1">{cars?.length || 0} vehicles match your criteria</p>
              </div>
            </div>

            {error && cars.length === 0 && (
              <div className="p-6 bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-[#D4AF37] rounded-2xl flex items-start gap-4 mb-8">
                <Info className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Error fetching inventory</h3>
                  <p className="text-sm opacity-80">{error.message}</p>
                  <p className="text-xs opacity-60 mt-2">Did you add your Supabase connection details to `.env.local` and create the `cars` table?</p>
                </div>
              </div>
            )}

            {!error && (!cars || cars.length === 0) && (
              <div className="py-24 text-center border border-neutral-800 border-dashed rounded-2xl bg-neutral-900/30 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-neutral-600">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-neutral-400 font-medium">No vehicles match your exact search.</p>
                <Link href="/" className="text-[#D4AF37] hover:text-red-400 font-medium text-sm mt-4 inline-block transition">
                  View All Inventory
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars?.map((car) => {
                const messageText = `Hi Opara Drive Gallery, I'm interested in the ${car.year} ${car.make} ${car.model} listed on your site.${car.images?.[0] ? `\n\nVehicle Image: ${car.images[0]}` : ''}`
                const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`

                return (
                  <ScrollRevealWrapper key={car.id} delay={(cars.indexOf(car) % 6) * 0.1}>
                    <div className="h-full group bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:bg-[#1E293B]/80 hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-md hover:shadow-2xl hover:shadow-[#D4AF37]/20 cursor-pointer">
                      <div className="relative h-56 bg-neutral-900/50 overflow-hidden">
                        {car.images?.[0] ? (
                          <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-neutral-600 bg-neutral-900">
                            <Image src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" alt="Placeholder" fill className="object-cover opacity-20 grayscale" />
                            <span className="relative z-10 font-medium text-xs tracking-widest uppercase">No Image</span>
                          </div>
                        )}
                        {/* Gradient Overlay for better tag readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none"></div>

                        <div className="absolute top-4 left-4 flex gap-2 z-20">
                          <span className="bg-neutral-950/80 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-md border border-neutral-800 shadow-lg">
                            {car.mileage_type}
                          </span>
                          {car.status === 'Available' && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-500/30 shadow-lg">
                              Available
                            </span>
                          )}
                          {car.status === 'Sold' && (
                            <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#D4AF37]/30 shadow-lg">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold uppercase tracking-tight mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-neutral-400 text-sm font-medium">{car.body_type}</p>
                        </div>

                        <div className="mt-6 mb-6">
                          <div className="text-2xl font-light tracking-tight">
                            <span className="text-neutral-500 text-lg mr-1 font-medium">₦</span>
                            {Number(car.price_ngn).toLocaleString()}
                          </div>
                          {car.price_usd && (
                            <div className="text-xs text-neutral-500 font-medium mt-1">
                              ≈ ${Number(car.price_usd).toLocaleString()} USD
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/5 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 py-3 rounded-xl font-medium text-sm border border-white/10 backdrop-blur-md hover:border-[#25D366]/30">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                          <Link href={`/?gallery=${car.id}`} scroll={false} className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B89A30] text-white transition-all duration-300 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40">
                            View Gallery
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollRevealWrapper>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Concierge */}
      <MagneticWrapper className="fixed bottom-6 right-6 z-50">
        <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group">
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] border-2 border-[#25D366]"></span>
          </span>
        </a>
      </MagneticWrapper>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-white/10 bg-neutral-950/60 backdrop-blur-3xl overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tight uppercase inline-block">
                Opara Drive <span className="text-[#D4AF37]">Gallery</span>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                Lagos' most exclusive destination for luxury, performance, and imported vehicles. Drive your dream today.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/opara_drive_gallery/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="https://www.facebook.com/share/1F3Yp9c8pe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://vm.tiktok.com/ZS9SuxCf2PVJp-RxUUk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Showroom</h4>
              <ul className="space-y-3">
                <li><Link href="/#inventory" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> All Inventory</Link></li>
                <li><Link href="/?condition=brand-new#inventory" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Brand New Cars</Link></li>
                <li><Link href="/?condition=foreign-used#inventory" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Foreign Used Cars</Link></li>
                <li><Link href="?preorder=true" scroll={false} className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Pre-Order Service</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Support</h4>
              <ul className="space-y-3">
                <li><Link href="#about" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> About Us</Link></li>
                <li><a href="https://wa.me/2349032903453?text=Hello%20Opara%20Drive%20Gallery,%20I%20would%20like%20to%20inquire%20about%20your%20car%20financing%20options." target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Financing Options</a></li>
                <li><Link href="/terms" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Terms of Service</Link></li>
                <li><Link href="/admin" className="text-neutral-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Admin Login</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-neutral-400 text-sm">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>184 Iju Road, Fagba, Lagos, Nigeria 100001</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-400 text-sm">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <a href="mailto:opara_drive_gallery" className="hover:text-white transition-colors">opara_drive_gallery@gmail.com</a>
                </li>
                <li className="flex items-center gap-3 text-neutral-400 text-sm">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <a href={`https://wa.me/2349032903453`} className="hover:text-white transition-colors">+234 903 290 3453</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <p className="text-neutral-500 text-sm">
                © {new Date().getFullYear()} OPARA ELITE LINKS AND VENTURES. All rights reserved.
              </p>
              <span className="hidden md:block text-neutral-800">•</span>
              <p className="text-neutral-500 text-sm">
                Developed by <a href="https://wa.me/2347014098126" target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-300 hover:text-white transition-colors">EDGE TECHNOLOGIES</a> <span className="text-xs ml-1">(+234 701 409 8126)</span>
              </p>
            </div>
            <div className="flex gap-4 text-sm font-medium text-neutral-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal Rendering */}
      {searchParams.gallery && (
        <LightboxModal car={cars.find((c: any) => c.id === searchParams.gallery) || null} />
      )}
    </div>
  )
}
