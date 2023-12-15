// Object storing weather data and related functions
let weather = {
    // API key for OpenWeatherMap
    apiKey:"511c0d53e786d6e701870951d85c605d",


    // Function to fetch weather data for a given city
    fetchWeather: function (city) {
      // Using fetch to get weather data from OpenWeatherMap API
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          // Handling response status
          if (!response.ok) {
            // Alert and throw error if weather data is not found
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          // Convert response to JSON
          return response.json();
        })
        // Display weather data
        .then((data) => this.displayWeather(data));
    },

    // Function to display weather data on the webpage
    displayWeather: function (data) {
      // Extracting necessary weather data
      // City name
      const { name } = data;
      const { icon, description } = data.weather[0]; // Weather icon and description
      const { temp, humidity } = data.main; // Temperature and humidity
      const { speed } = data.wind; // Wind speed

      // Updating HTML elements with weather information
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";

        // Removing loading class to display weather information
      document.querySelector(".weather").classList.remove("loading");

      // Changing background based on the city's image from Unsplash
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    // Function to initiate a search based on user input
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  // Event listener for the search button
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search(); // Calls search function when the button is clicked
  });
  
  // Event listener for the search bar to detect "Enter" key press
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search(); // Calls search function on "Enter" key press
      }
    });
  
  weather.fetchWeather("Kolkata"); // Fetches weather data for Kolkata on page load