import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Mail, Award, ShieldCheck, Car, Sparkles, MessageCircle } from 'lucide-react'

export const metadata = {
  title: "About Us | Opara Drive Gallery",
  description: "Learn about Opara Drive Gallery (Opara Elite Links and Ventures) — Lagos' premier luxury automotive destination in 184 Iju Road, Fagba, Lagos.",
}

export default function AboutPage() {
  const phoneNumber = "2349032903453"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-[#D4AF37] selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#D4AF37]/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#D4AF37]/10 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      {/* Floating Glass Navbar */}
      <header className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-[16px] px-4 md:px-6 py-2 flex items-center justify-between"
        style={{
          background: 'rgba(10, 10, 10, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Opara Drive Gallery Logo" 
            width={160} 
            height={50} 
            className="h-7 md:h-9 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            priority
          />
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Back to Showroom</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3 block">
            Official Brand Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight text-white mb-4">
            About Opara Drive Gallery
          </h1>
          <p className="text-xl md:text-2xl text-[#D4AF37] italic font-serif mb-6">
            ...driven by excellence...
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-8"></div>
          <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed">
            Operating under <span className="font-semibold text-white">OPARA ELITE LINKS AND VENTURES</span>, Opara Drive Gallery stands as Lagos’ premier destination for high-end luxury, performance, and custom-imported automobiles.
          </p>
        </div>

        {/* Story & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6">
                <Car className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4 uppercase tracking-wide">
                Our Showroom Experience
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light mb-4">
                Located strategically at <span className="text-white font-medium">184 Iju Road, Fagba, Lagos, Nigeria 100001</span>, our physical showroom houses a carefully curated fleet of brand-new luxury SUVs, sleek sedans, and high-spec foreign used vehicles.
              </p>
              <p className="text-neutral-400 leading-relaxed font-light">
                Every vehicle in our collection undergoes rigorous verification to guarantee pristine mechanical condition, verified documentation, and unmatched aesthetic brilliance before it reaches our showroom floor.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4 uppercase tracking-wide">
                Bespoke Pre-Order & Sourcing
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light mb-4">
                If your exact dream specification isn't currently listed in our inventory, our global vehicle sourcing network ensures we locate, inspect, and import your desired vehicle directly to your doorstep.
              </p>
              <p className="text-neutral-400 leading-relaxed font-light">
                From luxury Mercedes-Benz AMG units to Range Rover Vogues, Lexus LX series, and custom Toyota builds, we handle all logistics, customs clearance, and delivery with total transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-wider mb-2">
              Why Choose Opara Drive Gallery
            </h2>
            <p className="text-neutral-400 text-sm">The pillars that define our commitment to automotive perfection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 text-center hover:bg-neutral-900/80 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">Uncompromising Quality</h4>
              <p className="text-neutral-400 text-sm font-light">Only pristine, hand-selected vehicles pass our stringent evaluation standards.</p>
            </div>

            <div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 text-center hover:bg-neutral-900/80 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">Complete Integrity</h4>
              <p className="text-neutral-400 text-sm font-light">Backed by Opara Elite Links and Ventures with verified paperwork and clear history.</p>
            </div>

            <div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 text-center hover:bg-neutral-900/80 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">White-Glove Support</h4>
              <p className="text-neutral-400 text-sm font-light">Dedicated sales consultants ready to guide your purchase seamlessly via WhatsApp or call.</p>
            </div>
          </div>
        </div>

        {/* Location & Contact Section */}
        <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-[#D4AF37]/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2 block">Visit Us Today</span>
              <h3 className="text-3xl font-serif font-bold text-white mb-6 uppercase">
                Showroom Location & Contact
              </h3>
              
              <div className="space-y-4 text-neutral-300 text-sm md:text-base font-light">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white block">Address</span>
                    <span>184 Iju Road, Fagba, Lagos, Nigeria 100001</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Phone / WhatsApp</span>
                    <span>+234 903 290 3453</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Legal Entity</span>
                    <span>OPARA ELITE LINKS AND VENTURES</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row md:flex-col justify-center">
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello Opara Drive Gallery, I'd like to inquire about your available vehicles.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-widest py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Car className="w-5 h-5 text-[#D4AF37]" />
                <span>Browse Inventory</span>
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} OPARA ELITE LINKS AND VENTURES. All rights reserved.</p>
      </footer>
    </div>
  )
}
