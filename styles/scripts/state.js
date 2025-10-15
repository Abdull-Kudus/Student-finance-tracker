// Application state
const state = {
    records: [],
    settings: null,
    currentPage: 'dashboard',
    sortBy: 'date',
    sortDir: 'desc',
    searchPattern: '',
    caseSensitive: false,
    editingId: null
};

export function initState() {
    state.records = loadRecords();
    state.settings = loadSettings();
    
    // Seed with default data if empty
    if (state.records.length === 0) {
        state.records = getDefaultRecords();
        saveRecords(state.records);
    }
}

/**
 * Returns the default set of records.
 * @returns {Array}
 */
function getDefaultRecords() {
    return [
        {
            id: 'txn_001',
            description: 'Jollof Rice at Campus',
            amount: 8.50,
            category: 'Food',
            date: '2025-10-10',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_002',
            description: '48 Laws of Power Book',
            amount: 25.00,
            category: 'Books',
            date: '2025-10-08',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_003',
            description: 'Motor Bike Fuel',
            amount: 15.00,
            category: 'Transport',
            date: '2025-10-12',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_004',
            description: 'Monthly Rent Payment',
            amount: 250.00,
            category: 'Rent',
            date: '2025-10-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_005',
            description: 'School Fees Semester 1',
            amount: 680.00,
            category: 'Fees',
            date: '2025-09-25',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_006',
            description: 'WiFi Monthly Subscription',
            amount: 30.00,
            category: 'WiFi',
            date: '2025-10-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'txn_007',
            description: 'Cooking Gas Refill',
            amount: 30.00,
            category: 'Gas',
            date: '2025-10-05',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
}

// Get Current state
/**
 * Returns the current application state.
 * @returns {Object}
 */
export function getState() {
    return { ...state };
}

/**
 * Get all records
 * @returns {Array} All records
 */
export function getRecords() {
    return [...state.records];
}

/**
 * Get record by ID
 * @param {string} id - Record ID
 * @returns {Object|null} Record or null
 */
export function getRecordById(id) {
    return state.records.find(r => r.id === id) || null;
}

/**
 * Add new record
 * @param {Object} recordData - Record data (without id, timestamps)
 * @returns {Object} New record with id and timestamps
 */
export function addRecord(recordData) {
    const now = new Date().toISOString();
    const newRecord = {
        id: `txn_${Date.now()}`,
        ...recordData,
        amount: parseFloat(recordData.amount),
        createdAt: now,
        updatedAt: now
    };
    
    state.records.push(newRecord);
    saveRecords(state.records);
    
    return newRecord;
}

/**
 * Update existing record
 * @param {string} id
 * @param {Object} updates 
 * @returns {Object|null} 
 */
export function updateRecord(id, updates) {
    const index = state.records.findIndex(r => r.id === id);
    
    if (index === -1) {
        return null;
    }
    
    state.records[index] = {
        ...state.records[index],
        ...updates,
        amount: parseFloat(updates.amount),
        updatedAt: new Date().toISOString()
    };
    
    saveRecords(state.records);
    return state.records[index];
}

/**
 * Delete record
 * @param {string} id
 * @returns {boolean} 
 */
export function deleteRecord(id) {
    const initialLength = state.records.length;
    state.records = state.records.filter(r => r.id !== id);
    
    if (state.records.length < initialLength) {
        saveRecords(state.records);
        return true;
    }
    
    return false;
}

/**
 * Get sorted records
 * @returns {Array} Sorted records
 */
export function getSortedRecords() {
    const sorted = [...state.records];
    
    sorted.sort((a, b) => {
        let aVal = a[state.sortBy];
        let bVal = b[state.sortBy];
        
        if (state.sortBy === 'amount') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (aVal < bVal) return state.sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return state.sortDir === 'asc' ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

/**
 * Set sort parameters
 * @param {string} field - Field to sort by
 */
export function setSortBy(field) {
    if (state.sortBy === field) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortBy = field;
        state.sortDir = 'asc';
    }
}

/**
 * Get current sort state
 * @returns {Object} { sortBy, sortDir }
 */
export function getSortState() {
    return {
        sortBy: state.sortBy,
        sortDir: state.sortDir
    };
}

/**
 * Calculate statistics
 * @returns {Object} Statistics object
 */
export function calculateStats() {
    const total = state.records.reduce((sum, r) => sum + r.amount, 0);
    
    // Last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const last7Days = state.records.filter(r => {
        const recordDate = new Date(r.date);
        return recordDate >= weekAgo;
    });
    const last7Total = last7Days.reduce((sum, r) => sum + r.amount, 0);
    
    // Top category
    const categoryTotals = {};
    state.records.forEach(r => {
        categoryTotals[r.category] = (categoryTotals[r.category] || 0) + r.amount;
    });
    
    const topCategory = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0];
    
    // This month
    const now = new Date();
    const thisMonth = state.records.filter(r => {
        const recordDate = new Date(r.date);
        return recordDate.getMonth() === now.getMonth() && 
               recordDate.getFullYear() === now.getFullYear();
    });
    const monthTotal = thisMonth.reduce((sum, r) => sum + r.amount, 0);
    
    const budgetCap = state.settings.budgetCap || 1000;
    const remaining = budgetCap - monthTotal;
    const overBudget = monthTotal > budgetCap;
    
    return {
        total,
        count: state.records.length,
        last7Total,
        last7Count: last7Days.length,
        topCategory: topCategory ? topCategory[0] : 'N/A',
        topCategoryAmount: topCategory ? topCategory[1] : 0,
        monthTotal,
        budgetCap,
        remaining,
        overBudget,
        percentage: (monthTotal / budgetCap) * 100
    };
}

/**
 * Get settings
 * @returns {Object} Settings
 */
export function getSettings() {
    return { ...state.settings };
}

/**
 * Update settings
 * @param {Object} updates - Settings updates
 */
export function updateSettings(updates) {
    state.settings = {
        ...state.settings,
        ...updates
    };
    saveSettings(state.settings);
}

/**
 * Set current page
 * @param {string} page - Page name
 */
export function setCurrentPage(page) {
    state.currentPage = page;
}

/**
 * Get current page
 * @returns {string} Current page
 */
export function getCurrentPage() {
    return state.currentPage;
}

/**
 * Set editing ID
 * @param {string|null} id - Record ID or null
 */
export function setEditingId(id) {
    state.editingId = id;
}

/**
 * Get editing ID
 * @returns {string|null} Editing ID
 */
export function getEditingId() {
    return state.editingId;
}

/**
 * Set search pattern
 * @param {string} pattern - Search pattern
 */
export function setSearchPattern(pattern) {
    state.searchPattern = pattern;
}

/**
 * Get search pattern
 * @returns {string} Search pattern
 */
export function getSearchPattern() {
    return state.searchPattern;
}

/**
 * Set case sensitivity
 * @param {boolean} sensitive - Case sensitive flag
 */
export function setCaseSensitive(sensitive) {
    state.caseSensitive = sensitive;
}

/**
 * Get case sensitivity
 * @returns {boolean} Case sensitive flag
 */
export function getCaseSensitive() {
    return state.caseSensitive;
}

/**
 * Import records from array
 * @param {Array} records - Array of records
 * @returns {boolean} Success status
 */
export function importRecords(records) {
    state.records = records;
    return saveRecords(state.records);
}

/**
 * Clear all records
 */
export function clearRecords() {
    state.records = [];
    saveRecords(state.records);
}