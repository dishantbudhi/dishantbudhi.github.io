export interface ExperienceEntry {
  company: string
  role: string
  team?: string
  dates: string
  startDate: string
  endDate?: string
  href?: string
}

export interface ResumeData {
  experience: ExperienceEntry[]
}
