// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Animation
function checkScroll() {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Active Navigation on Scroll
function setActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// Navbar background change on scroll
function handleNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--background-color)';
        navbar.style.boxShadow = 'var(--shadow)';
    }
}

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple form validation
    if (name === '' || email === '' || message === '') {
        alert('Please fill all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    
    // Reset the form
    contactForm.reset();
});

// Initial check
window.addEventListener('load', () => {
    checkScroll();
    setActiveNavLink();
    handleNavbarBackground();
});

// Event listeners
window.addEventListener('scroll', () => {
    checkScroll();
    setActiveNavLink();
    handleNavbarBackground();
});

// Add resize event listener
window.addEventListener('resize', checkScroll);
