import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import preWedding from '../assets/Images/Occasions/pre-wedding.png';
import wedding from '../assets/Images/Occasions/wedding.png';
import baby from '../assets/Images/Occasions/baby-kids.png';
import maternity from '../assets/Images/Occasions/maternity.png';
import parties from '../assets/Images/Occasions/parties.png';
import vacation from '../assets/Images/Occasions/vacation.png';

const occasionsData = [
  {
    id: 1,
    title: 'Pre Wedding',
    subtitle: 'Where love meets timeless frames.',
    image: preWedding,
    link: '/pre-wedding'
  },
  {
    id: 2,
    title: 'Wedding',
    subtitle: 'Preserve your most precious moments for eternity.',
    image: wedding,
    link: '/wedding'
  },
  {
    id: 3,
    title: 'Baby & Kids',
    subtitle: 'Kids bring moments you’ll want to hold onto forever.',
    image: baby,
    link: '/baby-and-kids'
  },
  {
    id: 4,
    title: 'Maternity',
    subtitle: 'Embrace every motherhood moment in beautiful frames.',
    image: maternity,
    link: '/maternity'
  },
  {
    id: 5,
    title: 'Parties',
    subtitle: "Celebrate your parties night's in frames that last forever!",
    image: parties,
    link: '/parties'
  },
  {
    id: 6,
    title: 'Vacation',
    subtitle: "Don't just travel, treasure it forever!",
    image: vacation,
    link: '/vacations'
  }
];

const OccasionsShoots = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      // Get exact width of a single card
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      // Calculate gap (now 15px as requested)
      const gap = 15;
      const scrollAmount = cardWidth + gap;
        
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full pt-8 pb-0 lg:pt-10 lg:pb-0 bg-[#fcfcff] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-[15px] mb-6 lg:mb-8 text-center flex flex-col items-center justify-center">
        
        {/* Modern Pill Badge Subtitle */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 mb-3 shadow-sm whitespace-nowrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
          </span>
          <h3 className="text-[var(--color-primary)] font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase mt-[1px]">
            Our Work Speaks Louder Than Words
          </h3>
        </div>
        
        {/* Massive Modern Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-gray-900 tracking-tighter leading-[1.1]">
          Occasions <span className="text-[var(--color-primary)]">Shoots</span>
        </h2>
        
        <p className="text-gray-500 max-w-2xl text-sm lg:text-base mt-2 font-medium">
          Explore our handpicked portfolio of stunning moments captured beautifully in time.
        </p>
      </div>

      <div className="relative w-full max-w-[1550px] mx-auto px-[15px]">
        
        {/* Left Nav Button */}
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-4 xl:left-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 text-gray-700 hover:text-[var(--color-primary)] hover:bg-white hover:scale-110 hover:shadow-[0_8px_30px_rgba(139,38,217,0.15)] transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Slider Container */}
        <div 
          ref={sliderRef}
          onScroll={updateScrollButtons}
          className="flex overflow-x-auto snap-x snap-mandatory gap-[15px] hide-scrollbar pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {occasionsData.map((item) => (
            <Link 
              to={item.link}
              key={item.id} 
              className="block relative snap-start shrink-0 w-full lg:w-[calc(25%-11.25px)] aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-700"
            >
              {/* Dramatic Cinematic Image Zoom */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
              />
              
              {/* Cinematic Dark Overlay: 100% on mobile, 60% on desktop (intensifies on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 lg:opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Dramatic Text Reveal */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end text-center z-10 overflow-hidden">
                <h4 className="text-2xl lg:text-3xl font-serif text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] transform transition-transform duration-700 ease-out lg:translate-y-8 group-hover:translate-y-0">
                  {item.title}
                </h4>
                <p className="text-gray-200 text-sm lg:text-[15px] font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-100 lg:opacity-0 transform transition-all duration-700 ease-out lg:translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 delay-75 h-10 lg:h-12 flex items-start justify-center">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Nav Button */}
        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-4 xl:right-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 text-gray-700 hover:text-[var(--color-primary)] hover:bg-white hover:scale-110 hover:shadow-[0_8px_30px_rgba(139,38,217,0.15)] transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <FaArrowRight />
          </button>
        )}

        {/* Mobile Right Nav Button */}
        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-gray-800 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <FaArrowRight className="text-sm" />
          </button>
        )}

        {/* Mobile Left Nav Button */}
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="lg:hidden absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-gray-800 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-sm" />
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default OccasionsShoots;
