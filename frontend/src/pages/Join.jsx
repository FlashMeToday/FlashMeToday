import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, FaCheckCircle, FaExclamationCircle, FaArrowRight, FaArrowLeft,
  FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRoute, FaLink, FaInstagram,
  FaCamera, FaSuitcase, FaStar, FaBriefcase, FaLaptopCode
} from 'react-icons/fa';

const ALL_CATEGORIES = [
  "Candid", "Food", "Landscape", "Fashion", "Wedding", "Portaiture", "Wildlife", "Corporate"
];

const CITIES = [
  "Bahadurgarh", "Deoli", "Faridabad", "Ghaziabad", "Greater Noida", "Gurugram", 
  "Loni", "Meerut", "Najafgarh", "Nangloi Jat", "Narela", "New Delhi", "Noida", "Sonipat"
];

const SKILL_LEVELS = ["Amateur", "Student", "Hobbiest", "Professional"];
const EXPERIENCES = ["Fresher", "1-2 Years", "2-5 Years", "5+ Years"];

const FloatingInput = ({ icon: Icon, label, name, type = 'text', value, onChange, required, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || (value && value.toString().length > 0);

  return (
    <div className="relative w-full group mt-3">
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors z-10 ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-400 group-hover:text-gray-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full bg-white border-2 rounded-xl pl-12 pr-4 py-4 text-base text-gray-900 focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold ${isActive ? 'border-[var(--color-primary)] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
        {...props}
      />
      <label 
        className={`absolute left-11 transition-all duration-200 pointer-events-none z-10 bg-white px-1.5 ${isActive ? '-top-2.5 text-[11px] font-bold text-[var(--color-primary)] tracking-wide' : 'top-4 text-base font-medium text-gray-400'}`}
      >
        {label} {required && '*'}
      </label>
    </div>
  );
};

const FloatingSelect = ({ icon: Icon, label, name, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const isActive = isOpen || (value && value.toString().length > 0);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full group mt-3" ref={containerRef}>
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors z-10 ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-400 group-hover:text-gray-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 rounded-xl pl-12 pr-10 py-4 min-h-[58px] text-base focus:outline-none transition-all font-semibold flex justify-between items-center cursor-pointer ${!value ? 'text-transparent' : 'text-gray-900'} ${isActive ? 'border-[var(--color-primary)] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
      >
        <span className="truncate block">{value || ''}</span>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 z-10">
        <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>

      <label 
        className={`absolute left-11 transition-all duration-200 pointer-events-none z-10 bg-white px-1.5 ${isActive ? '-top-2.5 text-[11px] font-bold text-[var(--color-primary)] tracking-wide' : 'top-4 text-base font-medium text-gray-400'}`}
      >
        {label} {required && '*'}
      </label>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { onChange({ target: { name, value: opt } }); setIsOpen(false); }}
                className={`px-4 py-3 cursor-pointer transition-colors text-sm ${value === opt ? 'bg-purple-50 text-[var(--color-primary)] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'}`}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {required && (
        <input 
          type="text" 
          name={name}
          value={value} 
          required 
          readOnly
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-[-1]"
        />
      )}
    </div>
  );
};

const Join = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    nearbyCities: [],
    portfolioLink: '',
    socialPage: '',
    
    photographerCategories: [],
    photographerCameras: '',
    photographerEquipments: '',
    photographerSkillLevel: '',
    photographerExperience: '',

    photoEditorCategories: [],
    photoEditorSoftwares: '',

    videographerCategories: [],
    videographerCameras: '',
    videographerEquipments: '',
    videographerSoftwares: '',
    videographerSkillLevel: '',
    videographerExperience: '',

    videoEditorCategories: [],
    videoEditorSoftwares: '',
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [isCityInputFocused, setIsCityInputFocused] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (role, category) => {
    setFormData(prev => {
      const field = `${role}Categories`;
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(category) ? list.filter(c => c !== category) : [...list, category]
      };
    });
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleCityKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = cityInput.trim().replace(',', '');
      if (val && !formData.nearbyCities.includes(val)) {
        setFormData(prev => ({
          ...prev,
          nearbyCities: [...prev.nearbyCities, val]
        }));
      }
      setCityInput('');
    }
  };

  const removeCity = (cityToRemove) => {
    setFormData(prev => ({
      ...prev,
      nearbyCities: prev.nearbyCities.filter(c => c !== cityToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 3) {
      if (currentStep === 1 && formData.nearbyCities.length === 0) {
        alert("Please add at least one nearby travel location.");
        return;
      }
      if (currentStep === 2 && selectedSkills.length === 0) {
        alert("Please select at least one area of expertise before proceeding.");
        return;
      }
      setCurrentStep(prev => prev + 1);
      return;
    }

    if (uploadedPhotos.length === 0) {
      alert("Please upload at least one photo for your portfolio.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const employee = {
      ...formData,
      nearbyCities: formData.nearbyCities.join(', '),
      selectedSkills,
      isMobileContentCreator: selectedSkills.includes('mobile-content'),
      uploadedPhotos: Array.from(uploadedPhotos).map(f => f.name)
    };

    try {
      const res = await fetch('https://flashmetodaypro-2.onrender.com/api/employees/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });

      if (res.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const isNearbyCitiesActive = isCityInputFocused || cityInput.length > 0 || formData.nearbyCities.length > 0;

  return (
    <div className="min-h-screen bg-[#fafafc] pt-24 pb-24 font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      {/* Dark Theme Banner Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#161430] to-[#0f172a] py-8 px-6 sm:px-10 sm:py-10 text-center flex flex-col items-center border border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0"></div>
          
          <motion.div animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none z-0"></motion.div>
          <motion.div animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-32 -right-32 w-[22rem] h-[22rem] bg-[var(--color-primary)]/20 rounded-full blur-[90px] pointer-events-none z-0"></motion.div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              <h3 className="text-gray-300 font-bold text-xs tracking-[0.15em] uppercase mt-[1px]">
                Careers
              </h3>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.1] mb-6">
              Join <span className="text-[var(--color-primary)] relative inline-block pb-2">
                Us.
                <svg className="absolute bottom-0 left-0 w-full h-3 text-[var(--color-primary)]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-gray-300 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
              Fill your details, select your skills, and submit your best photos. Your talent deserves the spotlight.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Luxury Form Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        
        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-14 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-50 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          {/* Robust App-Like Stepper */}
          <div className="mb-20 flex items-center justify-between w-full max-w-2xl mx-auto relative px-4">
            {[
              { num: 1, label: 'Personal', icon: FaUser },
              { num: 2, label: 'Expertise', icon: FaStar },
              { num: 3, label: 'Portfolio', icon: FaUpload }
            ].map((step, index) => (
              <React.Fragment key={step.num}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-10 w-20 sm:w-24">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 ease-out bg-white ${
                    currentStep > step.num 
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]' 
                      : currentStep === step.num 
                        ? 'border-[var(--color-primary)] text-[var(--color-primary)] shadow-[0_0_20px_rgba(139,38,217,0.25)] scale-110' 
                        : 'border-gray-200 text-gray-300'
                  }`}>
                    {currentStep > step.num ? <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <span className={`absolute top-16 sm:top-18 text-[9px] sm:text-[11px] uppercase tracking-widest font-black whitespace-nowrap transition-colors duration-300 ${
                    currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < 2 && (
                  <div className="flex-1 h-[3px] mx-2 sm:mx-4 relative top-[-10px] bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-[var(--color-primary)] transition-all duration-700 ease-in-out" style={{ width: currentStep > step.num ? '100%' : '0%' }}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Personal Details.</h3>
                    <p className="text-gray-500 font-medium mt-2">Introduce yourself to the team. All fields are required.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FloatingInput 
                      icon={FaUser}
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                    <FloatingInput 
                      icon={FaEnvelope}
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FloatingInput 
                      icon={FaPhoneAlt}
                      label="Mobile Number (10 Digits)"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      title="Must be exactly 10 digits"
                      required
                    />
                    <FloatingSelect
                      icon={FaMapMarkerAlt}
                      label="Primary City"
                      name="city"
                      options={CITIES}
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Custom Floating Tags Input for Nearby Cities */}
                  <div className="relative w-full group mt-3">
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors z-10 ${isNearbyCitiesActive ? 'text-[var(--color-primary)]' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      <FaRoute className="w-5 h-5" />
                    </div>
                    
                    <div className={`w-full bg-white border-2 rounded-xl pl-12 pr-4 py-3 min-h-[58px] focus-within:border-[var(--color-primary)] focus-within:shadow-sm transition-all ${isNearbyCitiesActive ? 'border-[var(--color-primary)] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex flex-wrap gap-2 items-center h-full">
                        <AnimatePresence>
                          {formData.nearbyCities.map(city => (
                            <motion.span 
                              key={city} 
                              initial={{ scale: 0.8, opacity: 0 }} 
                              animate={{ scale: 1, opacity: 1 }} 
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="bg-purple-50 text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-purple-100 mt-1 mb-1"
                            >
                              {city} 
                              <button type="button" onClick={() => removeCity(city)} className="text-[var(--color-primary)]/50 hover:text-red-500 transition-colors focus:outline-none">
                                &times;
                              </button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                        <input 
                          type="text" 
                          value={cityInput} 
                          onChange={(e) => setCityInput(e.target.value)} 
                          onKeyDown={handleCityKeyDown}
                          onFocus={() => setIsCityInputFocused(true)}
                          onBlur={() => setIsCityInputFocused(false)}
                          className="bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 font-semibold text-base flex-1 min-w-[120px] pt-1 pb-1" 
                        />
                      </div>
                    </div>

                    <label 
                      className={`absolute left-11 transition-all duration-200 pointer-events-none z-10 bg-white px-1.5 ${isNearbyCitiesActive ? '-top-2.5 text-[11px] font-bold text-[var(--color-primary)] tracking-wide' : 'top-4 text-base font-medium text-gray-400'}`}
                    >
                      Nearby travel locations *
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FloatingInput 
                      icon={FaLink}
                      label="Portfolio / Drive Link"
                      type="url"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleInputChange}
                      required
                    />
                    <FloatingInput 
                      icon={FaInstagram}
                      label="Instagram / Social Link"
                      name="socialPage"
                      value={formData.socialPage}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Expertise */}
              {currentStep === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-12">
                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Your Expertise.</h3>
                    <p className="text-gray-500 font-medium mt-2">What magical roles do you perform best?</p>
                  </div>

                  {/* Luxury Skill Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[
                      { id: 'photographer', label: 'Photographer', icon: '📸' },
                      { id: 'photo-editor', label: 'Photo Editor', icon: '✨' },
                      { id: 'videographer', label: 'Videographer', icon: '🎥' },
                      { id: 'video-editor', label: 'Video Editor', icon: '🎬' },
                      { id: 'mobile-content', label: 'Mobile Creator', icon: '📱' }
                    ].map(skill => (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`relative p-5 flex flex-col items-center justify-center text-center rounded-2xl border transition-all duration-300 ${
                          selectedSkills.includes(skill.id) 
                            ? 'border-[var(--color-primary)] bg-purple-50/50 shadow-sm transform scale-[1.02]' 
                            : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-3xl mb-3 grayscale opacity-80">{skill.icon}</span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${selectedSkills.includes(skill.id) ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>{skill.label}</span>
                        {selectedSkills.includes(skill.id) && (
                          <div className="absolute top-2 right-2 text-[var(--color-primary)] text-sm">
                            <FaCheckCircle />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-10">
                    {selectedSkills.length === 0 ? (
                      <div className="py-16 text-center">
                        <p className="text-gray-400 font-medium italic text-lg">Select an area of expertise to provide equipment details.</p>
                      </div>
                    ) : (
                      <div className="space-y-10 animate-fade-in">
                        {selectedSkills.includes('photographer') && (
                          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3"><FaCamera className="text-[var(--color-primary)]" /> Photography Profile</h4>
                            
                            <div className="mb-6">
                              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Specialties</label>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CATEGORIES.map(cat => (
                                  <label key={cat} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition-colors select-none ${formData.photographerCategories.includes(cat) ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[var(--color-primary)]'}`}>
                                    <input type="checkbox" checked={formData.photographerCategories.includes(cat)} onChange={() => handleCategoryToggle('photographer', cat)} className="hidden" />
                                    <span className="text-xs font-bold uppercase tracking-wide">{cat}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                              <FloatingInput 
                                icon={FaCamera}
                                label="Cameras & Lenses"
                                name="photographerCameras"
                                value={formData.photographerCameras}
                                onChange={handleInputChange}
                                required
                              />
                              <FloatingInput 
                                icon={FaSuitcase}
                                label="Lighting & Equipment"
                                name="photographerEquipments"
                                value={formData.photographerEquipments}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              <FloatingSelect 
                                icon={FaStar}
                                label="Skill Level"
                                name="photographerSkillLevel"
                                value={formData.photographerSkillLevel}
                                onChange={handleInputChange}
                                options={SKILL_LEVELS}
                                required
                              />
                              <FloatingSelect 
                                icon={FaBriefcase}
                                label="Experience"
                                name="photographerExperience"
                                value={formData.photographerExperience}
                                onChange={handleInputChange}
                                options={EXPERIENCES}
                                required
                              />
                            </div>
                          </div>
                        )}

                        {selectedSkills.includes('photo-editor') && (
                          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3"><FaLaptopCode className="text-[var(--color-primary)]" /> Photo Editing Profile</h4>
                            
                            <div className="mb-6">
                              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Specialties</label>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CATEGORIES.map(cat => (
                                  <label key={cat} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition-colors select-none ${formData.photoEditorCategories.includes(cat) ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[var(--color-primary)]'}`}>
                                    <input type="checkbox" checked={formData.photoEditorCategories.includes(cat)} onChange={() => handleCategoryToggle('photoEditor', cat)} className="hidden" />
                                    <span className="text-xs font-bold uppercase tracking-wide">{cat}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <FloatingInput 
                              icon={FaLaptopCode}
                              label="Software Used"
                              name="photoEditorSoftwares"
                              value={formData.photoEditorSoftwares}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        )}

                        {selectedSkills.includes('videographer') && (
                          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3"><FaCamera className="text-[var(--color-primary)]" /> Videography Profile</h4>
                            
                            <div className="mb-6">
                              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Specialties</label>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CATEGORIES.map(cat => (
                                  <label key={cat} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition-colors select-none ${formData.videographerCategories.includes(cat) ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[var(--color-primary)]'}`}>
                                    <input type="checkbox" checked={formData.videographerCategories.includes(cat)} onChange={() => handleCategoryToggle('videographer', cat)} className="hidden" />
                                    <span className="text-xs font-bold uppercase tracking-wide">{cat}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                              <FloatingInput 
                                icon={FaCamera}
                                label="Cameras & Lenses"
                                name="videographerCameras"
                                value={formData.videographerCameras}
                                onChange={handleInputChange}
                                required
                              />
                              <FloatingInput 
                                icon={FaSuitcase}
                                label="Gimbals & Drones"
                                name="videographerEquipments"
                                value={formData.videographerEquipments}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                              <FloatingInput 
                                icon={FaLaptopCode}
                                label="Software"
                                name="videographerSoftwares"
                                value={formData.videographerSoftwares}
                                onChange={handleInputChange}
                                required
                              />
                              <FloatingSelect 
                                icon={FaStar}
                                label="Skill Level"
                                name="videographerSkillLevel"
                                value={formData.videographerSkillLevel}
                                onChange={handleInputChange}
                                options={SKILL_LEVELS}
                                required
                              />
                              <FloatingSelect 
                                icon={FaBriefcase}
                                label="Experience"
                                name="videographerExperience"
                                value={formData.videographerExperience}
                                onChange={handleInputChange}
                                options={EXPERIENCES}
                                required
                              />
                            </div>
                          </div>
                        )}

                        {selectedSkills.includes('video-editor') && (
                          <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                            <h4 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3"><FaLaptopCode className="text-[var(--color-primary)]" /> Video Editing Profile</h4>
                            
                            <div className="mb-6">
                              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Specialties</label>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CATEGORIES.map(cat => (
                                  <label key={cat} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition-colors select-none ${formData.videoEditorCategories.includes(cat) ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[var(--color-primary)]'}`}>
                                    <input type="checkbox" checked={formData.videoEditorCategories.includes(cat)} onChange={() => handleCategoryToggle('videoEditor', cat)} className="hidden" />
                                    <span className="text-xs font-bold uppercase tracking-wide">{cat}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            <FloatingInput 
                              icon={FaLaptopCode}
                              label="Software Used"
                              name="videoEditorSoftwares"
                              value={formData.videoEditorSoftwares}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        )}

                        {selectedSkills.includes('mobile-content') && (
                          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50/80 to-transparent border border-purple-100 text-center">
                            <h4 className="text-xl font-black text-purple-900 mb-2">Mobile Creator</h4>
                            <p className="text-purple-700 font-medium text-lg">No additional equipment details needed. We will evaluate your amazing portfolio link!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Photo Submission */}
              {currentStep === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                  <div className="mb-10 text-center">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Portfolio Upload.</h3>
                    <p className="text-gray-500 font-medium mt-2">Let your work speak for itself.</p>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-4 text-amber-800 shadow-sm">
                    <FaExclamationCircle className="mt-1 flex-shrink-0 text-lg" />
                    <p className="text-sm font-semibold leading-relaxed">Please upload a minimum of 5 images representing your very best work. This is crucial for our review process. *</p>
                  </div>
                  
                  <div className="border border-dashed border-gray-300 rounded-[2rem] p-16 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer bg-gray-50/50 relative group">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => setUploadedPhotos(e.target.files)}
                      required
                    />
                    <div className="relative z-0">
                      <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--color-primary)] text-gray-400">
                        <FaUpload className="text-2xl" />
                      </div>
                      <p className="font-bold text-gray-900 text-xl mb-2">Upload Files *</p>
                      <p className="text-gray-400 text-sm font-medium">Drag & drop or click to browse</p>
                      <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">SVG, PNG, JPG (MAX. 800x400px)</p>
                    </div>
                    
                    {uploadedPhotos.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-gray-200 relative z-0 flex flex-wrap justify-center gap-3">
                        <span className="font-bold text-sm uppercase tracking-widest text-[var(--color-primary)] bg-purple-50 px-6 py-3 rounded-full shadow-sm inline-flex items-center gap-2 border border-purple-100">
                          <FaCheckCircle /> {uploadedPhotos.length} files attached
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Status Messages */}
          <div className="mt-10">
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50/80 border border-green-200 text-green-700 p-5 rounded-2xl flex items-center justify-center gap-3 font-bold mb-6 shadow-sm">
                  <FaCheckCircle className="text-xl" /> Application submitted successfully! We will be in touch.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50/80 border border-red-200 text-red-700 p-5 rounded-2xl flex items-center justify-center gap-3 font-bold mb-6 shadow-sm">
                  <FaExclamationCircle className="text-xl" /> Submission failed. Please verify your connection or try again.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Luxury Navigation Buttons */}
          <div className="flex justify-between items-center pt-10 mt-10 border-t border-gray-100">
            {currentStep > 1 ? (
              <button 
                type="button" 
                onClick={prevStep} 
                className="flex items-center gap-3 px-6 py-3 font-bold text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
              </button>
            ) : (
              <div></div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-4"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : (
                <>
                  {currentStep < 3 ? 'Next Step' : 'Submit App'}
                  {currentStep < 3 && <FaArrowRight className="text-sm" />}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Join;
