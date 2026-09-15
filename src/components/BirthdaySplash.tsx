'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function BirthdaySplash() {
  const [show, setShow] = useState(() => new Date() < new Date('2026-10-01T00:00:00'));
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run on client
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="birthday-splash-container"
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden"
          style={{ perspective: '2000px' }} // Add 3D perspective for the fold effect
          exit={{ transition: { staggerChildren: 0.1 } }}
        >
          {/* LEFT CURTAIN */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full z-0 border-r border-[#D4AF37]/20"
            style={{ 
              backgroundImage: 'url(/curtain.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              transformOrigin: 'left center',
            }}
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90, opacity: 0, transition: { duration: 3, ease: 'easeInOut' } }}
          />

          {/* RIGHT CURTAIN */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full z-0 border-l border-[#D4AF37]/20"
            style={{ 
              backgroundImage: 'url(/curtain.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              transformOrigin: 'right center',
            }}
            initial={{ rotateY: 0 }}
            exit={{ rotateY: -90, opacity: 0, transition: { duration: 3, ease: 'easeInOut' } }}
          />

          {/* CONTENT (Sits on top of the curtains) */}
          <motion.div
            className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.8 } }}
          >
            {windowSize.width > 0 && (
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={true}
                numberOfPieces={500}
                gravity={0.15}
                colors={['#D4AF37', '#ffffff', '#111111', '#FACC15']}
              />
            )}

            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="text-center px-6 max-w-3xl"
            >
              <h1 className="text-4xl md:text-7xl font-serif font-bold uppercase tracking-tight mb-4 text-white">
                Happy Birthday, Mr. Oluwadamilare! 🎉
              </h1>
              <p className="text-xl md:text-3xl font-light text-neutral-300 mb-8">
                Welcome to your new digital empire,
                <br />
                <span className="font-semibold text-[#D4AF37] block mt-2">Opara Drive Gallery</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(false)}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89A30] text-black rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Unveil Showroom
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
