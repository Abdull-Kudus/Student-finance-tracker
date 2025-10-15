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

// Cache all DOM elements 
function cacheElements() {
    elements = {
        // Navigation
        navLinks: document.querySelectorAll('.nav-link'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        navMenu: document.getElementById('navMenu'),
        
        // Pages
        pages: document.querySelectorAll('.page'),
        
        // Status message
        statusMessage: document.getElementById('statusMessage'),
        
        // Dashboard
        statTotal: document.getElementById('statTotal'),
        statCount: document.getElementById('statCount'),
        stat7Days: document.getElementById('stat7Days'),
        stat7Count: document.getElementById('stat7Count'),
        statTopCategory: document.getElementById('statTopCategory'),
        statTopAmount: document.getElementById('statTopAmount'),
        statRemaining: document.getElementById('statRemaining'),
        budgetStatus: document.getElementById('budgetStatus'),
        budgetCard: document.getElementById('budgetCard'),
        monthSpent: document.getElementById('monthSpent'),
        budgetCap: document.getElementById('budgetCap'),
        progressBar: document.getElementById('progressBar'),
        progressPercentage: document.getElementById('progressPercentage'),
        
        // Records
        searchPattern: document.getElementById('searchPattern'),
        caseSensitive: document.getElementById('caseSensitive'),
        recordsTableBody: document.getElementById('recordsTableBody'),
        recordsCards: document.getElementById('recordsCards'),
        emptyState: document.getElementById('emptyState'),
        sortButtons: document.querySelectorAll('.sort-btn'),
        exportBtn: document.getElementById('exportBtn'),
        importFile: document.getElementById('importFile'),
        
        // Form
        transactionForm: document.getElementById('transactionForm'),
        formTitle: document.getElementById('formTitle'),
        description: document.getElementById('description'),
        amount: document.getElementById('amount'),
        category: document.getElementById('category'),
        date: document.getElementById('date'),
        submitBtn: document.getElementById('submitBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        
        // Error elements
        descriptionError: document.getElementById('description-error'),
        amountError: document.getElementById('amount-error'),
        categoryError: document.getElementById('category-error'),
        dateError: document.getElementById('date-error'),
        
        // Settings
        budgetCapInput: document.getElementById('budgetCapInput'),
        baseCurrency: document.getElementById('baseCurrency'),
        rateUSD: document.getElementById('rateUSD'),
        rateRWF: document.getElementById('rateRWF'),
        rateGHS: document.getElementById('rateGHS'),
        convert100RWF: document.getElementById('convert100RWF'),
        convert100GHS: document.getElementById('convert100GHS'),
        clearDataBtn: document.getElementById('clearDataBtn')
    };
}

// Setup all event listeners 
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Search
    elements.searchPattern.addEventListener('input', handleSearch);
    elements.caseSensitive.addEventListener('change', handleSearch);
    
    // Sorting
    elements.sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSort);
    });
    
