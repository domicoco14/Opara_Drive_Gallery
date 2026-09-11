'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep the preloader visible for 2 seconds to let the video buffer and build anticipation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0F172A] text-white overflow-hidden"
        >
          {/* Subtle gradient background pulse */}
          <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_50%)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight uppercase">
              Opara Drive <span className="text-[#D4AF37]">Gallery</span>
            </h1>
            
            <motion.div 
              className="w-32 h-[2px] bg-red-900/30 mt-6 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-[#D4AF37] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
