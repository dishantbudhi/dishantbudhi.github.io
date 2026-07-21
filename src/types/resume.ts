export interface ExperienceEntry {
  company: string
  role: string
  team?: string
  dates: string
  bullets: string[]
}

export interface ResumeData {
  experience: ExperienceEntry[]
}
