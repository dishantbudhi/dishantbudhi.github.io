/**
 * Data validation utilities
 * Ensures data structures match expected schemas
 */

/**
 * Validates a project object
 * @param {Object} project - Project object to validate
 * @returns {boolean} - True if valid
 */
export function validateProject(project) {
  const required = ['title', 'icon', 'tag', 'href', 'description', 'skills', 'period']
  return required.every(key => project[key] !== undefined && project[key] !== null)
}

/**
 * Validates an experience object
 * @param {Object} experience - Experience object to validate
 * @returns {boolean} - True if valid
 */
export function validateExperience(experience) {
  const required = ['company', 'role', 'period', 'description']
  return required.every(key => experience[key] !== undefined && experience[key] !== null)
}

/**
 * Validates an interest object
 * @param {Object} interest - Interest object to validate
 * @returns {boolean} - True if valid
 */
export function validateInterest(interest) {
  const required = ['badge', 'description', 'items']
  return (
    required.every(key => interest[key] !== undefined && interest[key] !== null) &&
    Array.isArray(interest.items)
  )
}

/**
 * Validates an array of items
 * @param {Array} items - Array to validate
 * @param {Function} validator - Validation function for each item
 * @returns {boolean} - True if all items are valid
 */
export function validateArray(items, validator) {
  return Array.isArray(items) && items.every(validator)
}

