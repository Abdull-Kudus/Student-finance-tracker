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
    
    // Export/Import
    elements.exportBtn.addEventListener('click', handleExport);
    elements.importFile.addEventListener('change', handleImport);
    
    // Form
    elements.transactionForm.addEventListener('submit', handleFormSubmit);
    elements.cancelBtn.addEventListener('click', handleFormCancel);
    
    // Live validation
    setupLiveValidation(elements.description, elements.descriptionError);
    setupLiveValidation(elements.amount, elements.amountError);
    setupLiveValidation(elements.date, elements.dateError);
    
    // Settings
    elements.budgetCapInput.addEventListener('change', handleBudgetCapChange);
    elements.baseCurrency.addEventListener('change', handleCurrencyChange);
    elements.rateUSD.addEventListener('input', handleRateChange);
    elements.rateRWF.addEventListener('input', handleRateChange);
    elements.rateGHS.addEventListener('input', handleRateChange);
    elements.clearDataBtn.addEventListener('click', handleClearData);
    
       // Set default date
    elements.date.value = new Date().toISOString().split('T')[0];
}

// Handle navigation click
function handleNavClick(e) {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    
    // Update active state
    elements.navLinks.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Update page
    State.setCurrentPage(page);
    renderCurrentPage();
    
    // Close mobile menu
    elements.navMenu.classList.remove('active');
    elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isOpen = elements.navMenu.classList.toggle('active');
    elements.mobileMenuBtn.setAttribute('aria-expanded', isOpen);
}

// Render current page
function renderCurrentPage() {
    const currentPage = State.getCurrentPage();
    
     // Hide all pages
    elements.pages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    const pageElement = document.getElementById(`page-${currentPage}`);
    if (pageElement) {
        pageElement.classList.add('active');
    }

    // Render page content
    switch (currentPage) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'records':
            renderRecords();
            break;
        case 'add':
            renderForm();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

// Render dashboard statistics
function renderDashboard() {
    const stats = State.calculateStats();
    
    // Update stats
    elements.statTotal.textContent = `$${stats.total.toFixed(2)}`;
    elements.statCount.textContent = `${stats.count} transactions`;
    elements.stat7Days.textContent = `$${stats.last7Total.toFixed(2)}`;
    elements.stat7Count.textContent = `${stats.last7Count} transactions`;
    elements.statTopCategory.textContent = stats.topCategory;
    elements.statTopAmount.textContent = `$${stats.topCategoryAmount.toFixed(2)}`;
    
    // Budget card
    elements.statRemaining.textContent = `$${Math.abs(stats.remaining).toFixed(2)}`;
    elements.budgetStatus.textContent = stats.overBudget ? 'Over budget' : 'Remaining';
    
    if (stats.overBudget) {
        elements.budgetCard.classList.add('over-budget');
        elements.statRemaining.classList.add('text-danger');
        elements.statRemaining.classList.remove('text-success');
    } else {
        elements.budgetCard.classList.remove('over-budget');
        elements.statRemaining.classList.add('text-success');
        elements.statRemaining.classList.remove('text-danger');
    }
    
    // Progress bar
    elements.monthSpent.textContent = `$${stats.monthTotal.toFixed(2)}`;
    elements.budgetCap.textContent = `$${stats.budgetCap.toFixed(2)}`;
    elements.progressBar.style.width = `${Math.min(stats.percentage, 100)}%`;
    elements.progressBar.setAttribute('aria-valuenow', stats.monthTotal);
    elements.progressBar.setAttribute('aria-valuemax', stats.budgetCap);
    elements.progressPercentage.textContent = `${stats.percentage.toFixed(1)}% used`;
    
    if (stats.overBudget) {
        elements.progressBar.classList.add('over-budget');
    } else {
        elements.progressBar.classList.remove('over-budget');
    }
}

// Render records list
function renderRecords() {
    const sorted = State.getSortedRecords();
    const pattern = State.getSearchPattern();
    const caseSensitive = State.getCaseSensitive();
    
    const searchResult = searchRecords(sorted, pattern, caseSensitive);
    const { results, regex } = searchResult;
    
    if (results.length === 0) {
        elements.emptyState.classList.remove('hidden');
        elements.recordsTableBody.innerHTML = '';
        elements.recordsCards.innerHTML = '';
        return;
    }
    
    elements.emptyState.classList.add('hidden');
    
    // Render table
    elements.recordsTableBody.innerHTML = results.map(record => `
        <tr>
            <td>${record.date}</td>
            <td>${highlightMatches(record.description, regex)}</td>
            <td><span class="category-badge">${record.category}</span></td>
            <td><strong>$${record.amount.toFixed(2)}</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="icon-btn edit" onclick="window.editRecord('${record.id}')" aria-label="Edit ${record.description}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="icon-btn delete" onclick="window.deleteRecord('${record.id}')" aria-label="Delete ${record.description}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Render cards
    elements.recordsCards.innerHTML = results.map(record => `
        <div class="record-card">
            <div class="record-card-header">
                <div class="record-card-title">
                    <div class="record-card-description">${highlightMatches(record.description, regex)}</div>
                    <div class="record-card-date">${record.date}</div>
                </div>
                <div class="record-card-amount">
                    <div class="record-card-value">$${record.amount.toFixed(2)}</div>
                    <span class="category-badge">${record.category}</span>
                </div>
            </div>
            <div class="record-card-actions">
                <button class="card-btn edit" onclick="window.editRecord('${record.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                </button>
                <button class="card-btn delete" onclick="window.deleteRecord('${record.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    `).join('');
    
    // Update sort indicators
    const sortState = State.getSortState();
    elements.sortButtons.forEach(btn => {
        const field = btn.dataset.sort;
        const icon = btn.querySelector('.sort-icon');
        
        if (field === sortState.sortBy) {
            icon.textContent = sortState.sortDir === 'asc' ? '↑' : '↓';
        } else {
            icon.textContent = '↕';
        }
    });
}
    