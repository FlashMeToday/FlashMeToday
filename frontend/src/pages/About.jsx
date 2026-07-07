import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

  return (
    <div className="bg-[#f8f9fb] min-h-screen pt-24 pb-0 font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8">
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
                About Studio
              </h3>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              We Frame <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Emotions.
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
              FlashMeToday is India's premier studio, capturing your most precious moments with unparalleled cinematic elegance.
            </p>
          </div>
        </motion.div>
      </div>

      {/* About FlashMeToday Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/50 border border-purple-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
              <h3 className="text-[var(--color-primary)] font-bold text-xs tracking-widest uppercase">Who We Are</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 leading-[1.1]">
              About <span className="text-[var(--color-primary)]">FlashMeToday.</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                At FlashMeToday, we believe that every moment holds a story waiting to be told. Based in India, we are a collective of passionate visual artists, dedicated to capturing the essence of human emotion through the lens.
              </p>
              <p>
                From intimate portraits and vibrant wedding celebrations to high-profile corporate shoots, we bring a cinematic touch to everything we do. Our approach blends state-of-the-art technology with an artistic eye, ensuring your memories are not just documented, but transformed into timeless legacies.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-primary)] to-purple-400 rounded-[2.5rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-xl -z-10"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80" 
                alt="FlashMeToday Studio" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Founder's Story Section */}
      <div className="bg-white py-10 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-white to-white -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Founder's <span className="text-[var(--color-primary)]">Story.</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Meet the visionaries behind FlashMeToday, leading our team to redefine cinematic photography.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Shailendra Jain */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full sm:w-2/3 lg:w-3/12 relative group mx-auto lg:mx-0"
              >
                <div className="absolute inset-0 bg-[var(--color-primary)] rounded-[2rem] transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-10"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4] border border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                    alt="Shailendra Jain" 
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="w-full lg:w-8/12"
              >
                <div className="mb-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shailendra Jain</h3>
                  <p className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm">Founder</p>
                </div>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed relative">
                  <svg className="absolute -top-8 -left-8 w-16 h-16 text-gray-100 -z-10" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                  <p>
                    As the visionary founder, Shailendra's journey began with a simple fascination for how light shapes reality. With over a decade of experience in the industry, he built FlashMeToday from the ground up, turning a personal passion into a premier cinematic studio.
                  </p>
                  <p>
                    His approach to storytelling is rooted in authenticity. He believes that the most profound images aren't staged; they are the candid, fleeting moments of genuine connection. Under his leadership, the studio has grown into a powerhouse of creative talent.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Kartik Jain */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full sm:w-2/3 lg:w-3/12 relative group mx-auto lg:mx-0"
              >
                <div className="absolute inset-0 bg-blue-500 rounded-[2rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-10"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4] border border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80" 
                    alt="Kartik Jain" 
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="w-full lg:w-8/12"
              >
                <div className="mb-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kartik Jain</h3>
                  <p className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm">CEO</p>
                </div>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed relative">
                  <svg className="absolute -top-8 -right-8 w-16 h-16 text-gray-100 -z-10 transform scale-x-[-1]" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
                  <p>
                    As the dynamic CEO, Kartik brings a robust blend of strategic operations and modern business acumen. He has been instrumental in scaling FlashMeToday's presence across the country. 
                  </p>
                  <p>
                    He ensures that while our artists focus on capturing magic, the studio operates with flawless precision and unmatched client service. Kartik's dedication to innovation has helped integrate cutting-edge technologies into our workflow, redefining the standard for studio experiences in India.
                  </p>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
