import { describe, it, expect } from 'vitest'
import {
  validateProject,
  validateExperience,
  validateInterest,
  validateArray,
} from '../../utils/validateData'

describe('validateData', () => {
  describe('validateProject', () => {
    it('validates a complete project', () => {
      const project = {
        title: 'TEST',
        icon: '🚀',
        tag: 'Test',
        href: 'https://test.com',
        description: 'Test description',
        skills: 'Test • Skills',
        period: '2025',
      }
      expect(validateProject(project)).toBe(true)
    })

    it('rejects incomplete project', () => {
      const project = { title: 'TEST' }
      expect(validateProject(project)).toBe(false)
    })
  })

  describe('validateExperience', () => {
    it('validates a complete experience', () => {
      const experience = {
        company: 'Test Co',
        role: 'Test Role',
        period: '2025',
        description: 'Test description',
      }
      expect(validateExperience(experience)).toBe(true)
    })

    it('rejects incomplete experience', () => {
      const experience = { company: 'Test Co' }
      expect(validateExperience(experience)).toBe(false)
    })
  })

  describe('validateInterest', () => {
    it('validates a complete interest', () => {
      const interest = {
        badge: 'TEST',
        description: 'Test description',
        items: ['item1', 'item2'],
      }
      expect(validateInterest(interest)).toBe(true)
    })

    it('rejects interest without items array', () => {
      const interest = {
        badge: 'TEST',
        description: 'Test description',
        items: 'not an array',
      }
      expect(validateInterest(interest)).toBe(false)
    })
  })

  describe('validateArray', () => {
    it('validates array with validator function', () => {
      const items = [{ valid: true }, { valid: true }]
      const validator = item => item.valid === true
      expect(validateArray(items, validator)).toBe(true)
    })

    it('rejects invalid items in array', () => {
      const items = [{ valid: true }, { valid: false }]
      const validator = item => item.valid === true
      expect(validateArray(items, validator)).toBe(false)
    })
  })
})

