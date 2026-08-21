import './styles/global.css'
import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import ParticleCanvas from './components/layout/ParticleCanvas'
import NavBar from './components/layout/NavBar'
import Footer from './components/Footer'
import WorkPage from './pages/WorkPage'
import WorkDetailPage from './pages/WorkDetailPage'
import LifePage from './pages/LifePage'
import LifeDetailPage from './pages/LifeDetailPage'
import { useFetch } from './hooks/useFetch'
import type { SiteData } from './types'

export default function App() {
  const { pathname } = useLocation()
  const isPersonal = pathname === '/personal' || pathname.startsWith('/personal/')
  const { data: site } = useFetch<SiteData>('/data/site.json')

  useEffect(() => {
    document.documentElement.dataset.theme = isPersonal ? 'personal' : 'professional'
  }, [isPersonal])

  return (
    <>
      <ParticleCanvas inverted={isPersonal} />
      {site && <NavBar site={site} />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/professional" replace />} />
          <Route path="/professional" element={site ? <WorkPage site={site} /> : null} />
          <Route path="/professional/:slug" element={site ? <WorkDetailPage site={site} /> : null} />
          <Route path="/personal" element={site ? <LifePage site={site} /> : null} />
          <Route path="/personal/:slug" element={site ? <LifeDetailPage site={site} /> : null} />
          <Route path="/work" element={<Navigate to="/professional" replace />} />
          <Route path="/life/*" element={<Navigate to="/personal" replace />} />
          <Route path="*" element={<Navigate to="/professional" replace />} />
        </Routes>
      </main>
      {site && <Footer data={site.footer} />}
    </>
  )
}
