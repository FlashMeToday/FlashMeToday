import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const TYPEWRITER_WORDS = ["every second.", "every moment.", "always ready."];

const NewIdea = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100;
    const currentWord = TYPEWRITER_WORDS[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      } else {
        const nextText = isDeleting 
          ? currentWord.substring(0, currentText.length - 1)
          : currentWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative w-full flex flex-col justify-center items-center text-center py-[30px] px-4 sm:px-8 overflow-hidden bg-[#0a0216]">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop" 
          alt="Creative photoshoot ideas" 
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>

      {/* Cinematic Dark Overlay Gradients for Text Readability */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0216] via-[#0a0216]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Content Area */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Glowing Pulse Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 lg:gap-3 px-5 sm:px-6 py-2.5 rounded-full border border-[var(--color-primary)]/40 bg-black/40 backdrop-blur-md mb-3 lg:mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
           <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_10px_rgba(139,38,217,1)]"></span>
           <span className="text-white/90 text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
             Perfect Frames
           </span>
        </motion.div>
        
        {/* Massive Cinematic Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-tighter leading-[1.05] drop-shadow-xl w-full"
        >
          {/* Mobile Layout */}
          <div className="sm:hidden flex flex-col items-center justify-center w-full">
            <span className="whitespace-nowrap">New ideas,</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[var(--color-primary)] to-purple-500 font-sans font-black italic whitespace-nowrap mt-1">
              {currentText}
              <span className="inline-block w-[3px] h-[0.8em] bg-[var(--color-primary)] ml-1 translate-y-[0.1em] animate-pulse rounded-full"></span>
            </span>
          </div>

          {/* Desktop Layout (Split 50/50 strictly by screen percentage to prevent flex-shrink jitter) */}
          <div className="hidden sm:flex flex-row w-full">
            <div className="w-1/2 flex justify-end pr-2 lg:pr-3">
              <span className="whitespace-nowrap">New ideas,</span>
            </div>
            <div className="w-1/2 flex justify-start pl-2 lg:pl-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[var(--color-primary)] to-purple-500 font-sans font-black italic whitespace-nowrap">
                {currentText}
                <span className="inline-block w-[3px] h-[0.8em] bg-[var(--color-primary)] ml-1 translate-y-[0.1em] animate-pulse rounded-full"></span>
              </span>
            </div>
          </div>
        </motion.h2>
        
        {/* Premium Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-200 text-sm sm:text-base lg:text-[19px] font-light leading-relaxed mb-10 max-w-2xl drop-shadow-md"
        >
          Inspiration never stops flowing. We've curated trending poses, creative fits, and stunning locations to flawlessly bring your vision to life.
        </motion.p>
        
        {/* Elevated Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button className="group relative flex justify-center items-center gap-3 px-8 sm:px-10 py-4 lg:py-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#591494] text-white font-bold text-sm lg:text-[15px] tracking-wide transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,38,217,0.7)] hover:scale-105 border border-white/20 overflow-hidden cursor-pointer">
            <span className="relative z-10">Your Next Photoshoot Starts Here</span>
            <FaArrowRight className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Glass Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default NewIdea;
