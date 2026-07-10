const API_KEY = '491c3fd4775e5673ad66325f9027dce4';

const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// DOM Elements for Weather Data
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');

// Trigger search on Enter key
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim().toLowerCase();

    if (!city) {
        showError('Please enter a city name.');
        return;
    }

    // Hide previous info and errors
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found or API error.');
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    // Populate Data
    cityName.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;

    // Set Icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.classList.remove('hidden');

    // Show Info Panel
    weatherInfo.classList.remove('hidden');
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
}