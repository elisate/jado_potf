// Note: These are TypeScript types/interfaces only for type checking.
// In JavaScript, interfaces and types don't exist at runtime,
// so you can remove them entirely or keep comments for reference.

// Example usage notes:
// - You can add JSDoc comments if you want some IDE hinting
// - But these declarations do not translate to JavaScript code

/**
 * @typedef {import('express').Request & { user?: import('../entity/userEntity.js').User, agentCode?: string }} AuthenticatedRequest
 */

/**
 * @template T
 * @typedef {Object} ValidationResult
 * @property {boolean} success
 * @property {T} [data]
 * @property {Record<string, string[]>} [errors]
 */

/**
 * @typedef {'user' | 'admin'} UserRole
 */

/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {T} [data]
 * @property {Record<string, string[]>} [errors]
 */
