import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import image1 from '../assets/Images/Slider/image_1.png';
import image2 from '../assets/Images/Slider/image_2.png';
import image3 from '../assets/Images/Slider/image_3.png';
import image4 from '../assets/Images/Slider/image_4.png';

const sliderImages = [image1, image2, image3, image4];

const HeroContent = ({ isMobile }) => {
  return (
    <div className={`relative z-10 w-full flex flex-col items-center text-center px-0 lg:px-4 ${!isMobile ? 'max-w-5xl mx-auto' : 'py-0'}`}>
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-md border shadow-sm mb-4 lg:mb-8 w-max mx-auto ${
          isMobile ? 'bg-white border-gray-300' : 'bg-black/30 border-white/10'
        }`}
      >
        <span className={`flex text-sm gap-0.5 ${isMobile ? 'text-yellow-500' : 'text-yellow-400'}`}>
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </span>
        <span className={`text-xs font-bold tracking-widest uppercase ${isMobile ? 'text-gray-800' : 'text-white'}`}>
          Premium Studio
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`text-[11vw] sm:text-6xl lg:text-[6rem] font-extrabold tracking-tighter leading-[1.02] drop-shadow-md ${
          isMobile ? 'text-gray-900' : 'text-white'
        }`}
      >
        <span className="block whitespace-nowrap lg:inline lg:whitespace-normal">Capture Today.</span>
        <br className="hidden lg:block" />
        <span className={`block whitespace-nowrap lg:inline lg:whitespace-normal text-[var(--color-primary)] ${isMobile ? 'drop-shadow-sm' : 'drop-shadow-[0_0_15px_rgba(139,38,217,0.4)]'}`}>
          Cherish Forever
        </span>
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-4 lg:mt-8 text-base sm:text-lg xl:text-2xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md px-4 lg:px-0 ${
          isMobile ? 'text-gray-600' : 'text-gray-200'
        }`}
      >
        From stunning weddings to premium real estate, we bring your most important moments to life with absolute elegance.
      </motion.p>
      
      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 lg:mt-12 flex flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-5 w-full px-4 lg:px-0"
      >
        <button className={`relative overflow-hidden group flex-1 lg:flex-none lg:w-[220px] h-[48px] lg:h-[56px] flex items-center justify-center text-white text-[12px] sm:text-[15px] font-bold rounded-full cursor-pointer transition-all duration-500 ${
          isMobile 
            ? 'bg-[var(--color-primary)] shadow-none' 
            : 'bg-gradient-to-br from-[var(--color-primary)] to-[#591494] shadow-none hover:shadow-[0_0_10px_rgba(139,38,217,0.6)]'
        }`}>
          <span className="relative z-10 flex items-center gap-1.5 lg:gap-2">
            <FaPhone className="text-xs lg:text-sm scale-x-[-1]" /> Talk to an Expert
          </span>
          <div className="hidden lg:block absolute inset-0 border border-t-white/40 border-b-black/20 border-x-white/10 rounded-full pointer-events-none mix-blend-overlay"></div>
        </button>
        
        <button className={`relative group flex-1 lg:flex-none lg:w-[220px] h-[48px] lg:h-[56px] flex items-center justify-center backdrop-blur-2xl text-[12px] sm:text-[15px] font-bold rounded-full cursor-pointer transition-all duration-500 ${
          isMobile 
            ? 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md' 
            : 'bg-transparent border border-white text-white hover:bg-white/10 shadow-none hover:shadow-[0_0_10px_rgba(255,255,255,0.4)]'
        }`}>
          <span className="relative z-10 flex items-center gap-1.5 lg:gap-2">
            <FaCalendarAlt className="text-xs lg:text-sm" /> Book a Shoot
          </span>
        </button>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-auto lg:h-[100vh] pt-[87px] lg:pt-[85px] px-3 pb-3 flex flex-col items-center justify-start lg:justify-center lg:items-stretch bg-white lg:flex-row">
      
      {/* MOBILE ONLY: Text Content Block (Flow block) */}
      <div className="relative z-20 flex flex-col lg:hidden justify-center items-center text-center w-full mb-3 pt-1 pb-4 overflow-hidden bg-white">
        
        {/* Large Purple Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(var(--color-primary) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--color-primary) 1.5px, transparent 1.5px)',
            backgroundSize: '40px 40px',
            backgroundPosition: 'center top'
          }}
        ></div>
        
        {/* Subtle Fade at top and bottom so the grid blends into the white background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>

        <HeroContent isMobile={true} />
      </div>

      {/* Slider Container */}
      <div className="relative w-full aspect-video lg:aspect-auto lg:h-full lg:flex-1 rounded-3xl overflow-hidden bg-[#080112] group">
        
        {/* 1. Background Images with Ken Burns */}
        <AnimatePresence>
          <motion.img
            key={currentSlide}
            src={sliderImages[currentSlide]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 7, ease: "linear" } 
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            alt="FlashMeToday Premium Photography"
          />
        </AnimatePresence>

        {/* 2. Thin Black Layer + Gradients for Readability */}
        <div className="hidden lg:block absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none"></div>

        {/* 3. Desktop Only: Text Overlay */}
        <div className="hidden lg:flex absolute inset-0 z-20 flex-col justify-center items-center pointer-events-none">
          <div className="pointer-events-auto w-full">
            <HeroContent isMobile={false} />
          </div>
        </div>

        {/* 4. Slider Indicators inside the frame */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:bottom-8 lg:left-auto lg:translate-x-0 lg:right-8 flex gap-2 z-30">
          {sliderImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? 'w-10 h-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Inner Border glow for framing */}
        <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none z-20 mix-blend-overlay"></div>
      </div>
    </section>
  );
};

export default Hero;
