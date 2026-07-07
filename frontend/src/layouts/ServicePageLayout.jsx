import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ServicePageLayout = ({ heroImage, title, subtitle, menuItems, children }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = menuItems.map(item => {
        const name = typeof item === 'object' ? item.name : item;
        return name.toLowerCase().replace(/\s+/g, '-');
      });

      let current = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 250px offset to trigger slightly before the section hits the very top
          if (rect.top <= 250) {
            current = id;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      } else if (!current && window.scrollY < 200) {
        // Clear active state if scrolled to very top above all sections
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems, activeSection]);

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen">

      <div className="w-full px-4 lg:px-8 pt-[80px] md:pt-[100px] pb-0">
        <div className="relative w-full aspect-video md:aspect-auto md:h-[55vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img loading="lazy" src={heroImage} alt={title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>

          <div className="absolute inset-4 md:inset-6 border border-white/20 z-10 pointer-events-none rounded-2xl"></div>

          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-playfair italic font-medium text-white tracking-normal mb-4 md:mb-8 drop-shadow-2xl whitespace-nowrap"
            >
              {title}<span className="text-[var(--color-primary)] font-sans not-italic">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-[10px] sm:text-xs md:text-base lg:text-lg text-gray-300 font-light tracking-[0.15em] lg:tracking-[0.2em] uppercase w-auto whitespace-nowrap text-center"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="sticky top-[62px] md:top-[80px] z-40 w-full px-2 sm:px-4 lg:px-8 py-4 -mt-8 md:-mt-[43px] flex justify-center">
        <div className="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full p-1 sm:p-2 flex justify-center items-center gap-1 sm:gap-2 overflow-hidden sm:overflow-x-auto hide-scrollbar w-auto max-w-full">
          {menuItems.map((item, index) => {
            const isObject = typeof item === 'object';
            const name = isObject ? item.name : item;
            const shortName = isObject ? (item.shortName || item.name) : item;
            const Icon = isObject ? item.icon : null;
            const id = name.toLowerCase().replace(/\s+/g, '-');
            const isActive = activeSection === id;

            return (
              <button
                key={index}
                onClick={() => {
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex justify-center items-center sm:gap-3 px-2.5 py-2 sm:px-5 sm:py-2.5 font-semibold text-[9px] min-[380px]:text-[10px] sm:text-sm uppercase tracking-wider sm:tracking-widest whitespace-nowrap rounded-full transition-all duration-300 group leading-none cursor-pointer ${isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-md sm:shadow-lg shadow-[var(--color-primary)]/30'
                  : 'text-gray-700 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/30'
                  }`}
              >
                {Icon && <Icon className={`hidden sm:block text-base transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />}
                <span className="mt-[1px]">
                  {shortName !== name ? (
                    <>
                      <span className="sm:hidden">{shortName}</span>
                      <span className="hidden sm:inline">{name}</span>
                    </>
                  ) : (
                    name
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full pt-2 pb-12 md:py-24">
        {children}
      </div>
    </div>
  );
};

export default ServicePageLayout;
