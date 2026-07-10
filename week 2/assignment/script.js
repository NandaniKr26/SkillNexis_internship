// Function to update the Digital Clock
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'

    // Pad with leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('digital-clock').textContent = timeString;

    // Update Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, options);
}

// Function to update the Countdown to New Year
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const newYearDate = new Date(`January 1, ${currentYear + 1} 00:00:00`);

    const diffTime = newYearDate - now; // Time difference in milliseconds

    if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffTime / 1000 / 60) % 60);
        const seconds = Math.floor((diffTime / 1000) % 60);

        // Pad with leading zeros and update DOM
        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    } else {
        // If it's New Year
        document.querySelector('.countdown-container').innerHTML = '<h2>Happy New Year!</h2>';
    }
}

// Initialize and Set Intervals
updateClock();
updateCountdown();

// Update every second
setInterval(updateClock, 1000);
setInterval(updateCountdown, 1000);