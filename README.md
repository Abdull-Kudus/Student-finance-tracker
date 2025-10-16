# Student Finance Tracker Theme

**Author:** Abdul Kudus  
**Institution:** African Leadership University (ALU)  
**Role:** Software Engineering Student

A fully accessible, responsive financial web application for tracking student expenses built with HTML, CSS, and Vanilla JavaScript. To demonstrate advanced UI implementations, regex validation, localStorage persistence, and comprehensive accessibility features learnt from frontend web development.

## Live Demo

**Unlisted YouTube URL:** []

**Deployed Github Pages URL:** [https://Abdull-Kudus.github.io/student-finance-tracker](https://Abdull-Kudus.github.io/student-finance-tracker)

---

### Core Features and Functionality

- **CRUD Operations**: Create, Read, Update, Delete transactions
- **Data Persistence**: All the data is saved to localStorage
- **Import/Export**: JSON import/export with validation from scripts directory.
- **Advanced Search**: Regex-powered search with highlighting
- **Sorting**: Added Sort by date, description, or amount (ascending/descending)
- **Real-time Statistics**: Dashboard with spending, Budget and Reminder analytics.
- **Budget Monitoring**: Set personalized monthly caps with visual spending progress tracking
- **Multi-currency Support**: USD, RWF (Rwandan Franc), and GHS (Ghanaian Cedis)
- **Dark/Light Theme Toggle**: Added dark/ light theme toggle to adjust
- **Keyboard Accessibility**: Can easily navigate with the keyboard
- **Offline Acees**: Has offline access

### My Custom Features Added

- Pre-configured categories: Food, Books, Transport, Fees, Rent, WiFi, Gas
- Cultural food items: Jollof, African Coffee, Banku, Kenkey, Waakye
- Transport: Motor Bike to campus and movements.
- Reading list: 48 Laws of Power, Black Swan, Trading in the Zone
- Fixed expenses: Rent ($250), Fees ($680), WiFi ($30), Gas ($30)

### Technical Highlights

- Used 6 regex pattern validations
- WCAG AA compliant accessibility
- This App is A Mobile-first responsive design (360px, 768px, 1024px breakpoints)
- Used Smooth animations and transitions
- Used Modern gradient UI with professional polish

---

## Regex Patterns and examples used

This application uses 6 regex patterns for validation and search:

### 1. Description Validation

**Pattern:** `/^\S(?:.*\S)?$/`  
**Purpose:** No leading/trailing spaces  
**Example Valid:** `Jollof Rice at Campus`  
**Example Invalid:** ` Lunch ` (spaces at start/end)

### 2. Amount Validation

**Pattern:** `/^(0|[1-9]\d*)(\.\d{1,2})?$/`  
**Purpose:** Valid number with max 2 decimal places  
**Example Valid:** `25.50`, `100`, `0.99`  
**Example Invalid:** `25.505`, `01.5`, `-10`

### 3. Date Validation

**Pattern:** `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/`  
**Purpose:** Validates YYYY-MM-DD format  
**Example Valid:** `2025-10-14`, `2024-01-01`  
**Example Invalid:** `10-14-2025`, `2025/10/14`, `2025-13-01`

### 4. Category Validation

**Pattern:** `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`  
**Purpose:** Letters, spaces, and hyphens only  
**Example Valid:** `Food`, `Motor Bike`, `Wi-Fi`  
**Example Invalid:** `Food123`, `Café`, `_Transport`

### 5. Duplicate Words Detection (Advanced)

**Pattern:** `/\b(\w+)\s+\1\b/`  
**Purpose:** Detects duplicate consecutive words using backreference  
**Example Valid:** `Bought new book`  
**Example Invalid:** `Bought bought book` (duplicate "bought")  
**Explanation:** `(\w+)` captures a word, `\1` references the captured word

### 6. Search: Find Cents

**Pattern:** `/\.\d{2}\b/`  
**Purpose:** Find transactions with cents (two decimal places)  
**Example Match:** `$8.50`, `$25.99`  
**Example No Match:** `$100`, `$50.5`

### Search Examples

**Find beverages:**  
Pattern: `(coffee|tea)`  
Matches: "African Coffee Morning", "Green Tea Purchase"

**Find Motor Bike expenses:**  
Pattern: `motor bike`  
Matches: "Motor Bike", "Motor Bike Maintenance"

**Find amounts over $100:**  
Pattern: `[1-9]\d{2,}`  
Matches: "250.00", "680.00"

---

## Keyboard Navigation

This application is fully keyboard accessible:

| Shortcut | Action |
|----------|--------|
| **Tab** | Move to next focusable element |
| **Shift + Tab** | Move to previous focusable element |
| **Enter** | Activate button or link |
| **Space** | Toggle checkbox or activate button |
| **Escape** | Cancel edit mode or close modal |
| **Arrow Keys** | Navigate within select dropdowns |

### Navigation Flow

1. Press **Tab** to navigate through the header navigation
2. Continue **Tab** to reach main content
3. Use **Enter** to activate navigation links
4. **Tab** through form fields and buttons
5. Use **Escape** to cancel actions

**Skip Link:** Press **Tab** on page load to reveal "Skip to main content" link for faster navigation.

---

## Accessibility Features

My application meets **WCAG 2.1 Level AA** standards:

### Semantic HTML

- Proper landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Heading hierarchy: H1 → H2 → H3 (no skipped levels)
- Semantic elements: `<button>`, `<form>`, `<table>`, etc.

### ARIA Implementation

- `role="navigation"` with `aria-label="Main navigation"`
- `role="status"` for status messages
- `aria-live="polite"` for non-urgent updates
- `aria-live="assertive"` for budget alerts
- `aria-label` on all icon buttons
- `aria-describedby` linking inputs to help text
- `aria-invalid` on form fields with errors
- `role="progressbar"` with `aria-valuenow/min/max`

### Visual Accessibility

- **Color Contrast:** All text meets 4.5:1 ratio minimum
- **Focus Indicators:** 2px blue outline on all focusable elements
- **Text Sizing:** Minimum 14px, scales with browser zoom
- **Visual Hierarchy:** Clear heading levels and spacing
- **Error States:** Red borders + icon + text for form errors

### Screen Reader Support

- Form labels properly associated with inputs
- Error messages announced via `role="alert"`
- Status updates announced via `aria-live`
- Table headers with proper scope
- Descriptive button labels (not just icons)
- Skip to content link for bypass

### Mobile Accessibility

- Minimum touch target size: 44x44px
- Mobile-optimized navigation
- Card layout on small screens
- No horizontal scrolling

---


## Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning)
- A text editor (VS Code recommended)

### Installation

1. **Clone the repository:**
   ```bash

  git clone https://github.com/Abdull-Kudus/frontend-web-dev-summative-Abdul-Kudus-Zakaria-Mukhtaru.git
   cd frontend-web-dev-summative-Abdul-Kudus-Zakaria-Mukhtaru
   cd student-finance-tracker
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or run with live server 

     ```

3. **Import seed data (optional):**

   - Go to Transactions page
   - Click "Import" button
   - Select `seed.json` file

---

##  File Structure

```
frontend-web-dev-summative-Abdul-Kudus-Zakaria-Mukhtaru/
student-finance-tracker/
   ├── index.html                 # Main HTML file
   ├── styles/
   │   └── main.css              # All styles 
   ├── scripts/
   │   ├── storage.js            # localStorage operations
   │   ├── validators.js         # Regex validation rules
   │   ├── search.js             # Search & highlight functions
   │   ├── state.js              # State management
   │   └── app.js                # Main application logic
   ├── seed.json                 # Sample data for import    
   ├── assets/                   #Images
   │   ├── kudus.jpg 
   |   ├── logo.png 
   │   ├── reminder.png
└── README.md                 
```

### Manual Testing Checklist

#### Form Validation

- [ ] Try adding a transaction with an empty description
- [ ] Try amount with 3 decimal places (e.g., `10.555`)
- [ ] Try invalid date format (e.g., `10-14-2025`)
- [ ] Try category with numbers (e.g., `Food123`)
- [ ] Try description with duplicate words (e.g., `Bought bought book`)
- [ ] Verify real-time error messages appear
- [ ] Verify errors clear when fixed

#### CRUD Operations

- [ ] Add new transaction
- [ ] Edit existing transaction
- [ ] Delete transaction (with confirmation)
- [ ] Verify data persists after page reload

#### Search & Filter

- [ ] Search for `\.\ d{2}\b` (finds cents)
- [ ] Search for `jollof` (case insensitive)
- [ ] Search for `JOLLOF` with case-sensitive enabled
- [ ] Search for `\b(\w+)\s+\1\b` (duplicate words)
- [ ] Verify highlighting works correctly
- [ ] Verify invalid regex shows no results (not crash)

#### Sorting

- [ ] Sort by date (both directions)
- [ ] Sort by description (A-Z and Z-A)
- [ ] Sort by amount (ascending/descending)
- [ ] Verify sort indicators update

#### Import/Export

- [ ] Export data as JSON
- [ ] Import `seed.json`
- [ ] Try importing invalid JSON (should show error)
- [ ] Try importing JSON with missing fields

#### Budget & Stats

- [ ] Set budget cap to $500
- [ ] Add transactions to exceed budget
- [ ] Verify progress bar turns red when over budget
- [ ] Verify "Over budget" status appears
- [ ] Verify ARIA live region announces budget status

#### Responsive Design

- [ ] Test at 360px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px+ width (desktop)
- [ ] Verify mobile menu works
- [ ] Verify table switches to cards on mobile

#### Keyboard Navigation

- [ ] Tab through entire page
- [ ] Use skip link (Tab on page load)
- [ ] Navigate with keyboard only
- [ ] Verify all focus indicators visible
- [ ] Verify Enter/Space activate buttons

#### Accessibility

- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify form errors are announced
- [ ] Verify status messages are announced
- [ ] Check color contrast with tools
- [ ] Verify page structure with headings

### Automated Testing Steps

Create `tests.html` with this simple assertions:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Tests</title>
</head>
<body>
    <h1>Validation Tests</h1>
    <div id="results"></div>
    
    <script type="module">
        import { ValidationRules } from './scripts/validators.js';
        
        const tests = [
            {
                name: 'Description validation',
                test: () => ValidationRules.description.test('Valid description'),
                expected: true
            },
            {
                name: 'Description with leading space',
                test: () => ValidationRules.description.test(' Invalid'),
                expected: false
            },
            {
                name: 'Amount validation',
                test: () => ValidationRules.amount.test('25.50'),
                expected: true
            },
            {
                name: 'Amount with 3 decimals',
                test: () => ValidationRules.amount.test('25.505'),
                expected: false
            }
        ];
        
        const results = tests.map(t => ({
            ...t,
            result: t.test(),
            pass: t.test() === t.expected
        }));
        
        document.getElementById('results').innerHTML = results.map(r => `
            <div style="color: ${r.pass ? 'green' : 'red'}">
                ${r.pass ? '✓' : '✗'} ${r.name}: ${r.result} (expected ${r.expected})
            </div>
        `).join('');
    </script>
</body>
</html>
```

## Contact

**Abdul Kudus**  
Software Engineer | Entrepreneur  
African Leadership University (ALU)

- **Email:** a.zakariam@alustudent.com
- **GitHub:** [github.com/Abdull-Kudus](https://github.com/Abdull-Kudus)
- **LinkedIn:** [linkedin.com/in/abdull-kudus](https://linkedin.com/in/abdull-kudus)

---

## License

This project is open source and available for educational purposes. Feel free to use it :)

---

**Built by Abdul Kudus for finance enthusiasts | October 2025**

