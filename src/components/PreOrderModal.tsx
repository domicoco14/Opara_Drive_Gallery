'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

export default function PreOrderModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get('preorder') === 'true';

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    budget: '',
    name: '',
    phone: '',
    additionalInfo: ''
  });

  const closeModal = () => {
    // Remove the ?preorder=true from the URL without scrolling to top
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('preorder');
    router.push(`/?${newParams.toString()}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*NEW PRE-ORDER REQUEST* 🚘
    
*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}

*Vehicle Details:*
Make: ${formData.make}
Model: ${formData.model}
Year: ${formData.year}
Estimated Budget: ${formData.budget}

*Additional Notes:*
${formData.additionalInfo || 'None'}`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/2349032903453?text=${encodedMessage}`, '_blank');
    
    // Close the modal
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200000] flex items-center justify-center p-4 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Pre-Order <span className="text-[#D4AF37]">Service</span></h2>
                <p className="text-neutral-400 text-sm mt-1">Tell us what you're looking for, and we'll source it for you.</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Car Make</label>
                  <input required name="make" value={formData.make} onChange={handleChange} placeholder="e.g. Mercedes-Benz" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Car Model</label>
                  <input required name="model" value={formData.model} onChange={handleChange} placeholder="e.g. GLE 53 AMG" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Preferred Year</label>
                  <input required name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2023" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Estimated Budget</label>
                  <input required name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. 150 Million Naira" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Your Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="+234..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Additional Notes (Optional)</label>
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Any specific color, interior preferences, or features?" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B89A30] text-black font-bold uppercase tracking-widest text-sm py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                <Send className="w-4 h-4" />
                Send Request to Dealership
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
