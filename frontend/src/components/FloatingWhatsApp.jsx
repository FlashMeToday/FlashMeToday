import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210" 
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] hover:bg-[#1C9D4B] text-white rounded-full shadow-lg transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </motion.a>
  );
};

export default FloatingWhatsApp;
