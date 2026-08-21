import { useHobbies } from '../hooks/useHobbies'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import Section from '../components/common/Section'
import SectionHeader from '../components/common/SectionHeader'
import PageHero from '../components/common/PageHero'
import CardGrid from '../components/common/CardGrid'
import HobbyCard from '../components/life/HobbyCard'
import PhotoGrid from '../components/life/PhotoGrid'
import { useGalleryImages } from '../hooks/useGalleryImages'
import type { SiteData } from '../types'

export default function LifePage({ site }: { site: SiteData }) {
  useRevealOnScroll()
  const { hobbies, loading, error } = useHobbies()
  const galleryImages = useGalleryImages(site.personal.galleryFallback)

  return (
    <>
      <Section reveal variant="hero">
        <PageHero title={site.personal.headline} description={site.personal.intro} />
      </Section>

      <Section reveal>
        <SectionHeader badge={site.personal.interestsLabel} />
        {loading && <p className="muted">{site.ui.loading}</p>}
        {error && <p className="muted">{site.ui.interestsError}</p>}
        {!loading && !error && (
          <CardGrid>
            {hobbies.map((hobby) => (
              <HobbyCard key={hobby.slug} hobby={hobby} />
            ))}
          </CardGrid>
        )}
      </Section>

      <Section reveal>
        <SectionHeader badge={site.personal.galleryLabel} />
        <PhotoGrid images={galleryImages} labels={site.ui} />
      </Section>
    </>
  )
}
