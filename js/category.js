// Function to apply the animation to buttons when the third button comes into view
function animateCategoryButtons(entries, observer) {
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
  
  // Ensure the DOM is fully loaded before executing the script
  document.addEventListener('DOMContentLoaded', () => {
      // Get all the buttons within the product cards
      const buttons = document.querySelectorAll('.product .btn');
      console.log(buttons); // Log the list of buttons to ensure they are being detected
  
      // Check if at least 3 buttons are present
      if (buttons.length > 2) {
          const thirdButton = buttons[2]; // Select the third button
          console.log(thirdButton); // Log the third button to verify
          
          // Create an IntersectionObserver to trigger the animation
          const observer = new IntersectionObserver(animateCategoryButtons, {
            threshold: 0.1 // Trigger when 10% of the third button is visible
          });
  
          // Observe the third product button to start the animation sequence
          observer.observe(thirdButton);
      } else {
          console.log("Not enough buttons found to apply animation.");
      }
  });