import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaCamera, FaPlane, FaHotel } from 'react-icons/fa';

const partnersData = [
  {
    id: 1,
    icon: FaBuilding,
    title: "Corporate.",
    description: "Seamless photography solutions for every scale and area.",
    buttonText: "Talk to us"
  },
  {
    id: 2,
    icon: FaCamera,
    title: "Photographers.",
    description: "Your talent deserves the spotlight – come onboard today.",
    buttonText: "Join us"
  },
  {
    id: 3,
    icon: FaPlane,
    title: "Travel Agents.",
    description: "Give your clients more than a trip – give them memories.",
    buttonText: "Sell with us"
  },
  {
    id: 4,
    icon: FaHotel,
    title: "Attractions & Hotels.",
    description: "Add value on-site, multiply reach online.",
    buttonText: "Let's Plan"
  }
];

const Partners = () => {
  return (
    <section className="w-full pt-0 pb-[30px] bg-[#fcfcff] relative overflow-hidden">
      
      <div className="w-full max-w-[1700px] mx-auto px-4 lg:px-5 relative z-10 flex flex-col items-center">
        
        {/* Top: Header perfectly matching Stats.jsx */}
        <div className="max-w-5xl mx-auto mb-6 lg:mb-8 text-center flex flex-col items-center justify-center relative z-20">
          
          {/* Modern Pill Badge Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 mb-0 shadow-sm whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            <h3 className="text-[var(--color-primary)] font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase mt-[1px]">
              Photography is in our DNA.
            </h3>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-gray-900 tracking-tighter leading-[1.1]"
          >
            For every <span className="text-[var(--color-primary)]">story.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl text-sm lg:text-base mt-1 sm:mt-2 font-medium"
          >
            From corporate brands and creative professionals to global hospitality, we empower every industry with stunning visuals that elevate your story and multiply your reach.
          </motion.p>
        </div>

        {/* Bottom: 4 Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative z-20">
          {partnersData.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-[var(--color-primary)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,38,217,0.12)] transition-all duration-500 flex flex-col p-8 overflow-hidden relative"
            >
              
              {/* Top Icon Container */}
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-primary)] text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-[var(--color-primary)]/20 shadow-sm relative">
                <div className="absolute inset-0 rounded-2xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"></div>
                <partner.icon className="relative z-10" />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col text-center flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {partner.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {partner.description}
                </p>
              </div>

              {/* Premium Button */}
              <button className="w-full bg-[var(--color-primary)] text-white font-medium py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(139,38,217,0.2)] hover:shadow-[0_8px_25px_rgba(139,38,217,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer relative z-20">
                {partner.buttonText}
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;
