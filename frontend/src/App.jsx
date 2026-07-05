import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Home />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
