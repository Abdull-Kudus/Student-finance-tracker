// MAIN APPLICATION JAVASCRIPT FILE

import * as State from './state.js';
import * as Storage from './storage.js';
import { validateForm, setupLiveValidation } from './validators.js';
import { searchRecords, highlightMatches } from './search.js';

// DOM Elements
let elements = {};

/**
 * Initialize the application
 */
function init() {
    // Initialize state
    State.initState();
    
    // Cache DOM elements
    cacheElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    renderCurrentPage();
}

