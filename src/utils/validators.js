// src/utils/validators.js
export const validators = {
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone: (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  },

  isValidTrackingId: (id) => {
    return /^TRK-\d{9}$/.test(id);
  },

  isRequired: (value) => {
    return value !== null && value !== undefined && String(value).trim() !== '';
  },

  isValidPincode: (pincode) => {
    return /^[1-9][0-9]{5}$/.test(pincode);
  },

  isValidPan: (pan) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  }
};