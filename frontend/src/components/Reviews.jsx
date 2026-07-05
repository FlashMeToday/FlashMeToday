import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaTripadvisor } from 'react-icons/fa';

const reviewsData = [
  {
    id: 1,
    name: "Neha Tiwari",
    location: "The Leela, Delhi",
    text: "We hired them for our pre-wedding, and honestly, it was the best decision! The poses, the locations, the candid shots — everything was beautifully captured. Friends and family can't stop praising the pictures.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul & Sneha",
    location: "Taj Mahal Palace, Mumbai",
    text: "Absolutely stunning work! They made us feel so comfortable in front of the camera. The final video and album exceeded all our expectations. A truly premium experience.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    name: "Anjali Desai",
    location: "Udaipur, Rajasthan",
    text: "FlashMeToday captured the soul of our event. The attention to detail and the sheer creativity in every frame is mind-blowing. Highly recommended for anyone looking for luxury photography.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 5
  }
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full sm:w-[calc(100%-60px)] max-w-[1700px] mx-auto my-[30px] py-12 lg:py-16 bg-[#0a0a0a] rounded-none sm:rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden flex justify-center">
      
      {/* Premium Fade Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.04) 2px, transparent 2px)`,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)'
        }}
      ></div>
      <div className="w-full max-w-[1550px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Luxury Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
            <h3 className="text-purple-200 font-bold text-xs tracking-[0.2em] uppercase mt-[1px]">
              TIMELESS TREASURES
            </h3>
          </motion.div>

          {/* Massive Premium Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black font-sans text-white tracking-tighter leading-[1.05] mb-4 drop-shadow-lg"
          >
            Trusted & loved,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-[var(--color-primary)]">by all.</span>
          </motion.h2>

          {/* Elegant Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-purple-100/80 text-base lg:text-lg max-w-xl leading-[1.7] mb-8 font-medium"
          >
            FlashMeToday has been a part of countless stories. Hear from the people who turned their memories into magic with us.
          </motion.p>

          {/* Luxury Glowing CTA Button */}
          <motion.a 
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[#5e12b0] text-white font-bold text-lg rounded-full overflow-hidden shadow-[0_10px_30px_rgba(139,38,217,0.4)] hover:shadow-[0_20px_50px_rgba(139,38,217,0.6)] hover:scale-[1.03] transition-all duration-500 ease-out"
          >
            {/* Elegant Shine Sweep */}
            <div className="absolute top-0 -left-[120%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] group-hover:left-[120%] transition-all duration-700 ease-in-out"></div>
            
            <FaTripadvisor className="text-2xl relative z-10" />
            <span className="relative z-10">Tripadvisor Reviews</span>
          </motion.a>
        </div>

        {/* Right Side: Review Card Component */}
        <div className="w-full flex flex-col items-center lg:items-end">
          
          <div className="w-full max-w-[650px] min-h-[340px] bg-gradient-to-br from-[#120a23] to-[#0a0514] border border-purple-500/20 rounded-[2rem] px-6 pt-6 pb-5 lg:px-8 lg:pt-8 lg:pb-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.05)] relative overflow-hidden group flex flex-col justify-between">
            
            {/* Ambient Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
            
            {/* Giant watermark quote */}
            <FaQuoteLeft className="absolute top-8 right-10 text-[8rem] text-white/[0.02] pointer-events-none z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* User Header */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8 relative z-10 w-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-purple-400/30 p-0.5 shrink-0">
                    <img 
                      src={reviewsData[currentIndex].image} 
                      alt={reviewsData[currentIndex].name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center w-full justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {reviewsData[currentIndex].name}
                    </h4>
                    
                    {/* Stars at Top Right on Desktop, Below Name on Mobile */}
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[#eab308] text-base sm:text-xl drop-shadow-[0_0_8px_rgba(234,179,8,0.4)] mt-1 sm:mt-0">
                      {[...Array(reviewsData[currentIndex].rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-base lg:text-lg leading-[1.6] mb-8 font-medium relative z-10">
                  "{reviewsData[currentIndex].text}"
                </p>

                {/* Location */}
                <div className="mt-auto">
                  <p className="text-purple-300/60 text-xs font-bold uppercase tracking-[0.2em] relative z-10">
                    {reviewsData[currentIndex].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Slider Indicators */}
          <div className="flex items-center gap-3 mt-6 w-full max-w-[650px] justify-center">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Reviews;
