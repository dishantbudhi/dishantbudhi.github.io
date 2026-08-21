import type { ImageAsset } from './media'

export interface NavigationItem {
  id: 'professional' | 'personal'
  label: string
  path: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
  download?: boolean
}

export interface SiteData {
  profile: {
    name: string
    location: string
  }
  brand: {
    logo: string
    alt: string
    menuLabel: string
  }
  navigation: NavigationItem[]
  professional: {
    headline: string
    intro: string
    ctaLabel: string
    ctaHref: string
    experienceLabel: string
    projectsLabel: string
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
    version: string
    lastUpdated: string
    links: FooterLink[]
  }
}
