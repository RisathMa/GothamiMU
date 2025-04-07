// DOM Elements
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.dots-container');

// Set up the slider
let activeSlide = 0;
const slideInterval = 5000; // 5 seconds
let slideTimer;

// Create dots for each slide
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });
}

// Set active slide
function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set the active slide and dot
    activeSlide = index;
    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    } else if (activeSlide >= slides.length) {
        activeSlide = 0;
    }
    
    slides[activeSlide].classList.add('active');
    dots[activeSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    goToSlide(activeSlide + 1);
}

// Previous slide
function prevSlide() {
    goToSlide(activeSlide - 1);
}

// Reset timer when manually changing slides
function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
}

// Start automatic slide change
function startTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetTimer();
});

function handleSwipe() {
    // Detect swipe direction
    if (touchEndX < touchStartX - 50) {
        // Swipe left - go to next slide
        nextSlide();
    } else if (touchEndX > touchStartX + 50) {
        // Swipe right - go to previous slide
        prevSlide();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetTimer();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetTimer();
    }
});

// Initialize slider
function initSlider() {
    createDots();
    startTimer();
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);
