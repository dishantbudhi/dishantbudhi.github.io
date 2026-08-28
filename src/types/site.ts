import type { ImageAsset } from './media'

export interface DockNavigationItem {
  id: string
  label: string
  href: string
  icon: 'home' | 'user' | 'folder' | 'stack' | 'plus'
}

export interface SkillItem {
  name: string
  icon?: string
}

export interface SkillCategory {
  title: string
  items: SkillItem[]
}

export interface OutsideInterest {
  label: string
  icon: 'gamepad' | 'history' | 'music' | 'video' | 'palette' | 'book' | 'university' | 'lightbulb' | 'heartbeat' | 'fire' | 'processor'
  href?: string
}

export interface ContactLink {
  id: 'email' | 'linkedin' | 'github' | 'resume'
  label: string
  description: string
  href: string
  symbol: string
  external?: boolean
  download?: boolean
}

export interface SiteData {
  profile: {
    name: string
    location: string
    address: string
    mapsHref: string
    mapEmbedHref: string
  }
  brand: {
    professionalLogo: string
    alt: string
  }
  dockNavigation: DockNavigationItem[]
  professional: {
    hero: {
      greeting: string
      workLabel: string
      workHref: string
    }
    headline: string
    intro: string
    ctaLabel: string
    ctaHref: string
    experienceLabel: string
    projectsLabel: string
    projectsGithubHref: string
    profileHeading: EditorialHeadingData
    projectsHeading: EditorialHeadingData
    alsoLikeLabel: string
    focusStatement: string
    skills: {
      label: string
      title: string
      categories: SkillCategory[]
    }
    outsideInterests: OutsideInterest[]
    contact: {
      heading: EditorialHeadingData
      links: ContactLink[]
    }
  }
  personal: {
    headline: string
    intro: string
    interestsLabel: string
    galleryLabel: string
    galleryFallback: ImageAsset[]
  }
  ui: {
    loading: string
    experienceError: string
    projectsError: string
    interestsError: string
    interestNotFound: string
    projectNotFound: string
    backToPersonal: string
    backToProfessional: string
    photoDialogLabel: string
    closePhoto: string
  }
  footer: {
    copyright: string
    sourceLabel: string
    sourceHref: string
    backToTopLabel: string
  }
}

export interface EditorialHeadingData {
  label: string
  title: string
}
