const STORAGE_KEY = 'finance_tracker_data';
const SETTINGS_KEY = 'finance_tracker_settings';

/**
 * Load all transactions from localStorage
 * @returns {Array} 
 */
export function loadRecords() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading records:', error);
        return [];
    }
}

/**
 * Save transactions to localStorage
 * @param {Array} records 
 * @returns {boolean} 
 */
export function saveRecords(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        return true;
    } catch (error) {
        console.error('Error saving records:', error);
        return false;
    }
}