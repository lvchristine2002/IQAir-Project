const API_KEY = 'c9714521-7f63-4ad7-a0ae-6898a2c2e4c7'; //IQAir API key

// Function to fetch local air quality using the nearest_city endpoint
async function fetchLocalAirQuality() {
    const localDiv = document.getElementById('local-data');
    try {
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?key=${API_KEY}`);
        const data = await response.json();

        if (data.status !== 'success') {
            localDiv.textContent = 'Unable to fetch local air quality data.';
            return;
        }

        const city = data.data.city;
        const state = data.data.state;
        const country = data.data.country;
        const aqi = data.data.current.pollution.aqius;
        const temperature = data.data.current.weather.tp;

        localDiv.innerHTML = `
            <strong>City:</strong> ${city}, ${state}, ${country} <br>
            <strong>AQI (Air Quality Index):</strong> ${aqi} <br>
            <strong>Temperature:</strong> ${temperature}°C
        `;
    } catch (error) {
        console.error('Error fetching local air quality:', error);
        localDiv.textContent = 'Error loading data. Please try again later.';
    }
}

// Function to fetch air quality for a user-searched city
async function searchCityAirQuality() {
    const cityInput = document.getElementById('city-input').value.trim();
    const searchResults = document.getElementById('search-results');

    if (cityInput === '') {
        searchResults.textContent = 'Please enter a city name.';
        return;
    }

    searchResults.textContent = 'Searching...';

    try {
        // Fetch data for the searched city
        const response = await fetch(`https://api.airvisual.com/v2/city?city=${cityInput}&state=&country=&key=${API_KEY}`);
        const data = await response.json();

        if (data.status !== 'success') {
            searchResults.textContent = `No data found for "${cityInput}".`;
            return;
        }

        const aqi = data.data.current.pollution.aqius;
        const temperature = data.data.current.weather.tp;

        searchResults.innerHTML = `
            <strong>City:</strong> ${cityInput} <br>
            <strong>AQI (Air Quality Index):</strong> ${aqi} <br>
            <strong>Temperature:</strong> ${temperature}°C
        `;
    } catch (error) {
        console.error('Error fetching city air quality:', error);
        searchResults.textContent = 'Error loading data. Please try again later.';
    }
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', searchCityAirQuality);

// Fetch local air quality when the page loads
fetchLocalAirQuality();
