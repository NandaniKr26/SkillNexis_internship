// IMPORTANT: Replace with a real OpenWeatherMap API key if you want live data.
// Leave blank to use the mock data fallback system.
const API_KEY = '';

// Fallback Mock Data in case API key is not provided or API fails
const MOCK_DATA = {
    'london': {
        name: 'London',
        main: { temp: 15, humidity: 72 },
        weather: [{ description: 'light rain', icon: '10d' }]
    },
    'tokyo': {
        name: 'Tokyo',
        main: { temp: 22, humidity: 60 },
        weather: [{ description: 'clear sky', icon: '01d' }]
    },
    'new york': {
        name: 'New York',
        main: { temp: 18, humidity: 55 },
        weather: [{ description: 'scattered clouds', icon: '03d' }]
    }
};

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

    // If no API key is provided, try using mock data first
    if (!API_KEY) {
        if (MOCK_DATA[city]) {
            displayWeather(MOCK_DATA[city]);
            return;
        } else {
            showError('No API key provided. Mock data available for: London, Tokyo, New York.');
            return;
        }
    }

    // Real API Call if API_KEY exists
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