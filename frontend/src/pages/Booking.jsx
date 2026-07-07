import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom';
import bookingDataRaw from '../assets/data/services.json';
import { FaUser, FaEnvelope, FaWhatsapp, FaPhoneAlt, FaCalendarAlt, FaClipboardList, FaCamera, FaMapMarkerAlt, FaChevronDown, FaArrowRight, FaInfoCircle, FaCheckCircle, FaLock } from 'react-icons/fa';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlPlan = searchParams.get('plan');
  const urlType = searchParams.get('type');

  const allPlans = useMemo(() => {
    try {
      const data = bookingDataRaw[0];
      return [...(data.Occasions || []), ...(data.Business || [])];
    } catch (e) {
      return [];
    }
  }, []);

  const cities = [
    "Bahadurgarh", "Deoli", "Faridabad", "Ghaziabad", "Greater Noida", 
    "Gurugram", "Loni", "Meerut", "Najafgarh", "Nangloi Jat", 
    "Narela", "New Delhi", "Noida", "Sonipat"
  ];

  const formatInitialTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    shootTime: formatInitialTime(),
    plan: urlPlan || '',
    typeOfShoot: urlType || '',
    city: 'New Delhi',
    location: ''
  });

  useEffect(() => {
    if (searchParams.toString()) {
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate, location.pathname]);

  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const planRef = useRef(null);
  const typeRef = useRef(null);
  const cityRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (planRef.current && !planRef.current.contains(event.target)) setIsPlanDropdownOpen(false);
      if (typeRef.current && !typeRef.current.contains(event.target)) setIsTypeDropdownOpen(false);
      if (cityRef.current && !cityRef.current.contains(event.target)) setIsCityDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle plan change: Reset type of shoot
  const handlePlanChange = (selectedPlan) => {
    setFormData(prev => ({ ...prev, plan: selectedPlan, typeOfShoot: '' }));
    setIsPlanDropdownOpen(false);
  };

  const selectedPlanObj = useMemo(() => {
    return allPlans.find(item => item.plan === formData.plan);
  }, [formData.plan, allPlans]);

  const availableTypes = useMemo(() => {
    return selectedPlanObj ? selectedPlanObj.packages.map(pkg => pkg["type of shoot"]) : [];
  }, [selectedPlanObj]);

  const selectedPackage = useMemo(() => {
    if (!selectedPlanObj || !formData.typeOfShoot) return null;
    return selectedPlanObj.packages.find(pkg => pkg["type of shoot"] === formData.typeOfShoot);
  }, [selectedPlanObj, formData.typeOfShoot]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('http:
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        
        setFormData({
          name: '',
          email: '',
          mobile: '',
          shootTime: formatInitialTime(),
          plan: '',
          typeOfShoot: '',
          city: 'New Delhi',
          location: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(data.message || 'Failed to submit booking request.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-[#f4f7f6] min-h-screen font-sans selection:bg-[var(--color-primary)] selection:text-white pb-24">
      
      {/* Dark Theme Banner Hero (Matching Portfolio) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#161430] to-[#0f172a] py-8 px-6 sm:px-10 sm:py-10 text-center flex flex-col items-center border border-white/5 shadow-2xl"
        >
          {/* Subtle Grid Overlay for the dark card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0"></div>
          
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
                Lock In Your Spot
              </h3>
            </div>
            
            {/* Massive Modern Title */}
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              Book a <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Shoot.
                {/* Subtle underline accent */}
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed mx-auto">
              Secure your spot and let us capture your most cherished moments. Please provide your details below to finalize your booking schedule.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse gap-8 items-start justify-center">
        
        {/* Left Column: Dynamic Package Details */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div 
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '100%', maxWidth: '450px' }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              className="w-full lg:w-[40%] flex-shrink-0"
            >
              <div className="bg-white rounded-[1.5rem] shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow sticky top-32 overflow-hidden flex flex-col relative">
                
                <div className="p-8 pb-8 flex-grow relative z-10">

                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="bg-purple-100 text-[var(--color-primary)] font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                      {formData.plan} PLAN
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-5 tracking-tight leading-tight">
                    {selectedPackage["type of shoot"]}<span className="text-[var(--color-primary)]">.</span>
                  </h3>
                  
                  {selectedPackage.includes && selectedPackage.includes !== "N/A" && (
                    <div className="inline-block bg-gray-50 text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full font-semibold text-sm mb-8">
                      {selectedPackage.includes}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {selectedPackage.packageDescp.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mt-0.5 border border-purple-100">
                          <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="text-gray-700 text-sm font-medium leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 sm:px-8 sm:py-6 mt-auto relative z-10 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Price in <span className="text-[var(--color-primary)]">{formData.city}</span>
                    </p>
                    {selectedPackage.price.original && selectedPackage.price.offer && (
                      <span className="text-green-600 bg-green-50 font-bold px-2.5 py-0.5 rounded-md text-xs border border-green-100">
                        Save ₹{(Number(selectedPackage.price.original) - Number(selectedPackage.price.offer)).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-900 tracking-tight">₹{Number(selectedPackage.price.offer).toLocaleString("en-IN")}</span>
                    {selectedPackage.price.original && (
                      <del className="text-gray-400 font-semibold text-lg">₹{Number(selectedPackage.price.original).toLocaleString("en-IN")}</del>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-full transition-all duration-500 ${selectedPackage ? 'lg:w-[60%]' : 'max-w-4xl mx-auto'}`}
        >
          <div className="bg-white rounded-[1.5rem] border border-gray-200 shadow-sm p-5 sm:p-8 md:p-10 h-full">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-7">
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                      <FaUser className="text-lg text-[var(--color-primary)] group-focus-within:scale-110 transition-transform shrink-0" />
                    </div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="block w-full bg-[#fcfdff] border border-gray-200 rounded-xl py-3.5 pl-[48px] pr-4 text-gray-900 text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all placeholder-gray-400 hover:border-gray-300" placeholder="Full Name" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                      <FaEnvelope className="text-lg text-[var(--color-primary)] group-focus-within:scale-110 transition-transform shrink-0" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="block w-full bg-[#fcfdff] border border-gray-200 rounded-xl py-3.5 pl-[48px] pr-4 text-gray-900 text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all placeholder-gray-400 hover:border-gray-300" placeholder="name@email.com" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Mobile <span className="text-[#6f42c1] ml-1">WhatsApp</span></label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                      <FaPhoneAlt className="text-lg text-[var(--color-primary)] group-focus-within:scale-110 transition-transform shrink-0" />
                    </div>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="block w-full bg-[#fcfdff] border border-gray-200 rounded-xl py-3.5 pl-[48px] pr-4 text-gray-900 text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all placeholder-gray-400 hover:border-gray-300" placeholder="9999900000" pattern="[0-9]{10}" title="Please enter a valid 10 digit phone number" maxLength="10" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Time of Shoot</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                      <FaCalendarAlt className="text-lg text-[var(--color-primary)] group-focus-within:scale-110 transition-transform shrink-0" />
                    </div>
                    <input type="datetime-local" name="shootTime" value={formData.shootTime} onChange={handleChange} className="block w-full bg-[#fcfdff] border border-gray-200 rounded-xl py-3.5 pl-[48px] pr-4 text-gray-900 text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all hover:border-gray-300" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Plan</label>
                  <div className="relative group" ref={planRef}>
                    <input type="text" name="plan" value={formData.plan} onChange={()=>{}} className="absolute opacity-0 w-0 h-0 -z-10" required />
                    <button type="button" onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)} className={`relative flex items-center justify-between w-full bg-[#fcfdff] border ${isPlanDropdownOpen ? 'border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10' : 'border-gray-200 hover:border-gray-300'} rounded-xl py-3.5 pr-4 pl-[48px] transition-all cursor-pointer`}>
                      <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                        <FaClipboardList className={`text-lg text-[var(--color-primary)] transition-transform ${isPlanDropdownOpen ? 'scale-110' : 'group-hover:scale-110'} shrink-0`} />
                      </div>
                      <span className={`truncate text-sm font-semibold ${formData.plan ? 'text-gray-900' : 'text-gray-400'}`}>
                        {formData.plan || 'Select Plan'}
                      </span>
                      <FaChevronDown className={`text-gray-400 text-[10px] transition-transform ${isPlanDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div initial={false} animate={{ opacity: isPlanDropdownOpen ? 1 : 0, y: isPlanDropdownOpen ? 0 : -10 }} className={`absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden ${isPlanDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                      <ul className="py-2 max-h-60 overflow-auto">
                        {allPlans.map((item, idx) => (
                          <li key={idx}>
                            <button type="button" onClick={() => handlePlanChange(item.plan)} className={`w-full text-left px-5 py-3 text-sm transition-colors ${formData.plan === item.plan ? 'bg-purple-50 text-[var(--color-primary)] font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                              {item.plan}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>

                <div className={!formData.plan ? 'opacity-50 pointer-events-none grayscale' : 'transition-opacity duration-300'}>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Type of Shoot</label>
                  <div className="relative group" ref={typeRef}>
                    <input type="text" name="typeOfShoot" value={formData.typeOfShoot} onChange={()=>{}} className="absolute opacity-0 w-0 h-0 -z-10" required />
                    <button type="button" onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)} disabled={!formData.plan} className={`relative flex items-center justify-between w-full bg-[#fcfdff] border ${isTypeDropdownOpen ? 'border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10' : 'border-gray-200 hover:border-gray-300'} rounded-xl py-3.5 pr-4 pl-[48px] transition-all cursor-pointer`}>
                      <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                        <FaCamera className={`text-lg text-[var(--color-primary)] transition-transform ${isTypeDropdownOpen ? 'scale-110' : 'group-hover:scale-110'} shrink-0`} />
                      </div>
                      <span className={`truncate text-sm font-semibold ${formData.typeOfShoot ? 'text-gray-900' : 'text-gray-400'}`}>
                        {formData.typeOfShoot || 'Select Shoot'}
                      </span>
                      <FaChevronDown className={`text-gray-400 text-[10px] transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div initial={false} animate={{ opacity: isTypeDropdownOpen ? 1 : 0, y: isTypeDropdownOpen ? 0 : -10 }} className={`absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden ${isTypeDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                      <ul className="py-2 max-h-60 overflow-auto">
                        {availableTypes.map((type, idx) => (
                          <li key={idx}>
                            <button type="button" onClick={() => { setFormData(prev => ({...prev, typeOfShoot: type})); setIsTypeDropdownOpen(false); }} className={`w-full text-left px-5 py-3 text-sm transition-colors ${formData.typeOfShoot === type ? 'bg-purple-50 text-[var(--color-primary)] font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                              {type}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">City</label>
                  <div className="relative group" ref={cityRef}>
                    <input type="text" name="city" value={formData.city} onChange={()=>{}} className="absolute opacity-0 w-0 h-0 -z-10" required />
                    <button type="button" onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)} className={`relative flex items-center justify-between w-full bg-[#fcfdff] border ${isCityDropdownOpen ? 'border-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/10' : 'border-gray-200 hover:border-gray-300'} rounded-xl py-3.5 pr-4 pl-[48px] transition-all cursor-pointer`}>
                      <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                        <FaMapMarkerAlt className={`text-lg text-[var(--color-primary)] transition-transform ${isCityDropdownOpen ? 'scale-110' : 'group-hover:scale-110'} shrink-0`} />
                      </div>
                      <span className={`truncate text-sm font-semibold text-gray-900`}>
                        {formData.city}
                      </span>
                      <FaChevronDown className={`text-gray-400 text-[10px] transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <motion.div initial={false} animate={{ opacity: isCityDropdownOpen ? 1 : 0, y: isCityDropdownOpen ? 0 : -10 }} className={`absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden ${isCityDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                      <ul className="py-2 max-h-60 overflow-auto">
                        {cities.map((city, idx) => (
                          <li key={idx}>
                            <button type="button" onClick={() => { setFormData(prev => ({...prev, city})); setIsCityDropdownOpen(false); }} className={`w-full text-left px-5 py-3 text-sm transition-colors ${formData.city === city ? 'bg-purple-50 text-[var(--color-primary)] font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                              {city}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Location</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 w-[48px] flex items-center justify-center pointer-events-none">
                        <FaMapMarkerAlt className="text-lg text-[var(--color-primary)] group-focus-within:scale-110 transition-transform shrink-0" />
                    </div>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="block w-full bg-[#fcfdff] border border-gray-200 rounded-xl py-3.5 pl-[48px] pr-4 text-gray-900 text-sm font-semibold focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all placeholder-gray-400 hover:border-gray-300" placeholder="Hotel / Apartment / Street" required />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <AnimatePresence>
                  {submitError && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-xl border border-red-100 mb-4">
                      {submitError}
                    </motion.div>
                  )}
                  {submitSuccess && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-green-600 text-sm font-medium p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2 mb-4">
                      <FaCheckCircle /> Booking request submitted successfully! We will contact you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.plan || !formData.typeOfShoot}
                    className="w-full bg-[var(--color-primary)] hover:bg-[#6b21a8] text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Booking'}
                    {!isSubmitting && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <FaLock className="text-[10px]" /> Your data is secure and will only be used for booking purposes.
                  </p>
                </div>

                <div className="text-[13px] text-gray-500 mt-5 space-y-2 font-medium">
                  <p className="flex items-center gap-2"><FaInfoCircle className="text-gray-400" /> Booking is subject to availability.</p>
                  <p className="flex items-start gap-2"><FaCheckCircle className="text-gray-400 flex-shrink-0 mt-1" /> <span>By proceeding, you agree to <Link to="/terms-conditions" className="text-[var(--color-primary)] hover:underline font-bold">Terms & Conditions</Link>.</span></p>
                  <p className="flex items-start gap-2 leading-relaxed"><FaLock className="text-gray-400 flex-shrink-0 mt-1" /> <span>You agree to our <Link to="/privacy-policy" className="text-[var(--color-primary)] hover:underline font-bold">Privacy Policy</Link> and consent to receive WhatsApp updates.</span></p>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Booking;
