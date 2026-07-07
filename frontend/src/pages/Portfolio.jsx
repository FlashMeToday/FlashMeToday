import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import wedding1 from '../assets/Images/Wedding/1.webp';
import wedding2 from '../assets/Images/Wedding/2.webp';
import wedding3 from '../assets/Images/Wedding/3.webp';
import wedding4 from '../assets/Images/Wedding/4.webp';
import wedding5 from '../assets/Images/Wedding/5.webp';
import wedding6 from '../assets/Images/Wedding/6.webp';

import baby1 from '../assets/Images/Occasions/BabyKids/1.webp';
import baby2 from '../assets/Images/Occasions/BabyKids/2.webp';
import baby3 from '../assets/Images/Occasions/BabyKids/3.webp';
import baby4 from '../assets/Images/Occasions/BabyKids/4.webp';
import baby5 from '../assets/Images/Occasions/BabyKids/5.webp';
import baby6 from '../assets/Images/Occasions/BabyKids/6.webp';

import food1 from '../assets/Images/Business/Food/1.webp';
import food2 from '../assets/Images/Business/Food/2.webp';
import food3 from '../assets/Images/Business/Food/3.webp';
import food4 from '../assets/Images/Business/Food/4.webp';
import food5 from '../assets/Images/Business/Food/5.webp';
import food6 from '../assets/Images/Business/Food/6.webp';

import int1 from '../assets/Images/Business/Interior/1.webp';
import int2 from '../assets/Images/Business/Interior/2.webp';
import int3 from '../assets/Images/Business/Interior/3.webp';
import int4 from '../assets/Images/Business/Interior/4.webp';
import int5 from '../assets/Images/Business/Interior/5.webp';
import int6 from '../assets/Images/Business/Interior/6.webp';

const categories = [
  { id: 'wedding', title: 'Wedding', images: [wedding1, wedding2, wedding3, wedding4, wedding5, wedding6], bookText: 'Book Wedding Shoot' },
  { id: 'baby-kids', title: 'Baby & Kids', images: [baby1, baby2, baby3, baby4, baby5, baby6], bookText: 'Book Baby & Kids Shoot' },
  { id: 'food', title: 'Food', images: [food1, food2, food3, food4, food5, food6], bookText: 'Book Food Shoot' },
  { id: 'interior', title: 'Interior', images: [int1, int2, int3, int4, int5, int6], bookText: 'Book Interior Shoot' }
];

const Portfolio = () => {
  return (
    <div className="relative bg-white min-h-screen font-sans selection:bg-[var(--color-primary)] selection:text-white">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#161430] to-[#0f172a] py-8 px-6 sm:px-10 sm:py-10 text-center flex flex-col items-center border border-white/5 shadow-2xl"
        >
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0"
          ></div>
          
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none z-0"
          ></motion.div>
          
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-32 -right-32 w-[22rem] h-[22rem] bg-[var(--color-primary)]/20 rounded-full blur-[90px] pointer-events-none z-0"
          ></motion.div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              <h3 className="text-gray-300 font-bold text-xs tracking-[0.15em] uppercase mt-[1px]">
                Our Best Work
              </h3>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              Our <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Portfolio.
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
              Explore our handpicked portfolio of stunning moments captured beautifully in time.
            </p>
          </div>
        </motion.div>
      </div>
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {categories.map((category, index) => (
          <div key={category.id} className="mb-24 last:mb-0">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-100 pb-6">
               <div>
                 <h3 className="text-3xl font-black text-gray-900 tracking-tight">{category.title}</h3>
                 <p className="text-gray-500 font-medium mt-2">Stunning moments captured for {category.title}.</p>
               </div>
               <Link to={`/booking?plan=${encodeURIComponent(category.title)}`} className="hidden md:inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-opacity-90 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_14px_0_rgba(107,33,168,0.39)] hover:shadow-[0_6px_20px_rgba(107,33,168,0.23)] hover:-translate-y-0.5 shrink-0">
                 {category.bookText}
               </Link>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.images.map((img, idx) => (
                <motion.div 
                  key={`${category.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-gray-100 rounded-3xl aspect-[4/5] relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <img loading="lazy" src={img} alt={`${category.title} Portfolio`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <h4 className="text-white font-bold text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{category.title} {idx + 1}</h4>
                    <p className="text-white/80 text-sm font-medium mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">Beautiful moments</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 md:hidden">
               <Link to={`/booking?plan=${encodeURIComponent(category.title)}`} className="flex w-full items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-opacity-90 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_14px_0_rgba(107,33,168,0.39)]">
                 {category.bookText}
               </Link>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
};

export default Portfolio;
