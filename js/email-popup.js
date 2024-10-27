
// Function to open email popup
function openEmailPopup() {
    if (!localStorage.getItem('emailSubmitted')) {
        document.getElementById('email-popup').style.display = 'block';
    }
}

// Function to close email popup
function closeEmailPopup() {
    document.getElementById('email-popup').style.display = 'none';
}

// Function to show success or error popup
function showMessagePopup(message, type = 'success') {
    const popup = document.createElement('div');
    popup.classList.add('popup', type); // Add type (success or error) as a class
    popup.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 5000); // Show success popup for 5 seconds
}

// Handle email form submission
document.getElementById('email-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('user-email').value;

    if (email) {
        try {
            // Send the email to Google Sheets with form-like data instead of JSON
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch('https://script.google.com/macros/s/AKfycbzspTN0qSmDtyrvYoORIgej8MrrHZoEmUxDXp5OcnGo6kMdKZqc84bLpsnN_gqyvV6z/exec', {
                method: 'POST',
                mode: 'cors', // Allow CORS requests
                body: formData,
            });

            // Since 'no-cors' mode prevents you from seeing the response, use 'cors' mode and check if the response is okay
            if (response.ok) {
                const responseData = await response.json();

                if (responseData.status === 'success') {
                    // Store email submission in local storage
                    localStorage.setItem('emailSubmitted', 'true');

                    // Close the email popup and show success popup
                    closeEmailPopup();
                    showMessagePopup('Thank you for subscribing! Your coupon code has been sent to your email. Please check your inbox or spam folder.', 'success');
                } else {
                    showMessagePopup(responseData.message, 'error');
                }
            } else {
                showMessagePopup('Something went wrong. Please try again later.', 'error');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            showMessagePopup('Something went wrong. Please try again later.', 'error');
        }
    }
});
// Show email popup after 10 seconds
document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear();
    updateCartIcon();
    setTimeout(openEmailPopup, 10000); // 10 seconds
});

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');

    // Load the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart icon and count based on the number of items
    if (totalItems > 0) {
        cartIcon.classList.add('show'); // Show the cart icon
        cartCount.textContent = totalItems; // Update the count
    } else {
        cartIcon.classList.remove('show'); // Hide the cart icon if no items
        cartCount.textContent = ''; // Clear the count
    }
}