import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Terms & Conditions</h1>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p><strong>Effective Date:</strong> 1 July 2026</p>
            <p>These terms and conditions outline the rules and regulations for the use of FlashMeToday's Website.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use FlashMeToday if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, FlashMeToday and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>publishing any Website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>publicly performing and/or showing any Website material;</li>
              <li>using this Website in any way that is or may be damaging to this Website;</li>
              <li>using this Website in any way that impacts user access to this Website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Bookings and Payments</h2>
            <p>All bookings made through our platform are subject to availability. Prices and packages may change without prior notice. Full terms of payment, cancellations, and refunds are provided during the booking process.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Governing Law & Jurisdiction</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State/Country, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
