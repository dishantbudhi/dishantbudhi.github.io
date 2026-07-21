import './styles/global.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ParticleCanvas from './components/layout/ParticleCanvas'
import NavBar from './components/layout/NavBar'
import Footer from './components/Footer'
import WorkPage from './pages/WorkPage'
import WorkDetailPage from './pages/WorkDetailPage'
import LifePage from './pages/LifePage'
import LifeDetailPage from './pages/LifeDetailPage'

export default function App() {
  return (
    <>
      <ParticleCanvas />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/work" replace />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />
          <Route path="/life" element={<LifePage />} />
          <Route path="/life/:slug" element={<LifeDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
