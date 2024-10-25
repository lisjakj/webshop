document.addEventListener('DOMContentLoaded', function() {
    // Check if there's already an end time stored in localStorage
    let endTime = localStorage.getItem('saleEndTime');

    // Function to set a new countdown timer
    function setNewEndTime() {
        endTime = new Date(Date.now() + 48 * 60 * 1000).getTime(); // 48 minutes from now
        localStorage.setItem('saleEndTime', endTime);
    }

    // If no end time is set, initialize it to 48 minutes from now
    if (!endTime) {
        setNewEndTime();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft > 0) {
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('countdown').textContent = `${minutes}m ${seconds}s`;
        } else {
            // Restart the countdown when it reaches zero
            setNewEndTime();
            updateCountdown(); // Immediately update to reflect the new countdown
        }
    }

    // Initial call to display the countdown immediately
    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
});