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