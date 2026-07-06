import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import food from '../assets/Images/Business/food.png';
import interior from '../assets/Images/Business/interior.png';
import product from '../assets/Images/Business/product-shoot.png';
import corporate from '../assets/Images/Business/corporate-events.png';
import brand from '../assets/Images/Business/brand-video.png';
import profile from '../assets/Images/Business/profile-headshot.png';

const businessData = [
  {
    id: 1,
    title: 'Food',
    subtitle: 'When frames turn into flavors.',
    image: food,
    link: '/food'
  },
  {
    id: 2,
    title: 'Interior',
    subtitle: 'Make them feel at home before they enter the door.',
    image: interior,
    link: '/interior'
  },
  {
    id: 3,
    title: 'Product Shoot',
    subtitle: 'Visibility drives sales, and we make your brand look stunning.',
    image: product,
    link: '/product-shoot'
  },
  {
    id: 4,
    title: 'Events',
    subtitle: 'Take your event to audiences, near or far.',
    image: corporate,
    link: '/corporate-events'
  },
  {
    id: 5,
    title: 'Brand Video',
    subtitle: 'Communicate your brand story with powerful visuals.',
    image: brand,
    link: '/brand-video'
  },
  {
    id: 6,
    title: 'Profile & Headshots',
    subtitle: 'Make your first impression unforgettable.',
    image: profile,
    link: '/profile-and-headshot'
  }
];

const BusinessShoots = () => {
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
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 15;
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full pt-0 pb-0 lg:pt-0 lg:pb-0 bg-[#fcfcff] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-[15px] mb-6 lg:mb-8 text-center flex flex-col items-center justify-center">

        {/* Modern Pill Badge Subtitle */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 mb-3 shadow-sm whitespace-nowrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
          </span>
          <h3 className="text-[var(--color-primary)] font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase mt-[1px]">
            Enhance product visuals effortlessly
          </h3>
        </div>

        {/* Massive Modern Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-gray-900 tracking-tighter leading-[1.1]">
          Business <span className="text-[var(--color-primary)]">Shoots</span>
        </h2>

        <p className="text-gray-500 max-w-2xl text-sm lg:text-base mt-2 font-medium">
          Elevate your brand with highly professional, cinematic, and compelling visual storytelling.
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
          {businessData.map((item) => (
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default BusinessShoots;
