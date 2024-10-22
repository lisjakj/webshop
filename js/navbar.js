// Hamburger Menu Toggle Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle hamburger menu on click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
});

// Close hamburger menu when clicking outside of it
document.addEventListener('click', (event) => {
    const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target);
    if (!isClickInside) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('open');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Add a scroll event listener for navbar styling
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {  // Adjust the scroll distance as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});