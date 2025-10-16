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

/**
 * Load settings from localStorage
 * @returns {Object} 
 */
export function loadSettings() {
    try {
        const settings = localStorage.getItem(SETTINGS_KEY);
        return settings ? JSON.parse(settings) : getDefaultSettings();
    } catch (error) {
        console.error('Error loading settings:', error);
        return getDefaultSettings();
    }
}

/**
 * Save settings to localStorage
 * @param {Object} settings 
 * @returns {boolean} 
 */
export function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        return false;
    }
}

/**
 * Get default settings
 * @returns {Object} 
 */
function getDefaultSettings() {
    return {
        baseCurrency: 'USD',
        currencies: {
            USD: 1,
            RWF: 1300,
            GHS: 15
        },
        budgetCap: 1000
    };
}

/**
 * Clear all data from localStorage
 */
export function clearAllData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
}

/**
 * Validate imported JSON data
 * @param {*} data 
 * @returns {boolean} 
 */
export function validateImportData(data) {
    if (!Array.isArray(data)) {
        return false;
    }
    
    return data.every(record => 
        record.id && 
        record.description && 
        typeof record.amount === 'number' && 
        record.category && 
        record.date &&
        record.createdAt &&
        record.updatedAt
    );
}