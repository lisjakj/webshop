const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.arrow-next');
const prevButton = document.querySelector('.arrow-prev');
const dots = Array.from(document.querySelectorAll('.dot'));

let currentSlide = 0;
let autoScrollInterval;

// Function to update slide position
function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateDots();
}

// Function to update dots
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// Move to the next slide
function moveToNextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; // Loop back to the first slide
    }
    updateSlidePosition();
}

// Move to the previous slide
function moveToPrevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = slides.length - 1; // Loop back to the last slide
    }
    updateSlidePosition();
}

// Auto-scroll every 7 seconds
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        moveToNextSlide();
    }, 7000); // 7 seconds interval
}

// Reset auto-scroll interval when a manual action is performed
function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}

// Add event listeners for the arrows
nextButton.addEventListener('click', () => {
    moveToNextSlide();
    resetAutoScroll();
});

prevButton.addEventListener('click', () => {
    moveToPrevSlide();
    resetAutoScroll();
});

// Add event listeners for the dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlidePosition();
        resetAutoScroll();
    });
});

// Ensure the carousel remains responsive on window resize
window.addEventListener('resize', updateSlidePosition);

// Start the auto-scroll
startAutoScroll();