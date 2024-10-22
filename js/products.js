// Function to apply the animation to buttons when the third button comes into view
function animateButtonsSequentially(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get all buttons inside products
      const buttons = document.querySelectorAll('.product .btn');
      buttons.forEach((btn, index) => {
        btn.style.animation = `seesaw 0.5s ease-in-out 1 forwards`;
        btn.style.animationDelay = `${index * 1.5 + 0.5}s`; // 1.5s delay between each button + 0.5s initial delay
      });
    } else {
      // Reset animation when button is out of view to allow re-trigger on scrolling
      const buttons = document.querySelectorAll('.product .btn');
      buttons.forEach((btn) => {
        btn.style.animation = 'none'; // Reset animation
      });
    }
  });
}

// Create an IntersectionObserver to trigger when the third .product button is in view
const buttons = document.querySelectorAll('.product .btn');
console.log(buttons); // This will log the list of buttons
const thirdButton = document.querySelectorAll('.product .btn')[2]; // Third button
console.log(thirdButton); // Log the third button
const observer = new IntersectionObserver(animateButtonsSequentially, {
  threshold: 0.1 // Trigger when 10% of the button is visible
});

// Observe the third product button to start the animation sequence
if (thirdButton) {
  observer.observe(thirdButton);
}