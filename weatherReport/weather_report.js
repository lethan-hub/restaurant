function showweatherDetails(event) {
    // 1. Prevent the default form submission (e.g., page reload)
    event.preventDefault();

    // 2. Variables and fetch call are now INSIDE the function
    const city = document.getElementById('city').value.trim();
    const apiKey = 'YOUR_API_KEY'; 
    
    if (!city) {
        alert("Please enter a city name.");
        return; // Stop if input is empty
    }
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherInfo = document.getElementById('weatherInfo');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                // Throw an error if the HTTP status is not 2xx
                throw new Error(`City not found or API error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Success: Display the weather data
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &deg;C</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
        })
        // 3. Add the .catch() to handle errors
        .catch(error => {
            console.error('Error fetching weather:', error);
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again. (${error.message})</p>`;
        });
}

// 4. The event listener is correctly placed outside the function
document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);