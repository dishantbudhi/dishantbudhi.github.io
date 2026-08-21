import { useFetch } from './useFetch'
import type { ProjectFull } from '../types'

export function useProjects() {
  const { data, loading, error } = useFetch<ProjectFull[]>('/data/projects/index.json')
  return { projects: data ?? [], loading, error }
}
