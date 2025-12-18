/**
 * Data structure schemas for type consistency across the application
 * These serve as documentation and can be used for validation
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Project title (uppercase)
 * @property {string} icon - Emoji icon
 * @property {string} tag - Project category/tag
 * @property {string} href - GitHub or project URL
 * @property {string} description - Project description
 * @property {string} skills - Skills used (format: "Skill1 • Skill2 • Skill3")
 * @property {string} period - Time period (e.g., "Aug 2025" or "Jul 2025 - Aug 2025")
 */

/**
 * @typedef {Object} Experience
 * @property {string} company - Company name
 * @property {string} role - Job title/role
 * @property {string} [team] - Optional team name
 * @property {string} period - Time period (e.g., "JUL 2024 – DEC 2024")
 * @property {string} description - Job description
 */

/**
 * @typedef {Object} Interest
 * @property {string} badge - Interest category (uppercase)
 * @property {string} description - Interest description
 * @property {string[]} items - Array of brief interest items
 */

/**
 * @typedef {Object} PersonalData
 * @property {Object} intro - Introduction section data
 * @property {string} intro.title - Optional title
 * @property {string} intro.badge - Badge text
 * @property {string} intro.description - Introduction description
 * @property {Object} image - Image data
 * @property {string} image.src - Image source path
 * @property {string} image.alt - Image alt text
 * @property {Interest[]} interests - Array of interests
 */

export const DataSchema = {
  Project: {
    title: 'string',
    icon: 'string',
    tag: 'string',
    href: 'string',
    description: 'string',
    skills: 'string',
    period: 'string',
  },
  Experience: {
    company: 'string',
    role: 'string',
    team: 'string?',
    period: 'string',
    description: 'string',
  },
  Interest: {
    badge: 'string',
    description: 'string',
    items: 'array',
  },
}

