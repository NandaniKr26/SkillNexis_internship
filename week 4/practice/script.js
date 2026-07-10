// ==========================================
// Task 1: LocalStorage Greeting
// ==========================================
const nameInput = document.getElementById('name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const clearNameBtn = document.getElementById('clear-name-btn');
const welcomeMessage = document.getElementById('welcome-message');

const updateGreeting = () => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
        welcomeMessage.textContent = `Welcome back, ${savedName}!`;
        nameInput.classList.add('hidden');
        saveNameBtn.classList.add('hidden');
        clearNameBtn.classList.remove('hidden');
    } else {
        welcomeMessage.textContent = 'Hello, Guest!';
        nameInput.classList.remove('hidden');
        saveNameBtn.classList.remove('hidden');
        clearNameBtn.classList.add('hidden');
        nameInput.value = '';
    }
};

saveNameBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('username', name);
        updateGreeting();
    }
});

clearNameBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    updateGreeting();
});

// Initial load check
updateGreeting();


// ==========================================
// Task 2: Form Validation (Email)
// ==========================================
const emailForm = document.getElementById('email-form');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');
const emailSuccess = document.getElementById('email-success');

const validateEmail = (email) => {
    // Basic regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

emailForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const email = emailInput.value.trim();

    // Hide previous messages
    emailError.classList.add('hidden');
    emailSuccess.classList.add('hidden');

    if (!email) {
        emailError.textContent = 'Email field cannot be empty.';
        emailError.classList.remove('hidden');
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.remove('hidden');
    } else {
        emailSuccess.textContent = 'Valid email! Form successfully submitted.';
        emailSuccess.classList.remove('hidden');
        emailInput.value = ''; // Reset on success
    }
});


// ==========================================
// Task 3: API Fetch (Random Quote)
// ==========================================
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const fetchQuoteBtn = document.getElementById('fetch-quote-btn');

const fetchQuote = async () => {
    // Show loading state
    quoteText.textContent = "Loading quote...";
    quoteAuthor.textContent = "";

    try {
        // Using a free random quote API
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
        quoteText.textContent = "Oops! Failed to fetch a quote.";
        quoteAuthor.textContent = "";
        console.error('Error fetching quote:', error);
    }
};

fetchQuoteBtn.addEventListener('click', fetchQuote);

// Fetch a quote on initial load
fetchQuote();


// ==========================================
// Task 4: ES6 Array Filtering
// ==========================================
const filterBtn = document.getElementById('filter-btn');
const filteredArraySpan = document.getElementById('filtered-array');

const numbers = [12, 56, 34, 89, 21, 90, 45, 60];

filterBtn.addEventListener('click', () => {
    // Using ES6 arrow function to filter numbers greater than 50
    const filteredNumbers = numbers.filter(num => num > 50);

    filteredArraySpan.textContent = `[${filteredNumbers.join(', ')}]`;
});