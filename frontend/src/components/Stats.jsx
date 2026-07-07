import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaUserFriends, FaMapMarkerAlt, FaImages } from 'react-icons/fa';

const statsData = [
  { id: 1, icon: FaCamera, number: 500, label: "Shoots Done", suffix: "+" },
  { id: 2, icon: FaUserFriends, number: 200, label: "Photographers", suffix: "+" },
  { id: 3, icon: FaMapMarkerAlt, number: 15, label: "Cities", suffix: "+" },
  { id: 4, icon: FaImages, number: 50000, label: "Images Processed", suffix: "+" }
];

const CountUpAnimation = ({ number, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; 
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      
      const counter = setInterval(() => {
        start += 1;
        const progress = start / totalFrames;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); 
        
        setCount(Math.floor(easeOutProgress * number));
        
        if (start === totalFrames) {
          clearInterval(counter);
          setCount(number);
        }
      }, frameRate);
      
      return () => clearInterval(counter);
    }
  }, [isInView, number]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  return (
    <section className="w-full pt-[30px] lg:pt-[30px] pb-0 lg:pb-0 bg-white relative overflow-hidden">
      
      <div className="w-full max-w-[1700px] mx-auto px-4 lg:px-5 relative z-10 flex flex-col items-center">
        
        <div className="max-w-5xl mx-auto mb-6 lg:mb-8 text-center flex flex-col items-center justify-center relative z-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 mb-1 shadow-sm whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            <h3 className="text-[var(--color-primary)] font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase mt-[1px]">
              Our Capacity
            </h3>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-gray-900 tracking-tighter leading-[1.1]"
          >
            Numbers <span className="text-[var(--color-primary)]">don't lie.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl text-sm lg:text-base mt-1 font-medium"
          >
            Over the years, we have mastered the art of capturing moments, scaling our operations, and delivering flawless frames to thousands of happy clients.
          </motion.p>
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 relative z-20">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group bg-white rounded-2xl sm:rounded-[2rem] border border-gray-200 hover:border-[var(--color-primary)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,38,217,0.12)] flex flex-col justify-between p-5 sm:p-8 xl:p-10 min-h-[180px] sm:min-h-[260px] transition-all duration-500 overflow-hidden relative cursor-default"
            >
              
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 text-[var(--color-primary)] text-lg sm:text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-[var(--color-primary)]/20 shadow-sm relative">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"></div>
                <stat.icon className="relative z-10" />
              </div>

              <div className="flex flex-col relative z-10 text-left">
                <h3 className="text-3xl sm:text-5xl xl:text-6xl font-black font-sans text-gray-900 tracking-tighter leading-none mb-1 sm:mb-3 drop-shadow-sm group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  <CountUpAnimation number={stat.number} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[8px] sm:text-[10px] xl:text-xs transition-colors duration-500">
                  {stat.label}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;
