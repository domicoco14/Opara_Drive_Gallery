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
          key="birthday-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-md text-white overflow-hidden"
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
            <h1 className="text-4xl md:text-7xl font-serif font-bold uppercase tracking-tight mb-4">
              Happy Birthday, Mr Opara! 🎉
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
              className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89A30] rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Enter Showroom
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
