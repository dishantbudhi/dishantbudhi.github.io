import { useHobbies } from '../hooks/useHobbies'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Section from '../components/common/Section'
import SectionHeader from '../components/common/SectionHeader'
import HobbyCard from '../components/life/HobbyCard'
import styles from './LifePage.module.css'

export default function LifePage() {
  useRevealOnScroll()
  const { hobbies, loading, error } = useHobbies()

  return (
    <>
      <Section reveal>
        <h1 className={styles.headline}>Outside the code.</h1>
        <p className={styles.intro}>
          Things I think about when I&apos;m not building.
        </p>
      </Section>

      <Section reveal>
        <SectionHeader badge="INTERESTS" />
        {loading && <p className="muted">Loading...</p>}
        {error && <p className="muted">Failed to load.</p>}
        {!loading && !error && (
          <div className={styles.grid}>
            {hobbies.map((hobby) => (
              <HobbyCard key={hobby.slug} hobby={hobby} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
