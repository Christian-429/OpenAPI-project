const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=jma_seamless";
 
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("failed to get weather data.");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error fetching forecast for japan",error);
    })