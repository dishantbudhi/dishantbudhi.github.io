export interface DockNavigationItem {
  id: string
  label: string
  href: string
  icon: 'home' | 'user' | 'folder' | 'stack' | 'plus'
}

export interface SkillItem {
  name: string
  icon?: string
  hoverIcon?: string
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
  external?: boolean
  download?: boolean
  headerOrder?: number
}

export interface SiteData {
  profile: {
    name: string
    location: string
    address: string
    mapsHref: string
    mapEmbedHref: string
  }
  dockNavigation: DockNavigationItem[]
  home: {
    hero: {
      greeting: string
      workLabel: string
      workHref: string
    }
    headline: string
    ctaLabel: string
    ctaHref: string
    experienceLabel: string
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
  ui: {
    loading: string
    experienceError: string
    projectsError: string
    projectNotFound: string
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
