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




// Initialize the cart (load from localStorage or empty array)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Prevent the default action of the <a> tag
    e.preventDefault();
    e.stopPropagation(); // Stops the event from bubbling up to the parent <a> tag

    const productCard = e.target.closest('.product');
    const productName = productCard.querySelector('h3').textContent;
    const salePrice = productCard.querySelector('.sale-price').textContent;
    const originalPrice = productCard.querySelector('.original-price').textContent;
    const productImgSrc = productCard.querySelector('img').getAttribute('src');
    const productPage = productCard.querySelector('.product-link').textContent;
    
    const product = {
      name: productName,
      salePrice: salePrice,
      originalPrice: originalPrice,
      image: productImgSrc,
      quantity: 1, // Default quantity is 1
      productPage: productPage
    };

    addToCart(product);
  });
});

// Function to add the product to the cart
function addToCart(product) {
  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
  updateCartIcon();
  showItemAddedPopup(); // Show the new bottom circular popup
}

// Function to show the bottom circular popup
function showItemAddedPopup() {
  const popup = document.querySelector('.item-added-popup');
  popup.classList.add('show');

  // Hide popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

// Update the cart icon to reflect the number of items
function updateCartIcon() {
  const cartIcon = document.querySelector('.cart-icon');
  const cartCount = document.querySelector('.cart-count');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    cartIcon.classList.add('show'); // Show the cart icon
    cartCount.textContent = totalItems; // Update the count
  } else {
    cartIcon.classList.remove('show'); // Hide the cart icon if no items
  }
}



// Cart Icon Click - Redirect to cart page (replace with actual cart page URL)
document.querySelector('.cart-icon').addEventListener('click', () => {
  window.location.href = 'cart.html'; // Example: Redirect to a cart page
});

// Function to add a specific product from the product detail page to the cart
function addProductToCartFromDetail() {
  const productName = document.querySelector('h2').textContent; // Get the product name from the <h2> tag
  const salePrice = document.querySelector('.price').textContent; // Get the price directly from the <p class="price">
  const productImgSrc = document.querySelector('.product-image img').getAttribute('src'); // Get the image source

  const productPage = document.querySelector('.product-link').textContent;
  const originalPrice = document.querySelector('.original-price').textContent;

  const product = {
    name: productName,
    salePrice: salePrice,
    originalPrice: originalPrice, // If there's no original price on the product page, we can leave this as null or remove it
    image: productImgSrc,
    quantity: 1, // Default quantity is 1
    productPage: productPage
  };

  addToCart(product);  // Use the existing addToCart function
}

// Add event listener to the Add to Cart button on the product detail page
const addToCartButton = document.getElementById('add-to-cart');
if (addToCartButton) {
  addToCartButton.addEventListener('click', addProductToCartFromDetail);
}

// Initial update for cart icon in case items are in the cart already
updateCartIcon();