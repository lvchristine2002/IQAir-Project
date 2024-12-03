//IQAir API key
const API_KEY = 'https://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=c9714521-7f63-4ad7-a0ae-6898a2c2e4c7';

// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to fetch global city rankings
async function fetchGlobalAirQuality() {
    try {
        const response = await fetch(`https://api.airvisual.com/v2/cities?state=California&country=USA&key=${API_KEY}`);
        const data = await response.json();

        // For demonstration, let's assume we get an array of cities
        const cities = data.data;

        cities.forEach(async (city) => {
            // Fetch air quality for each city
            const cityResponse = await fetch(`https://api.airvisual.com/v2/city?city=${city.city}&state=${city.state}&country=${city.country}&key=${API_KEY}`);
            const cityData = await cityResponse.json();
            const aqi = cityData.data.current.pollution.aqius;
            const lat = cityData.data.location.coordinates[1];
            const lon = cityData.data.location.coordinates[0];

            // Add a marker to the map
            L.circleMarker([lat, lon], {
                radius: 8,
                fillColor: getColor(aqi),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<strong>${city.city}</strong><br>AQI: ${aqi}`).addTo(map);
        });

    } catch (error) {
        console.error('Error fetching global air quality data:', error);
    }
}

// Function to fetch most polluted cities
async function fetchMostPollutedCities() {
    try {
        const response = await fetch(`https://api.airvisual.com/v2/cities?state=California&country=USA&key=${API_KEY}`);
        const data = await response.json();

        // Sort cities by AQI in descending order (assuming data structure allows)
        const cities = data.data; // Replace with actual data path
        cities.sort((a, b) => b.current.pollution.aqius - a.current.pollution.aqius);

        // Get top 5 most polluted cities
        const topCities = cities.slice(0, 5);

        const pollutedCitiesList = document.getElementById('polluted-cities');
        topCities.forEach((city) => {
            const li = document.createElement('li');
            li.textContent = `${city.city}, AQI: ${city.current.pollution.aqius}`;
            pollutedCitiesList.appendChild(li);
        });

    } catch (error) {
        console.error('Error fetching most polluted cities:', error);
    }
}

// Helper function to determine marker color based on AQI
function getColor(aqi) {
    return aqi > 300 ? '#7e0023' :
           aqi > 200 ? '#660099' :
           aqi > 150 ? '#cc0033' :
           aqi > 100 ? '#ff9933' :
           aqi > 50  ? '#ffde33' :
                       '#009966';
}

// Fetch data when the page loads
fetchGlobalAirQuality();
fetchMostPollutedCities();
