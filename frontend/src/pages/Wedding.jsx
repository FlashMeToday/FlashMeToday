import React from 'react';
import { Link } from 'react-router-dom';
import ServicePageLayout from '../layouts/ServicePageLayout';
import PricingAccordion from '../components/PricingAccordion';
import weddingHeroImg from '../assets/Images/Wedding/HeroBG.webp';
import weddingDetailImg from '../assets/Images/Wedding/DetailBG.webp';
import idea1 from '../assets/Images/Wedding/1.webp';
import idea2 from '../assets/Images/Wedding/2.webp';
import idea3 from '../assets/Images/Wedding/3.webp';
import idea4 from '../assets/Images/Wedding/4.webp';
import idea5 from '../assets/Images/Wedding/5.webp';
import idea6 from '../assets/Images/Wedding/6.webp';
import idea7 from '../assets/Images/Wedding/7.webp';
import idea8 from '../assets/Images/Wedding/8.webp';
import idea9 from '../assets/Images/Wedding/9.webp';
import idea10 from '../assets/Images/Wedding/10.webp';
import idea11 from '../assets/Images/Wedding/11.webp';
import idea12 from '../assets/Images/Wedding/12.webp';
import { FaMapMarkerAlt, FaTag, FaRegLightbulb, FaInfoCircle } from 'react-icons/fa';

const weddingPlans = [
  {
    name: "Royal Wedding",
    description: "Photography + Videography + Drone with a 5-6 member team.",
    features: [
      "Covers 3 functions (Sagan, rituals, wedding, etc.).",
      "Team includes: 1 traditional photographer, 1 traditional videographer, 1 candid photographer, and 2 cinematographers.",
      "Deliverables include: 1-2 minute teaser, 3-4 minute highlights, 3-4 hour traditional video, 800-1000 images, and 2 Instagram reels."
    ],
    equipment: "Full-frame cameras (Sony, Canon), lens kit, gimbal, lights, etc.",
    originalPrice: "1,70,000",
    offerPrice: "1,40,000"
  },
  {
    name: "Signature Wedding",
    description: "Photography + Videography + Drone with a 6-7 member team.",
    features: [
      "Covers 5 functions (Sagan, rituals, wedding, etc.).",
      "Team includes: 1 traditional photographer, 1 traditional videographer, 2 candid photographers, and 1 cinematographer.",
      "Deliverables include: 2-3 minute teaser, 4-5 minute highlights, 4-5 hour traditional video, 1000-1200 images, and 3 Instagram reels."
    ],
    equipment: "Full-frame cameras (Sony, Canon), lens kit, gimbal, lights, etc.",
    originalPrice: "3,00,000",
    offerPrice: "2,40,000"
  },
  {
    name: "Maharaja Wedding",
    description: "Photography + Videography + Drone + Selfie booth + Flatframe with a 7-8 member team.",
    features: [
      "Covers 7 functions (Sagan, rituals, wedding, etc.).",
      "Team includes: 1 traditional photographer, 1 traditional videographer, 2 candid photographers, and 2 cinematographers.",
      "Deliverables include: 4 minute teaser, 5 minute highlights, 5-6 hour traditional video, 1200-1500 images, and 4 Instagram reels."
    ],
    equipment: "Full-frame cameras (Sony, Canon), lens kit, gimbal, lights, etc.",
    originalPrice: "4,00,000",
    offerPrice: "3,40,000"
  }
];

const photoshootIdeas = [
  idea1, idea2, idea3, idea4,
  idea5, idea6, idea7, idea8,
  idea9, idea10, idea11, idea12
];

const availableCities = [
  "Bahadurgarh", "Delhi", "Faridabad", "Ghaziabad",
  "Greater Noida", "Gurugram", "Loni", "Meerut",
  "Najafgarh", "Nangloi Jat", "Narela", "New Delhi",
  "Noida", "Sonipat"
];

