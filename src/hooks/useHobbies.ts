import { useFetch } from './useFetch'
import type { HobbyFull } from '../types'

export function useHobbies() {
  const { data, loading, error } = useFetch<HobbyFull[]>('/data/hobbies/index.json')
  return { hobbies: data ?? [], loading, error }
}
