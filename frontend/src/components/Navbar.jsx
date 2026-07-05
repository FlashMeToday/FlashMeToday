import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaPhone } from 'react-icons/fa6';
import logo from '../assets/Logo/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  const toggleMobileDropdown = (key) => {
    setMobileActiveDropdown(mobileActiveDropdown === key ? null : key);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const occasionsLinks = [
    { name: 'Pre Wedding', href: '#' },
    { name: 'Maternity', href: '#' },
    { name: 'Baby & Kids', href: '#' },
    { name: 'Vacations', href: '#' },
    { name: 'Parties', href: '#' },
  ];

  const businessLinks = [
    { name: 'Food', href: '#' },
    { name: 'Interior', href: '#' },
    { name: 'Product Shoot', href: '#' },
    { name: 'Corporate Events', href: '#' },
    { name: 'Brand Video', href: '#' },
    { name: 'Profile & Headshot', href: '#' },
  ];

  const NavLink = ({ title, href }) => {
    const isActive = activeLink === title;
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault(); // prevent default for dummy links
          setActiveLink(title);
        }}
        className={`relative transition-colors duration-300 font-medium text-[15px] px-5 py-2 rounded-full ${
          isActive
            ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20'
            : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]'
        }`}
      >
        {title}
      </a>
    );
  };

  const Dropdown = ({ title, items, dropdownKey }) => {
    const isOpen = activeDropdown === dropdownKey;

    return (
      <div 
        className="relative"
        onMouseEnter={() => setActiveDropdown(dropdownKey)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className={`flex items-center gap-1 font-medium text-[15px] transition-colors duration-300 px-5 py-2 rounded-full ${isOpen ? 'bg-gray-100 text-[var(--color-primary)]' : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]'}`}>
          {title}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className="mt-[2px]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 z-50"
            >
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 overflow-hidden">
                {items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="inline-block group">
              <img src={logo} alt="FlashMeToday" className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavLink title="Home" href="#" />
            <NavLink title="About" href="#" />
            <NavLink title="Weddings" href="#" />
            <Dropdown title="Occasions" items={occasionsLinks} dropdownKey="occasions" />
            <Dropdown title="Business" items={businessLinks} dropdownKey="business" />
            <NavLink title="Portfolio" href="#" />
          </nav>

          {/* Right: Contact Us Button */}
          <div className="hidden lg:flex flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-[var(--color-primary)] hover:bg-[#721bb8] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors shadow-lg shadow-[var(--color-primary)]/30 flex items-center gap-2"
            >
              <FaPhone className="text-sm" />
              Contact Us
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown (Simplified for this exercise) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 right-0 bg-white shadow-xl z-40 lg:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              <a href="#" className="text-gray-700 font-medium py-1.5">Home</a>
              <a href="#" className="text-gray-700 font-medium py-1.5">About</a>
              <a href="#" className="text-gray-700 font-medium py-1.5">Weddings</a>
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleMobileDropdown('occasions')}
                  className={`flex items-center justify-between font-medium py-1.5 ${mobileActiveDropdown === 'occasions' ? 'text-[var(--color-primary)]' : 'text-gray-700'}`}
                >
                  Occasions
                  <motion.div animate={{ rotate: mobileActiveDropdown === 'occasions' ? 180 : 0 }}>
                    <FiChevronDown />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === 'occasions' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 flex flex-col gap-3 border-l-2 border-gray-100 my-1">
                        {occasionsLinks.map((link) => (
                          <a key={link.name} href={link.href} className="text-gray-500 text-sm">{link.name}</a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleMobileDropdown('business')}
                  className={`flex items-center justify-between font-medium py-1.5 ${mobileActiveDropdown === 'business' ? 'text-[var(--color-primary)]' : 'text-gray-700'}`}
                >
                  Business
                  <motion.div animate={{ rotate: mobileActiveDropdown === 'business' ? 180 : 0 }}>
                    <FiChevronDown />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === 'business' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 flex flex-col gap-3 border-l-2 border-gray-100 my-1">
                        {businessLinks.map((link) => (
                          <a key={link.name} href={link.href} className="text-gray-500 text-sm">{link.name}</a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="#" className="text-gray-700 font-medium py-1.5">Portfolio</a>
              <a href="#" className="mt-3 bg-[var(--color-primary)] text-white text-center flex items-center justify-center gap-2 py-3 rounded-xl font-medium">
                <FaPhone size={14} /> Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
