import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiEye, FiTrash2, FiX, FiCheck, FiUpload, FiMapPin } from 'react-icons/fi';
import { FaPhone, FaPhoneAlt, FaEnvelope, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { State, City } from 'country-state-city';

const PhotographersTab = () => {
  // --- Data & Infinite Scroll States ---
  const [photographers, setPhotographers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // --- Search & Filter States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ state: '', status: '', expertise: '' });
  
  // --- Modal States ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);

  // --- Form States (Stepper) ---
  const [addStep, setAddStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormState = {
    profileImage: null,
    profileImagePreview: null,
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    state: '',
    city: '',
    nearbyCities: [],
    status: 'Available',
    experience: '',
    expertise: '',
    equipment: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // For country-state-city
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [allIndianCities, setAllIndianCities] = useState([]);
  const [nearbyCityInput, setNearbyCityInput] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);

  // Observer reference for infinite scroll
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Handle Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
      setPhotographers([]); // Clear old list
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Initialize Indian States & All Cities
  useEffect(() => {
    const states = State.getStatesOfCountry('IN');
    setAvailableStates(states);
    setAllIndianCities(City.getCitiesOfCountry('IN'));
  }, []);

  // Update Cities when State changes in form
  useEffect(() => {
    if (formData.state) {
      const stateCode = availableStates.find(s => s.name === formData.state)?.isoCode;
      if (stateCode) {
        setAvailableCities(City.getCitiesOfState('IN', stateCode));
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [formData.state, availableStates]);

  // Fetch Photographers
  const fetchPhotographers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      let queryParams = `?page=${page}&limit=9`;
      if (debouncedSearch) queryParams += `&search=${encodeURIComponent(debouncedSearch)}`;
      if (filters.state) queryParams += `&state=${encodeURIComponent(filters.state)}`;
      if (filters.status) queryParams += `&status=${encodeURIComponent(filters.status)}`;
      if (filters.expertise) queryParams += `&expertise=${encodeURIComponent(filters.expertise)}`;

      const response = await fetch(`http://localhost:5000/api/photographers${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        if (page === 1) {
          setPhotographers(data.data);
        } else {
          setPhotographers(prev => [...prev, ...data.data]);
        }
        setTotalCount(data.total);
        setHasMore(data.currentPage < data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching photographers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotographers();
  }, [page, debouncedSearch, filters]);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      const onlyNums = value.replace(/\D/g, '');
      const mobileVal = onlyNums.slice(-10);
      setFormData(prev => ({ ...prev, [name]: mobileVal }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleNearbyCityChange = (e) => {
    const val = e.target.value;
    setNearbyCityInput(val);
    if (val.trim().length > 1) {
      const filtered = allIndianCities.filter(c => c.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
      setCitySuggestions(filtered);
    } else {
      setCitySuggestions([]);
    }
  };

  const addNearbyCity = (cityName) => {
    if (!formData.nearbyCities.includes(cityName)) {
      setFormData(prev => ({ ...prev, nearbyCities: [...prev.nearbyCities, cityName] }));
    }
    setNearbyCityInput('');
    setCitySuggestions([]);
  };

  const removeNearbyCity = (cityName) => {
    setFormData(prev => ({ ...prev, nearbyCities: prev.nearbyCities.filter(c => c !== cityName) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addStep !== 3) {
      setAddStep(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'profileImage' && key !== 'profileImagePreview' && key !== 'nearbyCities') {
          data.append(key, formData[key]);
        }
      });
      
      // Handle nearbyCities (already an array now)
      data.append('nearbyCities', JSON.stringify(formData.nearbyCities));

      // Append file if exists
      if (formData.profileImage instanceof File) {
        data.append('profileImage', formData.profileImage);
      }

      const url = selectedPhotographer 
        ? `http://localhost:5000/api/photographers/${selectedPhotographer._id}`
        : 'http://localhost:5000/api/photographers';
      const method = selectedPhotographer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });

      const result = await response.json();
      if (result.success) {
        setIsAddModalOpen(false);
        setFormData(initialFormState);
        setAddStep(1);
        setSelectedPhotographer(null);
        setPage(1);
        fetchPhotographers();
      } else {
        alert(result.message || 'Failed to save');
      }
    } catch (err) {
      console.error('Error saving photographer:', err);
      alert('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPhotographer) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/photographers/${selectedPhotographer._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setPhotographers(prev => prev.filter(p => p._id !== selectedPhotographer._id));
        setTotalCount(prev => prev - 1);
        setIsDeleteModalOpen(false);
        setSelectedPhotographer(null);
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const openEditModal = (photographer) => {
    setSelectedPhotographer(photographer);
    setFormData({
      ...photographer,
      profileImage: null, // Keep existing if not changed
      profileImagePreview: photographer.profileImage,
      nearbyCities: photographer.nearbyCities || []
    });
    setAddStep(1);
    setIsAddModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Photographers</h1>
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-xs font-bold border border-purple-100">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              {totalCount} Total Profiles
            </div>
          </div>
          <p className="text-gray-500 mt-1">Manage your photographers here.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
          {/* Sleek Search Pill */}
          <div className="relative flex items-center justify-end">
            <div className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center bg-white rounded-full border ${isSearchOpen ? 'w-64 md:w-80 border-gray-200 opacity-100 pr-12 shadow-sm' : 'w-0 border-transparent opacity-0'}`}>
              <input 
                type="text" 
                placeholder="Search by name, email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-5 py-2.5 bg-transparent text-gray-700 text-sm focus:outline-none placeholder-gray-400 font-medium tracking-wide"
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`absolute right-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isSearchOpen ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
            >
              <FiSearch className="text-lg" />
            </button>
          </div>

          {/* Filter Button */}
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 shadow-sm ${filters.state || filters.status || filters.expertise ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <FiFilter className="text-lg" />
          </button>

          {/* Add Button */}
          <button 
            onClick={() => {
              setSelectedPhotographer(null);
              setFormData(initialFormState);
              setAddStep(1);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-gray-900 text-white hover:bg-black px-6 h-11 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap tracking-wide"
          >
            <FiPlus className="text-lg" />
            Add Profile
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {photographers.map((p, index) => {
          const isLast = index === photographers.length - 1;
          const statusColors = {
            'Available': 'bg-[#eefcf4] text-[#1a8549] border-[#c0ebd1]',
            'Booked': 'bg-[#fefce8] text-[#a16207] border-[#fef08a]',
            'On Leave': 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]'
          };
          
          return (
            <div 
              key={p._id}
              ref={isLast ? lastElementRef : null}
              className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] hover:border-purple-300 transition-all duration-300 flex flex-col relative group"
            >
              <div className="flex items-center gap-4 mb-7 relative z-10 mt-2">
                <div className="w-14 h-14 rounded-full bg-slate-50 shadow-sm border border-slate-100 shrink-0 overflow-hidden ring-4 ring-slate-50/50">
                  {p.profileImage ? (
                    <img src={p.profileImage} alt={p.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                      {p.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif font-black text-slate-900 text-base tracking-tight truncate">{p.fullName}</h3>
                    <div className={`shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${statusColors[p.status]}`}>
                      {p.status}
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium text-sm truncate flex items-center gap-1.5 mt-1">
                    <FaMapMarkerAlt className="shrink-0 text-slate-400 text-xs" />
                    {p.city}, {p.state}
                  </p>
                </div>
              </div>

              {/* Expertise Capsule */}
              <div className="mb-8 relative z-10 flex items-center">
                <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expertise</span>
                  <span className="w-[1px] h-4 bg-slate-200 rounded-full"></span>
                  <span className="text-sm font-semibold text-slate-800 line-clamp-1">{p.expertise || 'General'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto relative z-10">
                <div className="flex gap-3">
                  <button 
                    onClick={() => openEditModal(p)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors bg-white hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                  <button 
                    onClick={() => { setSelectedPhotographer(p); setIsDeleteModalOpen(true); }}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors bg-white hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-200 shadow-sm"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
                <button 
                  onClick={() => { setSelectedPhotographer(p); setIsViewModalOpen(true); }}
                  className="w-11 h-11 flex items-center justify-center text-slate-600 hover:text-purple-600 transition-colors bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 rounded-full shadow-sm"
                >
                  <FiEye className="text-lg" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}

      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsFilterModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-xl text-gray-900">Filter Profiles</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400 hover:text-gray-900"><FiX className="text-xl" /></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium text-gray-700"
                  value={filters.state}
                  onChange={e => setFilters(prev => ({...prev, state: e.target.value}))}
                >
                  <option value="">All States</option>
                  {availableStates.map(st => (
                    <option key={st.isoCode} value={st.name}>{st.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium text-gray-700"
                  value={filters.status}
                  onChange={e => setFilters(prev => ({...prev, status: e.target.value}))}
                >
                  <option value="">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expertise</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium text-gray-700"
                  value={filters.expertise}
                  onChange={e => setFilters(prev => ({...prev, expertise: e.target.value}))}
                >
                  <option value="">Any Expertise</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Event">Event</option>
                  <option value="Product">Product</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => { setFilters({ state: '', status: '', expertise: '' }); setPage(1); setPhotographers([]); setIsFilterModalOpen(false); }}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => { setPage(1); setPhotographers([]); setIsFilterModalOpen(false); }}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Photographer Modal (Stepper) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-black text-gray-900">
                {selectedPhotographer ? 'Edit Photographer' : 'Add Photographer'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-2"><FiX className="text-xl" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {/* Stepper Dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map(step => (
                  <div key={step} className={`h-2 rounded-full transition-all duration-300 ${addStep === step ? 'w-8 bg-purple-600' : 'w-2 bg-gray-200'}`} />
                ))}
              </div>

              <form id="photographerForm" onSubmit={handleSubmit} className="space-y-5">
                {addStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                        {formData.profileImagePreview ? (
                          <img src={formData.profileImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <FiUpload className="text-2xl text-gray-400 group-hover:text-purple-500 transition-colors" />
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Upload Profile Photo</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile *</label>
                        <input type="text" name="mobile" required value={formData.mobile} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {addStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State *</label>
                          <select name="state" required value={formData.state} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300">
                            <option value="">Select State</option>
                            {availableStates.map(st => (
                              <option key={st.isoCode} value={st.name}>{st.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City *</label>
                          <select name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300">
                            <option value="">Select City</option>
                            {availableCities.map(ct => (
                              <option key={ct.name} value={ct.name}>{ct.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nearby Cities</label>
                        <div className="bg-white border border-gray-200 rounded-xl p-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-sm flex flex-wrap gap-2 items-center">
                          {formData.nearbyCities.map(city => (
                            <span key={city} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              {city}
                              <button type="button" onClick={() => removeNearbyCity(city)} className="hover:text-red-500"><FiX /></button>
                            </span>
                          ))}
                          <div className="relative flex-1 min-w-[150px]">
                            <input 
                              type="text" 
                              placeholder="e.g. Noida, Delhi..." 
                              value={nearbyCityInput} 
                              onChange={handleNearbyCityChange}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && nearbyCityInput.trim()) {
                                  e.preventDefault();
                                  if (citySuggestions.length > 0) {
                                    addNearbyCity(citySuggestions[0].name);
                                  } else {
                                    addNearbyCity(nearbyCityInput.trim());
                                  }
                                }
                              }}
                              className="w-full bg-transparent outline-none text-sm px-2 py-1"
                            />
                            {citySuggestions.length > 0 && (
                              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                                {citySuggestions.map(city => (
                                  <div 
                                    key={`${city.name}-${city.stateCode}`} 
                                    className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 cursor-pointer text-sm font-medium transition-colors"
                                    onClick={() => addNearbyCity(city.name)}
                                  >
                                    {city.name}, {city.stateCode}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {addStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300">
                          <option value="Available">Available</option>
                          <option value="Booked">Booked</option>
                          <option value="On Leave">On Leave</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Experience (Years/Details)</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expertise / Categories</label>
                        <input type="text" name="expertise" placeholder="e.g. Wedding, Fashion, Portrait" value={formData.expertise} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Equipment / Cameras</label>
                        <textarea name="equipment" rows="3" value={formData.equipment} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm hover:border-gray-300 resize-none"></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50 rounded-b-3xl">
              {addStep > 1 && (
                <button type="button" onClick={() => setAddStep(prev => prev - 1)} className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  Back
                </button>
              )}
              <button 
                type="submit" 
                form="photographerForm" 
                disabled={isSubmitting}
                className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                {addStep < 3 ? 'Next Step' : isSubmitting ? 'Saving...' : selectedPhotographer ? 'Update Photographer' : 'Add Photographer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Photographer Modal */}
      {isViewModalOpen && selectedPhotographer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsViewModalOpen(false)}></div>
          <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-[32px] w-full max-w-5xl shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left Sidebar - Profile Summary */}
            <div className="md:w-[35%] bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 p-10 flex flex-col items-center text-center relative overflow-hidden">
              {/* Decorative subtle glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none"></div>

              <button onClick={() => setIsViewModalOpen(false)} className="md:hidden absolute top-4 right-4 text-white/50 hover:bg-white/10 p-2 rounded-full transition-colors z-10">
                <FiX className="text-xl" />
              </button>
              
              <div className="w-32 h-32 rounded-full bg-white shadow-[0_0_40px_rgba(168,85,247,0.4)] mx-auto overflow-hidden relative mb-6 ring-4 ring-white/20 z-10 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-indigo-100">
                  {selectedPhotographer.profileImage ? (
                    <img src={selectedPhotographer.profileImage} alt={selectedPhotographer.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-indigo-900">
                      {selectedPhotographer.fullName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-serif font-black text-white mb-1 tracking-tight z-10">{selectedPhotographer.fullName}</h3>
              <p className="text-purple-200 font-medium text-[13px] mb-8 uppercase tracking-widest z-10">{selectedPhotographer.city}, {selectedPhotographer.state}</p>
              
              <div className={`z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg mb-10 ${
                selectedPhotographer.status === 'Available' ? 'bg-[#eefcf4] text-[#1a8549]' : 
                selectedPhotographer.status === 'Booked' ? 'bg-[#fefce8] text-[#a16207]' : 
                'bg-red-50 text-red-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  selectedPhotographer.status === 'Available' ? 'bg-green-500 animate-pulse' : 
                  selectedPhotographer.status === 'Booked' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}></span>
                {selectedPhotographer.status}
              </div>

              <div className="w-full space-y-4 mt-auto z-10">
                <a href={`tel:${selectedPhotographer.mobile}`} className="flex items-center justify-center gap-3 w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/10 backdrop-blur-md transition-all shadow-sm">
                  <FaPhoneAlt className="text-purple-200" /> {selectedPhotographer.mobile}
                </a>
                <a href={`mailto:${selectedPhotographer.email}`} className="flex items-center justify-center gap-3 w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-bold text-sm rounded-2xl shadow-[0_10px_20px_-10px_rgba(168,85,247,0.6)] transition-all overflow-hidden px-4">
                  <FaEnvelope className="text-purple-100 shrink-0" /> <span className="truncate">{selectedPhotographer.email}</span>
                </a>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="md:w-[65%] p-10 overflow-y-auto relative bg-white">
              <button onClick={() => setIsViewModalOpen(false)} className="hidden md:flex absolute top-8 right-8 w-10 h-10 items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors border border-slate-200 shadow-sm">
                <FiX className="text-xl" />
              </button>

              <div className="pr-12">
                <h4 className="text-2xl font-serif font-black text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-4">Professional Overview</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> Experience
                    </p>
                    <p className="text-slate-900 font-black text-lg">{selectedPhotographer.experience || 'Not specified'}{selectedPhotographer.experience && !selectedPhotographer.experience.toLowerCase().includes('year') ? ' Years' : ''}</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span> Expertise
                    </p>
                    <p className="text-slate-900 font-black text-lg">{selectedPhotographer.expertise || 'General Photography'}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="p-1.5 rounded-md bg-slate-100"><FaCamera className="text-slate-500 text-xs" /></span> Equipment & Gear
                    </h5>
                    <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 text-[13px] text-slate-600 leading-relaxed font-medium">
                      {selectedPhotographer.equipment || 'No equipment details provided.'}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="p-1.5 rounded-md bg-slate-100"><FaMapMarkerAlt className="text-slate-500 text-xs" /></span> Full Address & Service Areas
                    </h5>
                    <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[13px] text-slate-700 font-semibold leading-relaxed mb-5 pb-5 border-b border-slate-200 border-dashed">
                        {selectedPhotographer.address ? `${selectedPhotographer.address}, ` : ''}{selectedPhotographer.city}, {selectedPhotographer.state}, India
                      </p>
                      
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nearby Service Cities</p>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedPhotographer.nearbyCities && selectedPhotographer.nearbyCities.length > 0 ? (
                          selectedPhotographer.nearbyCities.map(city => (
                            <span key={city} className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-700 shadow-sm">{city}</span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-xs">No extra cities specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-3xl text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Photographer?</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to remove {selectedPhotographer?.fullName}? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PhotographersTab;
