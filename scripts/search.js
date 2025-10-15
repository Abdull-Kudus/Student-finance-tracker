/**
 * Safely compile a regex pattern with error handling
 * @param {string} pattern 
 * @param {string} flags 
 * @returns {RegExp|null} 
 */
export function compileRegex(pattern, flags = 'gi') {
    if (!pattern || pattern.trim() === '') {
        return null;
    }
    
    try {
        return new RegExp(pattern, flags);
    } catch (error) {
        console.error('Invalid regex pattern:', error);
        return null;
    }
}

/**
 * Filter records based on regex pattern
 * @param {Array} records 
 * @param {RegExp|null} regex 
 * @returns {Array} 
 */
export function filterRecords(records, regex) {
    if (!regex) {
        return records;
    }
    
    return records.filter(record => {
        const description = record.description || '';
        const category = record.category || '';
        const amount = record.amount.toString();
        
        return regex.test(description) || 
               regex.test(category) || 
               regex.test(amount);
    });
}

/**
 * Highlight matches in text using <mark> tags
 * @param {string} text 
 * @param {RegExp|null} regex 
 * @returns {string} 
 */
export function highlightMatches(text, regex) {
    if (!regex || !text) {
        return escapeHtml(text);
    }
    
    const str = text.toString();
    const highlighted = str.replace(regex, match => `<mark>${escapeHtml(match)}</mark>`);
    
    // Replace non-highlighted parts
    return highlighted.split(/(<mark>.*?<\/mark>)/).map(part => {
        if (part.startsWith('<mark>')) {
            return part;
        }
        return escapeHtml(part);
    }).join('');
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Search records and return results with highlighted text
 * @param {Array} records 
 * @param {string} pattern 
 * @param {boolean} caseSensitive
 * @returns {Object} 
 */
export function searchRecords(records, pattern, caseSensitive = false) {
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = compileRegex(pattern, flags);
    
    if (!regex && pattern.trim() !== '') {
        return {
            results: [],
            regex: null,
            error: 'Invalid regex pattern'
        };
    }
    
    const filtered = filterRecords(records, regex);
    
    return {
        results: filtered,
        regex: regex,
        error: null
    };
}