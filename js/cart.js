// Load cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedCoupon = null; // Track if coupon is applied
let usersCheckingOut = Math.floor(Math.random() * 100) + 1; // Random number of users checking out

// Display cart items on the page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalBeforeDiscount = document.getElementById('total-before-discount');
    const totalDiscountAmount = document.getElementById('total-discount-amount');
    const couponDiscountAmount = document.getElementById('coupon-discount-amount');
    const couponDiscountLine = document.getElementById('coupon-discount-line'); // New coupon discount element
    const usersCheckingOutStat = document.getElementById('users-checking-out');

    // Set users checking out stat
    usersCheckingOutStat.textContent = `${usersCheckingOut} users are checking out right now`;

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '$0.00';
        totalBeforeDiscount.textContent = '$0.00';
        totalDiscountAmount.textContent = '$0.00';
        couponDiscountLine.style.display = 'none'; // Hide coupon discount line if no items
        return;
    }

    // Variables to store the totals
    let total = 0;
    let originalTotal = 0;

    // Generate HTML for each cart item
    cart.forEach((item, index) => {
        const salePrice = item.salePrice ? item.salePrice.replace('$', '') : '0.00';
        const originalPrice = item.originalPrice ? item.originalPrice.replace('$', '') : '0.00';

        const itemPrice = parseFloat(salePrice); // Sale price
        const originalItemPrice = parseFloat(originalPrice); // Original price
        const itemTotal = itemPrice * item.quantity;
        const originalItemTotal = originalItemPrice * item.quantity;
        const productPage = item.productPage;
        total += itemTotal;
        originalTotal += originalItemTotal;

        const cartItemHTML = `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" />
                <div class="cart-item-info">
                    <h4><a href="${item.productPage}" class="cart-item-link">${item.name}</a></h4>
                    <p id="original-price" class="original-price">$${originalItemPrice.toFixed(2)}</p>
                    <p id="price" class="price">$${itemPrice.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <span>${item.quantity}</span>
                    <button class="decrease-quantity" data-index="${index}">-</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Calculate total discount
    let discountAmount = originalTotal - total;
    let couponDiscount = 0;

    // Apply coupon discount if applicable
    if (appliedCoupon === "SAVE20" && total > 0) {
        couponDiscount = total * 0.20; // 20% discount
        discountAmount += couponDiscount;
        total -= couponDiscount;
        couponDiscountAmount.textContent = `-$${couponDiscount.toFixed(2)}`;
        couponDiscountLine.style.display = 'flex'; // Show the coupon discount line
    } else {
        couponDiscountLine.style.display = 'none'; // Hide coupon discount line if no coupon
    }

    // Update the totals in the cart summary
    totalBeforeDiscount.textContent = `$${originalTotal.toFixed(2)}`;
    totalDiscountAmount.textContent = `-$${discountAmount.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add quantity change functionality
document.addEventListener('click', function (e) {
    const target = e.target;
    const index = target.getAttribute('data-index');

    if (target.classList.contains('increase-quantity')) {
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    if (target.classList.contains('decrease-quantity')) {
        const cartItem = document.querySelector(`.cart-item[data-index="${index}"]`);
        if (cart[index].quantity === 1) {
            cartItem.classList.add('fade-out');
            setTimeout(() => {
                cart.splice(index, 1); // Remove the item from the cart
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }, 600);
        } else {
            cart[index].quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }
});

// Load the cart items when the page is ready
document.addEventListener('DOMContentLoaded', displayCartItems);

// Custom alert function
function showCustomAlert(message, type = 'success') {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert', type);
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    alertBox.classList.add('show');

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

// Apply coupon code
document.querySelector('.apply-coupon').addEventListener('click', function () {
    const couponInput = document.getElementById('coupon-code').value.trim().toUpperCase();
    const cartTotalValue = parseFloat(document.getElementById('cart-total').textContent.replace('$', ''));

    if (cartTotalValue === 0) {
        showCustomAlert('Cannot apply coupon.', 'error');
        return;
    }

    if (appliedCoupon === "SAVE20") {
        showCustomAlert('Coupon already applied!', 'error');
    } else if (couponInput === "SAVE20") {
        appliedCoupon = "SAVE20";
        showCustomAlert('Coupon applied! 20% discount has been applied to your total.');
    } else {
        showCustomAlert('Invalid coupon code.', 'error');
    }

    displayCartItems(); // Recalculate totals with coupon
});

// Show confirmation box for clearing the cart
function showClearCartConfirmation() {
    const confirmationBox = document.createElement('div');
    confirmationBox.classList.add('confirmation-box');
    confirmationBox.innerHTML = `
    <h4>Are you sure you want to clear the entire cart?</h4>
    <div class="confirmation-buttons">
        <button class="btn confirm-clear">Yes</button>
        <button class="btn cancel-clear">No</button>
    </div>
    `;
    document.body.appendChild(confirmationBox);

    // Handle "Yes" button
    document.querySelector('.confirm-clear').addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        document.body.removeChild(confirmationBox);
    });

    // Handle "No" button
    document.querySelector('.cancel-clear').addEventListener('click', () => {
        document.body.removeChild(confirmationBox);
    });
}

// Event listener for the clear cart button
document.querySelector('.clear-cart').addEventListener('click', () => {
    showClearCartConfirmation();
});

// Load the cart items when the page is ready
document.addEventListener('DOMContentLoaded', displayCartItems);