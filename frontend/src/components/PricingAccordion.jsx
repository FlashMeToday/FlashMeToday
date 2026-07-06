import React from 'react';

const PricingAccordion = ({ plans }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 md:mt-8 relative z-10">
      {plans.map((plan, index) => {
        const isPremium = index === 1;
        return (
          <div 
            key={index} 
            className={`w-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ease-out group hover:border-[var(--color-primary)] ${
              isPremium 
                ? 'bg-gray-900 border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-100 lg:scale-105 z-20' 
                : 'bg-white border-2 md:border border-[var(--color-primary)] md:border-gray-100 shadow-xl'
            }`}
          >
            {/* Header Area */}
            <div className={`p-6 lg:p-8 border-b relative ${isPremium ? 'border-gray-800' : 'border-gray-50'}`}>
              {isPremium && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-bl-3xl shadow-md">
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl lg:text-3xl font-playfair italic tracking-wide mb-2 ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-xs lg:text-sm font-light leading-relaxed h-10 ${isPremium ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              
              <div className="mt-6 flex items-end gap-2">
                <span className={`text-4xl md:text-5xl font-sans font-light tracking-tighter ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                  ₹{plan.offerPrice}
                </span>
                <span className={`text-sm line-through decoration-1 pb-2 font-light ${isPremium ? 'text-gray-600' : 'text-gray-400'}`}>
                  ₹{plan.originalPrice}
                </span>
              </div>
            </div>

            {/* Features Area */}
            <div className={`p-6 lg:p-8 flex-1 flex flex-col ${isPremium ? 'bg-gray-900/40' : 'bg-gray-50/30'}`}>
              <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 ${isPremium ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)]'}`}>
                What's Included
              </p>
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isPremium ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary)]'}`} />
                    <span className={`text-sm font-light leading-relaxed ${isPremium ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer ${
                  isPremium 
                    ? 'bg-white text-gray-900 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)]' 
                    : 'bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-900 hover:border-gray-900 hover:text-white'
                }`}
              >
                Reserve Date
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingAccordion;
