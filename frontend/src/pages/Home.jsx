import React from 'react';
import Hero from '../components/Hero';
import OccasionsShoots from '../components/OccasionsShoots';
import BusinessShoots from '../components/BusinessShoots';
import NewIdea from '../components/NewIdea';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import Partners from '../components/Partners';

const Home = () => {
  return (
    <div className="w-full bg-[#fcfcff]">
      <Hero />
      <OccasionsShoots />
      <BusinessShoots />
      <NewIdea />
      <Stats />
      <Reviews />
      <Partners />
    </div>
  );
};

export default Home;
