import './styles/global.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import FlareCanvas from './components/layout/FlareCanvas'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import { useJsonData } from './hooks/useJsonData'
import { useCursorGlow } from './hooks/useCursorGlow'
import { contentPaths } from './config/content'
import type { SiteData } from './types'

export default function App() {
  useCursorGlow()
  const { data: site } = useJsonData<SiteData>(contentPaths.site)

  return (
    <>
      <FlareCanvas />
      {site && <NavBar site={site} />}
      <main>
        <Routes>
          <Route path="/" element={site ? <HomePage site={site} /> : null} />
          <Route path="/projects/:slug" element={site ? <ProjectPage site={site} /> : null} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {site && <Footer data={site.footer} />}
    </>
  )
}
