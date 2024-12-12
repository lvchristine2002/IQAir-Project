# IQAir-Project

## Description 

This website works with [IQAir API]to find your local real-time air quality information or information for any city you want globally. 

### Key features 

- Real-time weather updates
- Location-based weather information
- Air Quality Index and temperature 

## Target browsers 

- iOS: Safari (iOS 12.0 and above)
- Android: Google Chrome (Android 7.0 and above), Samsung Internet (latest versions)
- Google Chrome (latest versions)
- Apple Safari (latest versions for macOS and iOS)
- Microsoft Edge (latest versions)

## Link to Developer manual 

For more detail on how to use IQAir API

[**Developer manual**](https://api-docs.iqair.com/?version=latest)

## Prerequisites

Before running the application, make sure that you have the following installed: 

- **Node.js**: Version 14 or higher
- **npm** (Node Package Manager)

## Steps to Install application and all dependencies

### 1. Clone the repository

Clone the repository by running the following command:

   ```bash
   git clone git@github.com:lvchristine2002/IQAir-Project.git
   cd IQAir-Project
   ```

#### 2. install dependencies 

npm install 

#### How to Run the Application

npm start

#### API for server application information (Get, Post, Patch, endpoints)

1. GET Get nearest city data (IP geolocation)

This returns the nearest city's data, using IP address geolocation  

url: https://api.airvisual.com/v2/nearest_city?key={API_KEY}

Example Request: 
curl --location -g 'http://api.airvisual.com/v2/nearest_city?key={{YOUR_API_KEY}}'

Example Response: 
{
  "status": "success",
  "data": {
    "city": "Bull Run",
    "state": "Virginia",
    "country": "USA",
    "current": {
      "pollution": {
        "aqius": 53
      },
      "weather": {
        "tp": 10
      }
    }
  }
}


Returns this data: 
- City: city name, state, country
- Air quality index: Air Quality Index (AQI)
- Temperature: Temperature (in celsius)

2. GET specified city data 

This returns the specified city's data

url: https://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key={API_KEY}

Example request: 
curl --location -g 'http://api.airvisual.com/v2/city?city=Bull%20Run&state=Virginia&country=USA&key={{YOUR_API_KEY}}'

Example response: 
{
  "status": "success",
  "data": {
    "city": "Bull Run",
    "state": "Virginia",
    "country": "USA",
    "current": {
      "pollution": {
        "aqius": 53
      },
      "weather": {
        "tp": 10
      }
    }
  }
}

PARAMS
city
{{CITY_NAME}}

state
{{STATE_NAME}}

country
{{COUNTRY_NAME}}

key
{{YOUR_API_KEY}}

Returns this data: 
- City: city name, state, country
- Air quality index: Air Quality Index (AQI)
- Temperature: Temperature (in celsius)

3. GET List supported cities in a state

This returns specific cities in a state that have available data. 

url: http://api.airvisual.com/v2/cities?state={{STATE_NAME}}&country={{COUNTRY_NAME}}&key={{YOUR_API_KEY}}

Example request: 
curl --location -g 'http://api.airvisual.com/v2/cities?state=New%20York&country=USA&key={{YOUR_API_KEY}}'

Example response: 
{
  "status": "success",
  "data": [
    {
      "city": "Addison"
    },
    {
      "city": "Albany"
    },
    {
      "city": "Buffalo"
    }
  ]
}


#### Bugs and Future Devlopment 

- Bug #1: The data can lag and may say it is not available. Have to wait or refresh page so that the information is accurate and loads. 
- Bug #2: Location might not be accurate, might be delays with API or outdated data
- Bug #2: Map issues might not load in some browsers

- Development #1: Include more weather APIs that feature more weather updates that a user can access if they want  including: cloud updates, rain/storm updates, snow updates, uv index, etc. 
- Development #2: Include an interactive map so users can simply click on their desired location and get information that way
