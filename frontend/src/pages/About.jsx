import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const timelineData = [
    {
      year: "2018",
      title: "The Spark",
      description: "It began with a single camera, a profound love for storytelling, and a desire to freeze time. What started as a passion project quickly blossomed into a fully-fledged studio dedicated to the art of visual preservation.",
      image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80"
    },
    {
      year: "2020",
      title: "Discovering Connection",
      description: "We realized early on that photography isn't just about the equipment; it's about the connection. It's the tear in a father's eye, the laughter of a newborn, the silent confidence of a CEO.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
    },
    {
      year: "2023",
      title: "Scaling the Vision",
      description: "With a growing team of top-tier professionals and state-of-the-art cinematic gear, we expanded our services across India, capturing destination weddings, commercial shoots, and high-profile events.",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80"
    },
    {
      year: "2026",
      title: "A Visual Legacy",
      description: "Today, FlashMeToday stands as a testament to our original vision. We continue to craft visual legacies, constantly innovating and pushing the boundaries of modern photography.",
      image: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-[#f8f9fb] min-h-screen pt-24 pb-20 font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      {/* Dark Theme Banner Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#161430] to-[#0f172a] py-8 px-6 sm:px-10 sm:py-10 text-center flex flex-col items-center border border-white/5 shadow-2xl"
        >
          {/* Subtle Grid Overlay for the dark card */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0"
          ></div>
          
          {/* Animated Background Gradients */}
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
            {/* Modern Pill Badge Subtitle */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              <h3 className="text-gray-300 font-bold text-xs tracking-[0.15em] uppercase mt-[1px]">
                About Studio
              </h3>
            </div>
            
            {/* Massive Modern Title */}
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              We Frame <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Emotions.
                {/* Subtle underline accent */}
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
              FlashMeToday is India's premier studio, capturing your most precious moments with unparalleled cinematic elegance.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Story Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Our <span className="text-[var(--color-primary)]">Journey.</span>
          </h2>
        </div>

        <div className="space-y-24">
          {timelineData.map((item, index) => (
            <div 
              key={item.year}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              
              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full md:w-1/2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-purple-400 rounded-[2.5rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-lg -z-10"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Text Section */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col"
              >
                <div className="text-[var(--color-primary)] font-black text-6xl lg:text-8xl opacity-10 mb-2 -ml-2">
                  {item.year}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-[var(--color-primary)] pl-6">
                  {item.description}
                </p>
              </motion.div>
              
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default About;
