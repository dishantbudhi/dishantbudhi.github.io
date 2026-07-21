import { useFetch } from './useFetch'
import type { ProjectFull } from '../types'

export function useProject(slug: string) {
  const { data, loading, error } = useFetch<ProjectFull>(
    `/data/projects/${slug}/data.json`
  )
  return { project: data, loading, error }
}
