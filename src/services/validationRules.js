// src/services/validationRules.js
export const validationRules = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^\+?[\d\s-]{10,}$/.test(value),
  required: (value) => value !== null && value !== undefined && value !== '',
  minLength: (value, min) => String(value).length >= min,
  maxLength: (value, max) => String(value).length <= max
};

export const validate = (data, rules) => {
  const errors = {};
  for (const field in rules) {
    for (const rule of rules[field]) {
      if (typeof rule === 'function') {
        if (!rule(data[field])) {
          errors[field] = `${field} validation failed`;
          break;
        }
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};