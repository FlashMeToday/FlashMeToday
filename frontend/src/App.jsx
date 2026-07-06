import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wedding from './pages/Wedding'
import PreWedding from './pages/PreWedding'
import Maternity from './pages/Maternity'
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
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  )
}

export default App
