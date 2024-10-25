document.addEventListener('DOMContentLoaded', function() {
    const peopleBrowsingElement = document.getElementById('people-browsing');
    let currentBrowsing = parseInt(peopleBrowsingElement.textContent);

    function updateBrowsingCount() {
        const change = Math.floor(Math.random() * 3) - 1; // Random change between -1 and 1
        currentBrowsing = Math.max(10, Math.min(20, currentBrowsing + change)); // Stay between 10 and 20
        peopleBrowsingElement.textContent = currentBrowsing;
    }

    setInterval(updateBrowsingCount, 3000); // Update every 3 seconds
});