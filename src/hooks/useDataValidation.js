// src/hooks/useDataValidation.js
import { useState } from 'react';

export const useDataValidation = (rules) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};
    for (const field in rules) {
      if (rules[field].required && !data[field]) {
        newErrors[field] = `${field} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};