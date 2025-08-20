import './styles/global.css'
import ParticleCanvas from './components/ParticleCanvas'
import Header from './components/Header'
import Intro from './components/Intro'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

function App() {
  useRevealOnScroll()

  return (
    <>
      <ParticleCanvas />
      <Header />
      <main>
        <Intro />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  )
}

export default App
