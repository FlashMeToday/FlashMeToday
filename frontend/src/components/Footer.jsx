import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo/logo.webp';

const Footer = () => {
  return (
    <footer className="relative bg-[#080112] pt-12 lg:pt-24 pb-8 overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_-20px_rgba(139,38,217,0.15)]">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50 blur-[1px]"></div>
      
      <div className="absolute bottom-[-2%] left-0 right-0 hidden md:flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <span className="text-[12vw] font-black tracking-tight text-white uppercase leading-none whitespace-nowrap blur-[3px]">
          FLASHMETODAY
        </span>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-10 lg:mb-20">
          
          <div className="col-span-1 lg:col-span-6 pr-0 lg:pr-12 flex flex-col justify-center items-start">
            <a href="#" className="inline-block mb-4">
              <img loading="lazy" src={logo} alt="FlashMeToday" className="h-12 lg:h-16 w-auto object-contain" />
            </a>
            <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed mb-10 max-w-xl">
              Capturing your most precious moments with absolute elegance and cutting-edge creativity. We turn your memories into timeless, premium art.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <SocialLink icon={<FaInstagram />} />
              <SocialLink icon={<FaFacebookF />} />
              <SocialLink icon={<FaTwitter />} />
              <SocialLink icon={<FaLinkedinIn />} />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <h3 className="font-semibold text-white tracking-wide mb-3 uppercase text-xs opacity-80">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <FooterLink text="Home" to="/" />
              <FooterLink text="About Studio" to="/" />
              <FooterLink text="Our Portfolio" to="/portfolio" />
              <FooterLink text="Book a Session" to="/booking" />
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-4">
            <h3 className="font-semibold text-white tracking-wide mb-3 uppercase text-xs opacity-80">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Join our exclusive list for premium offers, early bookings, and photography inspiration.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-full pl-5 pr-[110px] py-3.5 focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/10 transition-all backdrop-blur-sm"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[var(--color-primary)] hover:bg-[#721bb8] text-white text-sm font-semibold px-6 rounded-full transition-all shadow-[0_0_15px_rgba(139,38,217,0.3)] hover:shadow-[0_0_20px_rgba(139,38,217,0.5)] cursor-pointer flex items-center justify-center gap-2"
              >
                Subscribe <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium tracking-wide">
            © {new Date().getFullYear()} <span className="font-bold text-white">FlashMeToday</span>. Crafted with excellence.
          </p>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white hover:[text-shadow:0_0_0.6px_white] transition-all duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white hover:[text-shadow:0_0_0.6px_white] transition-all duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, to }) => (
  <li>
    <Link to={to} className="text-sm font-medium text-gray-400 hover:text-white hover:font-bold transition-all duration-300 flex items-center gap-2 group">
      <span className="w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-3"></span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
    </Link>
  </li>
);

const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(139,38,217,0.4)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
    {icon}
  </a>
);

export default Footer;
