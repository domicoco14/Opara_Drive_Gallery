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
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
          // Ensure the parent waits for the 6 second curtain animation before removing from DOM
          exit={{ transition: { staggerChildren: 0 } }}
        >
          {/* LEFT CURTAIN */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full z-0 border-r-2 border-black/50 shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
            style={{ 
              backgroundImage: 'url(/curtain.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 1 }}
            exit={{ 
              scaleX: 0, 
              opacity: [1, 1, 1, 0], // Stay fully opaque until the very end of the fold
              transition: { duration: 6, ease: [0.45, 0, 0.15, 1], times: [0, 0.4, 0.8, 1] } 
            }}
          />

          {/* RIGHT CURTAIN */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full z-0 border-l-2 border-black/50 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            style={{ 
              backgroundImage: 'url(/curtain.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              transformOrigin: 'right center',
            }}
            initial={{ scaleX: 1 }}
            exit={{ 
              scaleX: 0,
              opacity: [1, 1, 1, 0],
              transition: { duration: 6, ease: [0.45, 0, 0.15, 1], times: [0, 0.4, 0.8, 1] } 
            }}
          />

          {/* CONTENT (Sits on top of the curtains) */}
          <motion.div
            className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-black/40"
            // Removed the blur, just a clean, quick fade out so the user can watch the 6-second curtain fold
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
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
              <h1 className="text-4xl md:text-7xl font-serif font-bold uppercase tracking-tight mb-4 text-white drop-shadow-2xl">
                Happy Birthday, Mr. Oluwadamilare! 🎉
              </h1>
              <p className="text-xl md:text-3xl font-light text-neutral-200 mb-8 drop-shadow-lg">
                Welcome to your new digital empire,
                <br />
                <span className="font-semibold text-[#D4AF37] block mt-2">Opara Drive Gallery</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(false)}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89A30] text-black rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_30px_rgba(212,175,55,0.6)]"
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
