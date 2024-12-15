const API_KEY = '48de2601-ac97-45bb-b04b-3eca74e7f077'; //IQAir API key

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

// Event listener for state input to trigger city fetching
document.getElementById('state-input').addEventListener('input', function() {
    const stateInput = this.value.trim().toUpperCase(); 
    
    if (stateInput) {
        fetchCitiesInState(stateInput);  
    } else {
        document.getElementById('city-dropdown').style.display = 'none'; 
    }
});

// Function to fetch list of cities in a given state
async function fetchCitiesInState(state, country = "USA") {
    const cityDropdown = document.getElementById('city-dropdown');
    cityDropdown.innerHTML = "<option value=''>List of cities available in the selected state</option>"; 

    try {
        const response = await fetch(`http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${API_KEY}`);
        const data = await response.json();

        if (data.status !== 'success') {
            cityDropdown.style.display = 'none';
            return;
        }

        // Populate city dropdown with the list of cities
        data.data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.city;
            option.textContent = city.city;
            cityDropdown.appendChild(option);
        });

        
        cityDropdown.style.display = 'block';

    } catch (error) {
        console.error('Error fetching cities:', error);
        cityDropdown.style.display = 'none'; 
    }
}


// Function to fetch air quality for a user-searched city
async function searchCityAirQuality() {
    let cityInput = document.getElementById('city-input').value.trim();

    let stateInput = document.getElementById('state-input').value.trim();
    stateInput = stateInput.toUpperCase();
    const searchResults = document.getElementById('search-results');

    if (cityInput === '') {
        searchResults.textContent = 'Please enter a city name.';
        return;
    }

    if (stateInput === '') {
        searchResults.textContent = 'Please enter a state name.';
        return;
    }

    const cityList = await fetch(`http://api.airvisual.com/v2/cities?state=${stateInput}&country=USA&key=48de2601-ac97-45bb-b04b-3eca74e7f077`);
    const data= await cityList.json();
    console.log("State list: ", data);


    searchResults.textContent = 'Searching...';

    try {
        // Fetch data for the searched city
        const response = await fetch(`https://api.airvisual.com/v2/city?city=${cityInput}&state=${stateInput}&country=USA&key=${API_KEY}`);
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
