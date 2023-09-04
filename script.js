document.addEventListener("DOMContentLoaded", function () {
    // This code runs when the HTML document is fully loaded and ready to be manipulated.

    // Get references to HTML elements by their IDs.
    const searchBtn = document.getElementById("searchBtn"); // Get the "Get Weather" button.
    const locationInput = document.getElementById("locationInput"); // Get the input field where the user enters a city name.
    const weatherData = document.getElementById("weatherData"); // Get the container where weather data will be displayed.

    // Replace this with your actual OpenWeatherMap API key.
    const apiKey = "d9e6c9972fa7a2a54788b77479293b5a";

    // Add an event listener to the "Get Weather" button.
    searchBtn.addEventListener("click", function () {
        // This function runs when the button is clicked.

        // Get the trimmed value of the input field (the city name entered by the user).
        const location = locationInput.value.trim();

        // Check if the input is empty.
        if (location === "") {
            alert("Please enter a city name.");
            return; // Exit the function early if the input is empty.
        }

        // Construct the URL for the OpenWeatherMap API request.
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        // Make a GET request to the OpenWeatherMap API using the fetch function.
        fetch(apiUrl)
            .then((response) => {
                // This code runs when the API response is received.

                // Check if the API response is not okay (e.g., if there's an error).
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                // Parse the JSON response from the API.
                return response.json();
            })
            .then((data) => {
                // This code runs when the JSON data has been successfully parsed.

                // Extract relevant data from the API response.
                const { name, main, weather } = data;
                const temperature = main.temp;
                const description = weather[0].description;

                // Display the weather data on the web page.
                weatherData.innerHTML = `<p>Location: ${name}</p><p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
            })
            .catch((error) => {
                // This code runs if there was an error during the fetch or data processing.

                console.error("Error fetching weather data: ", error);

                // Display an error message on the web page.
                weatherData.innerHTML = "An error occurred while fetching weather data.";
            });
    });
});
