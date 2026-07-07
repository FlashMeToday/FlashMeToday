import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
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
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import About from './pages/About'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Join from './pages/Join'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans">
        {!isAdminRoute && <Navbar />}
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
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/join" element={<Join />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingWhatsApp />}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
