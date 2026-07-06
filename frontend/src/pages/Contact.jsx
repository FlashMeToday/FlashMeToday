import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlConcern = searchParams.get('concern');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    concern: urlConcern || '',
    details: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const concernOptions = [
    "Travel Agent Signup",
    "Corporate Shoot",
    "Personalized Shoot Plan",
    "Hotels and Attractions",
    "Photographer",
    "Other"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchParams.toString()) {
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate, location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative bg-white min-h-screen font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      {/* Dark Theme Banner Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
                We're Here For You
              </h3>
            </div>
            
            {/* Massive Modern Title */}
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              Get in <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Touch.
                {/* Subtle underline accent */}
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
              From grand weddings to corporate shoots, our team is ready to capture your vision.
            </p>
          </div>
        </motion.div>
      </div>
      {/* Multi-Card Layout - Ultra Clean Corporate Style */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          
          {/* Card 1: Customer Care */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-[1.5rem] border border-gray-200 shadow-sm p-7 hover:shadow-md transition-shadow duration-300"
          >
            <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full inline-block"></span>
              Customer Care
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-gray-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                  <a href="tel:+919967490542" className="text-gray-900 font-semibold text-sm hover:text-[var(--color-primary)] transition-colors">+91 99674 90542</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-gray-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:flashmetoday1@gmail.com" className="text-gray-900 font-semibold text-sm hover:text-[var(--color-primary)] transition-colors break-all">flashmetoday1@gmail.com</a>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/919967490542" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white w-full py-3.5 rounded-full hover:bg-[#20bd5a] transition-colors font-bold text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Our Offices */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-[1.5rem] border border-gray-200 shadow-sm p-7 hover:shadow-md transition-shadow duration-300"
          >
            <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full inline-block"></span>
              Our Offices
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                </div>
                <div>
                  <div className="inline-block bg-gray-100 border border-gray-200 text-gray-800 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-2">
                    Mumbai (MH)
                  </div>
                  <p className="text-sm text-gray-500 font-medium">West Parel, Mumbai</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pt-5 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-gray-400 text-sm" />
                </div>
                <div>
                  <div className="inline-block bg-gray-100 border border-gray-200 text-gray-800 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-2">
                    Delhi
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    Mandoli Road, Ram Nagar,<br/>Shahdara Delhi-110032
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full lg:w-[65%]"
        >
          <div className="bg-white rounded-[1.5rem] border border-gray-200 shadow-sm p-8 md:p-10 h-full hover:shadow-md transition-shadow duration-300">
            
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-500 text-sm font-medium">Fill out the form below and our team will get back to you shortly.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full bg-[#f8f9fb] border border-transparent hover:bg-[#f1f3f7] focus:bg-white rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/15 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full bg-[#f8f9fb] border border-transparent hover:bg-[#f1f3f7] focus:bg-white rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/15 transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full bg-[#f8f9fb] border border-transparent hover:bg-[#f1f3f7] focus:bg-white rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/15 transition-all duration-300"
                    placeholder="9999900000"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10 digit phone number"
                    maxLength="10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Subject</label>
                  <div className="relative" ref={dropdownRef}>
                    {/* Hidden input to maintain native HTML5 validation */}
                    <input type="text" name="concern" value={formData.concern} onChange={()=>{}} className="absolute opacity-0 w-0 h-0 -z-10" required />
                    
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center justify-between w-full bg-[#f8f9fb] border hover:bg-[#f1f3f7] ${isDropdownOpen ? 'bg-white border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/15' : 'border-transparent'} rounded-xl py-3.5 px-4 text-sm transition-all duration-300 cursor-pointer ${formData.concern ? 'text-gray-900' : 'text-gray-400'}`}
                    >
                      <span className="truncate">{formData.concern || 'Select an option'}</span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    
                    <motion.div 
                      initial={false}
                      animate={{ opacity: isDropdownOpen ? 1 : 0, y: isDropdownOpen ? 0 : -10 }}
                      className={`absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                      <ul className="py-2">
                        {concernOptions.map((option, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({...formData, concern: option});
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${formData.concern === option ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Message Details</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="block w-full bg-[#f8f9fb] border border-transparent hover:bg-[#f1f3f7] focus:bg-white rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/15 transition-all duration-300 resize-none"
                  placeholder="Tell us more about what you need..."
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-500 font-medium">Your details are completely secure.</p>
                <button 
                  type="submit" 
                  className="group flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-opacity-90 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all w-full sm:w-auto"
                >
                  Send Request
                  <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
