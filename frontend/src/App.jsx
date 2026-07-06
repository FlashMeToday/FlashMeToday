import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wedding from './pages/Wedding'
import PreWedding from './pages/PreWedding'
import Maternity from './pages/Maternity'
import BabyKids from './pages/BabyKids'
import Vacations from './pages/Vacations'
import Parties from './pages/Parties'
import Food from './pages/Food'
import Interior from './pages/Interior'
import ProductShoot from './pages/ProductShoot'
import CorporateEvents from './pages/CorporateEvents'
import BrandVideo from './pages/BrandVideo'
import ProfileHeadshot from './pages/ProfileHeadshot'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/pre-wedding" element={<PreWedding />} />
          <Route path="/maternity" element={<Maternity />} />
          <Route path="/baby-and-kids" element={<BabyKids />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/food" element={<Food />} />
          <Route path="/interior" element={<Interior />} />
          <Route path="/product-shoot" element={<ProductShoot />} />
          <Route path="/corporate-events" element={<CorporateEvents />} />
          <Route path="/brand-video" element={<BrandVideo />} />
          <Route path="/profile-and-headshot" element={<ProfileHeadshot />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  )
}

export default App
