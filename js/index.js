const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=jma_seamless";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to get weather data.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Weather data loaded:", data);
        
        const locationInfo = document.querySelector('.locationInfo p');
        if (locationInfo) {
            locationInfo.textContent = `${data.longitude}°`;
        }
        const locationInfo2 = document.querySelector('.locationInfo .other');
        if (locationInfo2) {
            locationInfo2.textContent = `${data.latitude}°`;
        }
        
        const elevationElement = document.querySelector('.additionalInfo h2:first-child');
        if (elevationElement) {
            elevationElement.textContent = `Elevation: ${data.elevation}m`;
        }
        
        const currentTemp = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
        const currentTime = data.hourly.time[data.hourly.time.length - 1];
        
        const tempContainer = document.querySelector('.Temp');
        tempContainer.innerHTML = ''; // Clear existing content
        
        const tempHeading = document.createElement('h3');
        tempHeading.textContent = 'Current Temperature';
        tempContainer.appendChild(tempHeading);
        
        const tempValue = document.createElement('p');
        tempValue.className = 'temperature-value';
        tempValue.innerHTML = `${currentTemp}°C`;
        tempContainer.appendChild(tempValue);
        
        const timeDisplay = document.createElement('p');
        timeDisplay.className = 'time-display';
        timeDisplay.textContent = `Last updated: ${formatTime(currentTime)}`;
        tempContainer.appendChild(timeDisplay);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = 'Failed to load weather data. Please try again later.';
        document.querySelector('.Temp').appendChild(errorElement);
    });

function formatTime(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleString();
}
