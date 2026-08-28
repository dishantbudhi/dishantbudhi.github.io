import './styles/global.css'
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import FlareCanvas from './components/layout/FlareCanvas'
import NavBar from './components/layout/NavBar'
import Footer from './components/Footer'
import WorkPage from './pages/WorkPage'
import WorkDetailPage from './pages/WorkDetailPage'
import { useFetch } from './hooks/useFetch'
import { useCursorGlow } from './hooks/useCursorGlow'
import type { SiteData } from './types'

export default function App() {
  useCursorGlow()
  const { data: site } = useFetch<SiteData>('/data/site.json')

  useEffect(() => {
    document.documentElement.dataset.theme = 'professional'
  }, [])

  return (
    <>
      <FlareCanvas />
      {site && <NavBar site={site} />}
      <main>
        <Routes>
          <Route path="/" element={site ? <WorkPage site={site} /> : null} />
          <Route path="/projects/:slug" element={site ? <WorkDetailPage site={site} /> : null} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {site && <Footer data={site.footer} />}
    </>
  )
}
