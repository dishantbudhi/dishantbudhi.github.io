import './styles/global.css'
import ParticleCanvas from './components/ParticleCanvas'
import Header from './components/Header'
import Footer from './components/Footer'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import PersonalPage from './pages/PersonalPage'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  useRevealOnScroll()
  
  useEffect(() => {
    if (location.pathname === '/personal') {
      document.documentElement.classList.add('theme-orange')
    } else {
      document.documentElement.classList.remove('theme-orange')
    }
  }, [location.pathname])

  return (
    <>
      <ParticleCanvas />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<PersonalPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
