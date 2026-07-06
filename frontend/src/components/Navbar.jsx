import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaPhone } from 'react-icons/fa6';
import { FaHome, FaInfoCircle, FaHeart, FaStar, FaBriefcase, FaCamera, FaRing, FaBaby, FaChild, FaPlane, FaBirthdayCake, FaUtensils, FaCouch, FaBox, FaBuilding, FaVideo, FaUserTie, FaPenNib } from 'react-icons/fa';
import logo from '../assets/Logo/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const location = useLocation();

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
    { name: 'Pre Wedding', href: '/pre-wedding', icon: FaRing },
    { name: 'Maternity', href: '/maternity', icon: FaBaby },
    { name: 'Baby & Kids', href: '/baby-and-kids', icon: FaChild },
    { name: 'Vacations', href: '/vacations', icon: FaPlane },
    { name: 'Parties', href: '/parties', icon: FaBirthdayCake },
  ];

  const businessLinks = [
    { name: 'Food', href: '/food', icon: FaUtensils },
    { name: 'Interior', href: '/interior', icon: FaCouch },
    { name: 'Product Shoot', href: '/product-shoot', icon: FaBox },
    { name: 'Corporate Events', href: '/corporate-events', icon: FaBuilding },
    { name: 'Brand Video', href: '/brand-video', icon: FaVideo },
    { name: 'Profile & Headshot', href: '/profile-and-headshot', icon: FaUserTie },
  ];

  const NavLink = ({ title, href, icon: Icon }) => {
    const isActive = href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
    return (
      <Link
        to={href}
        className={`relative flex items-center gap-2 transition-colors duration-300 font-medium text-[15px] px-4 xl:px-5 py-2 rounded-full ${
          isActive
            ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20'
            : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]'
        }`}
      >
        {Icon && <Icon className="text-base" />}
        <span className="mt-[1px]">{title}</span>
      </Link>
    );
  };

  const Dropdown = ({ title, items, dropdownKey, icon: Icon }) => {
    const isOpen = activeDropdown === dropdownKey;
    const isParentActive = items.some(item => item.href !== '#' && (location.pathname === item.href || location.pathname.startsWith(item.href + '/')));

    return (
      <div 
        className="relative"
        onMouseEnter={() => setActiveDropdown(dropdownKey)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className={`flex items-center gap-2 font-medium text-[15px] transition-colors duration-300 px-4 xl:px-5 py-2 rounded-full ${
          isParentActive
            ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20'
            : isOpen
              ? 'bg-gray-100 text-[var(--color-primary)]'
              : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]'
        }`}>
          {Icon && <Icon className="text-base" />}
          {title}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-0.5"
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
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 flex flex-col gap-1 overflow-hidden">
                {items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  const isItemActive = item.href !== '#' && (location.pathname === item.href || location.pathname.startsWith(item.href + '/'));
                  return (
                    <Link
                      key={idx}
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${isItemActive ? 'bg-[var(--color-primary)] text-white shadow-md font-medium' : 'text-gray-600 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'}`}
                    >
                      {ItemIcon && <ItemIcon className={`text-base ${isItemActive ? 'text-white' : 'text-[var(--color-primary)]/80'}`} />}
                      {item.name}
                    </Link>
                  );
                })}
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 bg-white border-b-2 border-[var(--color-primary)]/40 ${
          scrolled ? 'shadow-md border-[var(--color-primary)]/60' : 'shadow-sm'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="inline-block">
              <img src={logo} alt="FlashMeToday" className="h-10 lg:h-12 w-auto object-contain" />
            </a>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink title="Home" href="/" icon={FaHome} />
            <NavLink title="About" href="/about" icon={FaInfoCircle} />
            <NavLink title="Weddings" href="/wedding" icon={FaHeart} />
            <Dropdown title="Occasions" items={occasionsLinks} dropdownKey="occasions" icon={FaStar} />
            <Dropdown title="Business" items={businessLinks} dropdownKey="business" icon={FaBriefcase} />
            <NavLink title="Portfolio" href="#" icon={FaCamera} />
            <NavLink title="Blogs" href="/blogs" icon={FaPenNib} />
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
            className="fixed top-[62px] left-0 right-0 bg-white shadow-xl z-50 lg:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium py-1.5"><FaHome className="text-gray-400" /> Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium py-1.5"><FaInfoCircle className="text-gray-400" /> About</Link>
              <Link to="/wedding" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium py-1.5"><FaHeart className="text-gray-400" /> Weddings</Link>
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleMobileDropdown('occasions')}
                  className={`flex items-center justify-between font-medium py-1.5 ${mobileActiveDropdown === 'occasions' || occasionsLinks.some(l => l.href !== '#' && (location.pathname === l.href || location.pathname.startsWith(l.href + '/'))) ? 'text-[var(--color-primary)]' : 'text-gray-700'}`}
                >
                  <span className="flex items-center gap-3"><FaStar className={mobileActiveDropdown === 'occasions' || occasionsLinks.some(l => l.href !== '#' && (location.pathname === l.href || location.pathname.startsWith(l.href + '/'))) ? "text-[var(--color-primary)]" : "text-gray-400"} /> Occasions</span>
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
                        {occasionsLinks.map((link) => {
                          const ItemIcon = link.icon;
                          const isItemActive = link.href !== '#' && (location.pathname === link.href || location.pathname.startsWith(link.href + '/'));
                          return (
                            <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm ${isItemActive ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-500'}`}>
                              {ItemIcon && <ItemIcon className={isItemActive ? 'text-[var(--color-primary)]' : 'text-gray-400'} />} {link.name}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleMobileDropdown('business')}
                  className={`flex items-center justify-between font-medium py-1.5 ${mobileActiveDropdown === 'business' || businessLinks.some(l => l.href !== '#' && (location.pathname === l.href || location.pathname.startsWith(l.href + '/'))) ? 'text-[var(--color-primary)]' : 'text-gray-700'}`}
                >
                  <span className="flex items-center gap-3"><FaBriefcase className={mobileActiveDropdown === 'business' || businessLinks.some(l => l.href !== '#' && (location.pathname === l.href || location.pathname.startsWith(l.href + '/'))) ? "text-[var(--color-primary)]" : "text-gray-400"} /> Business</span>
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
                        {businessLinks.map((link) => {
                          const ItemIcon = link.icon;
                          const isItemActive = link.href !== '#' && (location.pathname === link.href || location.pathname.startsWith(link.href + '/'));
                          return (
                            <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm ${isItemActive ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-500'}`}>
                              {ItemIcon && <ItemIcon className={isItemActive ? 'text-[var(--color-primary)]' : 'text-gray-400'} />} {link.name}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium py-1.5"><FaCamera className="text-gray-400" /> Portfolio</Link>
              <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium py-1.5"><FaPenNib className="text-gray-400" /> Blogs</Link>
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
