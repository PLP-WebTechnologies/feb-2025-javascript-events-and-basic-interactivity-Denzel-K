document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // EVENT HANDLING SECTION
    // ======================
    
    // Click Event Counter
    const clickBox = document.getElementById('click-box');
    const clickCounter = document.getElementById('click-counter');
    let clickCount = 0;
    
    clickBox.addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = clickCount;
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
    
    // Hover Event
    const hoverBox = document.getElementById('hover-box');
    const hoverMessage = document.getElementById('hover-message');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverMessage.textContent = "You're hovering! Great job!";
        this.style.backgroundColor = '#e3f2fd';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverMessage.textContent = "Waiting for hover...";
        this.style.backgroundColor = '';
    });
    
    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressDisplay = document.getElementById('keypress-display');
    
    keypressInput.addEventListener('keydown', function(e) {
        keypressDisplay.textContent = `Key: ${e.key} (Code: ${e.code})`;
    });
    
    // Secret Zone (Double click and long press)
    const secretBox = document.getElementById('secret-box');
    const secretReveal = document.getElementById('secret-reveal');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        revealSecret("You double clicked! Here's your secret: JavaScript is awesome!");
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            revealSecret("Long press detected! Secret: You're a patient person!");
        }, 1500);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function revealSecret(message) {
        secretBox.classList.add('revealed');
        secretReveal.textContent = message;
        
        // Hide after 5 seconds
        setTimeout(() => {
            secretBox.classList.remove('revealed');
        }, 5000);
    }
    
    // ======================
    // INTERACTIVE ELEMENTS
    // ======================
    
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorText = document.getElementById('color-text');
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorText.style.backgroundColor = colors[colorIndex];
        colorText.style.color = getContrastColor(colors[colorIndex]);
        colorText.textContent = `Color changed to ${colors[colorIndex]}`;
    });
    
    // Helper function for text contrast
    function getContrastColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black or white depending on luminance
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        showImage(newIndex);
    }, 5000);
    
    // Tab System
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ======================
    // FORM VALIDATION
    // ======================
    
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            this.reset();
            resetPasswordRules();
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    // Validation functions
    function validateUsername() {
        const value = usernameInput.value.trim();
        
        if (value === '') {
            usernameError.textContent = 'Username is required';
            return false;
        }
        
        if (value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            return false;
        }
        
        usernameError.textContent = '';
        return true;
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = 'Email is required';
            return false;
        }
        
        if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        }
        
        emailError.textContent = '';
        return true;
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        let isValid = true;
        
        // Check password rules
        const hasMinLength = value.length >= 8;
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        // Update rule indicators
        document.getElementById('rule-length').classList.toggle('valid', hasMinLength);
        document.getElementById('rule-number').classList.toggle('valid', hasNumber);
        document.getElementById('rule-special').classList.toggle('valid', hasSpecialChar);
        
        if (value === '') {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (!hasMinLength || !hasNumber || !hasSpecialChar) {
            passwordError.textContent = 'Password does not meet requirements';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        return isValid;
    }
    
    function resetPasswordRules() {
        document.getElementById('rule-length').classList.remove('valid');
        document.getElementById('rule-number').classList.remove('valid');
        document.getElementById('rule-special').classList.remove('valid');
    }
});