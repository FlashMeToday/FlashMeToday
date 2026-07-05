import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="pt-24 px-6 lg:px-12 w-full">
        <h1 className="text-4xl font-bold text-gray-900 mt-20">Welcome to FlashMeToday</h1>
        <p className="text-gray-600 mt-4 text-lg">Your premium destination for exceptional photography.</p>
        {/* Spacer for scroll effect */}
        <div className="h-[100vh]"></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
