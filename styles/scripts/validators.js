export const ValidationRules = {
    description: {
        pattern: /^\S(?:.*\S)?$/,
        message: 'Cannot start/end with spaces or be only spaces',
        minLength: 3,
        test(value) {
            return this.pattern.test(value) && value.length >= this.minLength;
        }
    },
    
    amount: {
        pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
        message: 'Must be a valid number with max 2 decimals',
        test(value) {
            return this.pattern.test(value) && parseFloat(value) >= 0;
        }
    },
    
    date: {
        pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        message: 'Must be YYYY-MM-DD format',
        test(value) {
            return this.pattern.test(value);
        }
    },
    
    category: {
        pattern: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
        message: 'Letters, spaces, hyphens only',
        minLength: 2,
        test(value) {
            return this.pattern.test(value) && value.length >= this.minLength;
        }
    },
    
    // Advanced regex with backreference
    duplicateWords: {
        pattern: /\b(\w+)\s+\1\b/,
        message: 'Contains duplicate consecutive words',
        test(value) {
            return !this.pattern.test(value);
        }
    },
    
    // Search patterns
    hasCents: {
        pattern: /\.\d{2}\b/,
        test(value) {
            return this.pattern.test(value);
        }
    }
};

/**
 * Validate a single field
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {Object} { isValid: boolean, message: string }
 */
export function validateField(fieldName, value) {
    const rule = ValidationRules[fieldName];
    
    if (!rule) {
        return { isValid: true, message: '' };
    }
    
    const isValid = rule.test(value);
    
    return {
        isValid,
        message: isValid ? '' : rule.message
    };
}

**
 * Validate entire form data
 * @param {Object} formData - Form data object
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateForm(formData) {
    const errors = {};
    
    // Validate description
    const descResult = validateField('description', formData.description);
    if (!descResult.isValid) {
        errors.description = descResult.message;
    }
    
    // Check for duplicate words (advanced regex)
    const dupResult = validateField('duplicateWords', formData.description);
    if (!dupResult.isValid) {
        errors.description = dupResult.message;
    }
    
    // Validate amount
    const amountResult = validateField('amount', formData.amount);
    if (!amountResult.isValid) {
        errors.amount = amountResult.message;
    }
    
    // Validate date
    const dateResult = validateField('date', formData.date);
    if (!dateResult.isValid) {
        errors.date = dateResult.message;
    }
    
    // Validate category
    const categoryResult = validateField('category', formData.category);
    if (!categoryResult.isValid) {
        errors.category = categoryResult.message;
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}