const Wedding = () => {
  return (
    <ServicePageLayout
      heroImage={weddingHeroImg}
      title="Wedding"
      subtitle="Preserve your most precious moments for eternity."
      menuItems={[
        { name: 'Pricing Plans', shortName: 'Plans', icon: FaTag },
        { name: 'Ideas', icon: FaRegLightbulb },
        { name: 'Details', icon: FaInfoCircle },
        { name: 'Cities', icon: FaMapMarkerAlt }
      ]}
    >
      <div className="flex flex-col gap-4 md:gap-32">

        <section id="pricing-plans" className="w-full scroll-mt-40 flex flex-col items-center">
          <div className="w-full px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-gray-900 w-full px-6 md:px-12 py-4 md:py-8 flex flex-col items-center justify-center text-center shadow-2xl mb-4 md:mb-8 group md:-mt-16">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-[var(--color-primary)]/20 blur-[100px] group-hover:bg-[var(--color-primary)]/30 transition-all duration-700 ease-in-out transform group-hover:scale-110"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-blue-500/20 blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700 ease-in-out transform group-hover:-translate-x-10"></div>
              </div>

              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                style={{
                  backgroundImage: 'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                  backgroundSize: '80px 80px',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)'
                }}
              ></div>

              <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
                <p className="text-[var(--color-primary)] font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-3">
                  Transparent Pricing
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-4 tracking-wide drop-shadow-sm">
                  Pricing Plans<span className="text-[var(--color-primary)] italic">.</span>
                </h2>
                <p className="text-gray-300 text-base md:text-lg font-light tracking-wide max-w-2xl leading-relaxed mb-6">
                  Unbeatable value at pocket-friendly prices — no second thoughts needed. Get a full refund if you cancel within <strong className="text-white font-medium">48 hours</strong> of booking.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md p-2 md:p-2 rounded-3xl sm:rounded-full border border-white/10 shadow-xl w-3/4 max-w-xs sm:w-auto sm:max-w-none">
                  <p className="text-gray-300 text-xs md:text-sm font-medium px-2 pt-2 pb-1 sm:pl-6 sm:pr-2 sm:py-2 text-center">
                    Need something unique?
                  </p>
                  <Link to="/contact?concern=Personalized%20Shoot%20Plan" className="bg-white hover:bg-[var(--color-primary)] text-gray-900 hover:text-white font-sans font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 text-xs md:text-sm tracking-wide shadow-md w-full sm:w-auto cursor-pointer inline-block text-center">
                    Get Custom Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8">
            <PricingAccordion plans={weddingPlans} serviceName="Wedding" />
          </div>
        </section>

        <section id="ideas" className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 scroll-mt-40">
          <div className="w-full flex flex-col items-center text-center mb-8 mt-0 md:-mt-16">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></span>
              <p className="text-gray-600 font-sans font-bold tracking-[0.2em] uppercase text-[10px] mt-0.5">
                Timeless Moments Captured
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-gray-900 tracking-wide">
              Curated <span className="text-[var(--color-primary)]">Ideas.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {photoshootIdeas.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group shadow-sm bg-gray-100"
              >
                <img loading="lazy" src={img}
                  alt={`Idea ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 md:hidden"></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex flex-col justify-end p-5">
                  <span className="text-white font-sans font-medium tracking-[0.2em] uppercase text-xs md:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    Image {idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-12 flex justify-center">
            <Link to="/portfolio" className="bg-gray-900 text-white hover:bg-[var(--color-primary)] font-sans font-bold py-3.5 px-8 rounded-full transition-all duration-300 text-xs tracking-widest uppercase shadow-md cursor-pointer">
              Explore Full Gallery
            </Link>
          </div>
        </section>

        <section id="details" className="relative w-full h-[50vh] md:h-[55vh] flex items-center justify-center mt-0 md:-mt-20 overflow-hidden scroll-mt-40 z-10">
          <div className="absolute inset-0 w-full h-full bg-black">
            <img loading="lazy" src={weddingDetailImg} alt="Wedding Background" className="w-full h-full object-cover opacity-50 transition-transform duration-[10000ms] scale-110 hover:scale-100" />
          </div>

          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 text-center flex flex-col items-center justify-center h-full">

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-3 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></span>
              <p className="text-gray-200 font-sans font-bold tracking-[0.2em] uppercase text-[10px] mt-0.5">
                Our Philosophy
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6 tracking-wide drop-shadow-sm">
              The <span className="text-[var(--color-primary)]">Details.</span>
            </h2>

            <div className="relative">
              <span className="absolute -top-6 -left-6 md:-left-8 text-6xl font-playfair text-white opacity-10">"</span>
              <p className="text-gray-200 text-lg md:text-2xl font-sans font-light leading-relaxed mb-4 drop-shadow-md">
                Wedding photography is the art of capturing one of life's most cherished milestones with elegance and emotion. More than just documenting rituals, it tells the story of love, family, and celebration through candid and creative frames.
              </p>
              <p className="text-gray-300 text-xs md:text-sm font-sans font-light tracking-widest uppercase leading-loose max-w-3xl mx-auto">
                Every detail — from the décor and attire to laughter, tears, and joy — is preserved to create a timeless narrative.
              </p>
              <span className="absolute -bottom-8 -right-6 md:-right-8 text-6xl font-playfair text-white opacity-10 rotate-180">"</span>
            </div>

          </div>
        </section>

        {/* Cities Section */}
        <section id="cities" className="w-full max-w-5xl mx-auto px-4 lg:px-8 scroll-mt-40 mb-0 mt-0 md:-mt-20">
          <div className="w-full flex flex-col items-center text-center">

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></span>
              <p className="text-gray-600 font-sans font-bold tracking-[0.2em] uppercase text-[10px] mt-0.5">
                Our Locations
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-gray-900 tracking-wide">
              Available <span className="text-[var(--color-primary)]">In.</span>
            </h2>

            <p className="text-gray-500 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed mt-4 mb-6 md:mb-8">
              We are currently capturing memories in the following cities. More locations coming soon.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {availableCities.map((city, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-[var(--color-primary)] md:border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/10 text-gray-600 hover:text-[var(--color-primary)] transition-all duration-300 font-sans tracking-widest uppercase text-[10px] md:text-xs cursor-default"
                >
                  <FaMapMarkerAlt className="text-[var(--color-primary)] text-xs" />
                  <span>{city}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </ServicePageLayout>
  );
};

export default Wedding;
