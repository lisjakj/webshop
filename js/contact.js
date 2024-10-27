document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with the Public Key
    emailjs.init("-Cei3Znj0gWGTwppT");

    const contactForm = document.getElementById('contact-form');
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const fromName = formData.get('name');
        const fromEmail = formData.get('email');
        const message = formData.get('message');

        // Check if all required fields are filled out
        if (!fromName || !fromEmail || !message) {
            console.error('All fields are required.');
            showErrorPopup();
            return;
        }

        // Email payload for the Heartistry team (Admin Email)
        const adminPayload = {
            from_name: fromName,
            from_email: fromEmail,
            message: message,
        };

        // Email payload for the customer
        const customerPayload = {
            to_name: fromName,
            to_email: fromEmail,
        };

        // Send email to Heartistry team
        emailjs.send('service_9h8fmdd', 'template_xohigwj', adminPayload)
            .then(() => {
                console.log('Email to Heartistry team sent successfully.');

                // After successfully sending the email to the team, send the confirmation email to the customer
                return emailjs.send('service_9h8fmdd', 'template_inmbctm', customerPayload);
            })
            .then(() => {
                console.log('Confirmation email to customer sent successfully.');

                // Show success popup
                showSuccessPopup();

                // Clear the form
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);

                // Show error popup
                showErrorPopup();
            });
    });

    function showSuccessPopup() {
        successPopup.style.display = 'block';
        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }

    function showErrorPopup() {
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
});