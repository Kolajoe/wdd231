const API_KEY = 'b3d370331a6d9a4819eadcb23c249d29';
const CITY = 'Kinshasa';
const COUNTRY = 'CD';
const UNITS = 'metric'; 

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=${UNITS}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=${UNITS}`;

async function getCurrentWeather() {
    try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('current-temp').textContent = '--°C';
        document.getElementById('weather-description').textContent = 'Unable to load weather';
        return null;
    }
}

async function getForecast() {
    try {
        const response = await fetch(FORECAST_URL);
        if (!response.ok) throw new Error('Forecast data not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        document.getElementById('forecast-container').innerHTML = '<div class="forecast-day">Unable to load forecast</div>';
        return null;
    }
}

function displayCurrentWeather(data) {
    if (!data) return;
    
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const tempUnit = UNITS === 'metric' ? '°C' : '°F';
    
    document.getElementById('current-temp').innerHTML = `
        <span class="temp-value">${temp}${tempUnit}</span>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
    `;
    document.getElementById('weather-description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
}

function displayForecast(data) {
    if (!data) return;
    
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    const next3Days = dailyForecasts.slice(0, 3);
    
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    next3Days.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = days[date.getDay()];
        const temp = Math.round(day.main.temp);
        const tempUnit = UNITS === 'metric' ? '°C' : '°F';
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;
        
        const dayCard = document.createElement('div');
        dayCard.className = 'forecast-day';
        dayCard.innerHTML = `
            <span class="forecast-day-name">${dayName}</span>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <span class="forecast-temp">${temp}${tempUnit}</span>
            <span class="forecast-desc">${description.charAt(0).toUpperCase() + description.slice(1)}</span>
        `;
        container.appendChild(dayCard);
    });
}

async function loadWeather() {
    const weatherData = await getCurrentWeather();
    displayCurrentWeather(weatherData);
    
    const forecastData = await getForecast();
    displayForecast(forecastData);
}

document.addEventListener('DOMContentLoaded', loadWeather);