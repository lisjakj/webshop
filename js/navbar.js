// Hamburger Menu Toggle Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

let menuOpen = false;

hamburger.addEventListener('click', () => {
    if (!menuOpen) {
        navLinks.classList.remove('hide');  // Ensure 'hide' class is removed before showing
        navLinks.classList.add('show');
    } else {
        navLinks.classList.remove('show');  // Ensure 'show' class is removed before hiding
        navLinks.classList.add('hide');
    }
    hamburger.classList.toggle('open');
    menuOpen = !menuOpen;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Add a scroll event listener
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {  // Adjust the scroll distance as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});