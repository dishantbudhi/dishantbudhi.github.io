import { useFetch } from './useFetch'
import type { HobbyMeta } from '../types'

export function useHobbies() {
  const { data, loading, error } = useFetch<HobbyMeta[]>('/data/hobbies/index.json')
  return { hobbies: data ?? [], loading, error }
}
