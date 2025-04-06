document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Form input animations
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Form validation and submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showErrorMessage('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showErrorMessage('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        showSuccessMessage();
        contactForm.reset();
        
        // Remove focused class from all inputs
        formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Add styles dynamically
        successMessage.style.position = 'fixed';
        successMessage.style.top = '50%';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translate(-50%, -50%)';
        successMessage.style.background = '#fff';
        successMessage.style.padding = '2rem';
        successMessage.style.borderRadius = '15px';
        successMessage.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        successMessage.style.textAlign = 'center';
        successMessage.style.zIndex = '1000';
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.3s ease';
        
        // Style the icon
        const icon = successMessage.querySelector('i');
        icon.style.color = '#4CAF50';
        icon.style.fontSize = '3rem';
        icon.style.marginBottom = '1rem';
        
        // Fade in the message
        setTimeout(() => {
            successMessage.style.opacity = '1';
        }, 100);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 3000);
    }

    function showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        document.body.appendChild(errorMessage);
        
        // Add styles dynamically
        errorMessage.style.position = 'fixed';
        errorMessage.style.top = '20px';
        errorMessage.style.left = '50%';
        errorMessage.style.transform = 'translateX(-50%)';
        errorMessage.style.background = '#ff4444';
        errorMessage.style.color = '#fff';
        errorMessage.style.padding = '1rem 2rem';
        errorMessage.style.borderRadius = '5px';
        errorMessage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        errorMessage.style.zIndex = '1000';
        errorMessage.style.opacity = '0';
        errorMessage.style.transition = 'opacity 0.3s ease';
        
        // Fade in the message
        setTimeout(() => {
            errorMessage.style.opacity = '1';
        }, 100);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
        }, 3000);
    }

    // Add animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    [...infoCards, ...faqItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}); 