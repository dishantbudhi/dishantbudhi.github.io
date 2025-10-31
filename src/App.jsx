import './styles/global.css'
import ParticleCanvas from './components/ParticleCanvas'
import Header from './components/Header'
import Footer from './components/Footer'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PersonalPage from './pages/PersonalPage'

function App() {
  useRevealOnScroll()

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
