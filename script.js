window.addEventListener('load', () => {
    document.getElementById('crackTime').textContent = 'instantly';
});

const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');
const feedbackList = document.querySelector('.feedback-list');

// Keep the real-time analysis
passwordInput.addEventListener('input', analyzePassword);

// Add toggle password functionality
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

function analyzePassword() {
    const password = passwordInput.value;
    const { length, uppercaseCount, lowercaseCount, numberCount, symbolCount } = checkPasswordStrength(password);
    const crackTime = estimateCrackTime(password);
    
    // Update character counts
    document.getElementById('lengthCount').textContent = length;
    document.getElementById('uppercaseCount').textContent = uppercaseCount;
    document.getElementById('lowercaseCount').textContent = lowercaseCount;
    document.getElementById('numberCount').textContent = numberCount;
    document.getElementById('symbolCount').textContent = symbolCount;
    
    // Update crack time
    document.getElementById('crackTime').textContent = crackTime;
}

function checkPasswordStrength(password) {
    let strength = 0;
    const length = password.length;
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    const lowercaseCount = (password.match(/[a-z]/g) || []).length;
    const numberCount = (password.match(/\d/g) || []).length;
    const symbolCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
    
    // Length check
    if (length >= 8) strength += 25;
    // Uppercase check
    if (uppercaseCount > 0) strength += 25;
    // Numbers check
    if (numberCount > 0) strength += 25;
    // Special characters check
    if (symbolCount > 0) strength += 25;
    
    return { strength, length, uppercaseCount, lowercaseCount, numberCount, symbolCount };
}

function getStrengthText(strength) {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Moderate';
    if (strength < 100) return 'Strong';
    return 'Very Strong';
}

// Add new function to estimate crack time
function estimateCrackTime(password) {
    // Basic assumptions:
    // - 10^12 guesses per second (modern GPU)
    // - Character set size depends on password complexity
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32; // Common symbols
    
    const possibleCombinations = Math.pow(charsetSize, password.length);
    const guessesPerSecond = 1e12; // 1 trillion guesses per second
    const seconds = possibleCombinations / guessesPerSecond;
    
    return formatTime(seconds);
}

function formatTime(seconds) {
    if (seconds < 1) return 'instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    
    const hours = minutes / 60;
    if (hours < 24) return `${Math.round(hours)} hours`;
    
    const days = hours / 24;
    if (days < 365) return `${Math.round(days)} days`;
    
    const years = days / 365;
    if (years < 1000) return `${Math.round(years)} years`;
    
    const millennia = years / 1000;
    return `${millennia.toFixed(1)} millennia`;
} 