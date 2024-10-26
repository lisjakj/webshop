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

// Function to show success popup
function showSuccessPopup() {
    const successPopup = document.createElement('div');
    successPopup.classList.add('popup');
    successPopup.style.position = 'fixed';
    successPopup.style.top = '20px';
    successPopup.style.left = '50%';
    successPopup.style.transform = 'translateX(-50%)';
    successPopup.style.backgroundColor = '#fdf0d5';
    successPopup.style.padding = '20px';
    successPopup.style.border = '2px solid #003049';
    successPopup.style.borderRadius = '10px';
    successPopup.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    successPopup.style.fontFamily = 'Poppins, sans-serif';
    successPopup.innerHTML = '<p>Thank you for subscribing! Your coupon code has been sent to your email.</p>';

    document.body.appendChild(successPopup);

    setTimeout(() => {
        document.body.removeChild(successPopup);
    }, 5000); // Show success popup for 5 seconds
}

// Handle email form submission
document.getElementById('email-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('user-email').value;

    if (email) {
        try {
            // Send the email to Google Sheets
            const response = await fetch('https://script.google.com/macros/s/AKfycbwBS1uiwtdIvtfQAbIt_KIONZb5TeQJCeLV74l8EgqRIh5oxVq0cQWivXTAe1UVxB9J/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                // Store email submission in local storage
                localStorage.setItem('emailSubmitted', 'true');

                // Close the email popup and show success popup
                closeEmailPopup();
                showSuccessPopup();
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            alert('Something went wrong. Please try again later.');
        }
    }
});

// Show email popup after 10 seconds
document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear();
    setTimeout(openEmailPopup, 10000); // 10 seconds
});