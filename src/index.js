// Get current location of the user

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(location=>{
        let currentLongi = location.coords.longitude;
        let currentLati = location.coords.latitude;
        let time = location.timestamp; 

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLati}&lon=${currentLongi}&appid=87f9eb7a1a7a1cb851de100d0d5d0afd`;

        fetch(api)
        .then(response=>response.json())
        .then(currentWeatherData=>{
            //console.log(currentWeatherData)
            displayCurrentWeather(currentWeatherData);
        })
    })
    
}
//function to display weather data
function displayCurrentWeather(weatherData){
    const countryAndCity = document.getElementById('city-country');
    const currentIcon = document.querySelector('#currentIcon');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('wind-speed');
    

    //units conversion from default givenfrom the API;
    const tempInDegree = Math.round(weatherData.main.temp -  273.15, 2);
    const speedInKnots = Math.floor(weatherData.wind.speed * 1.944)
    //insert contents into the tags
    countryAndCity.textContent = `City/ Town: ${weatherData.name} ${weatherData.sys.country}`;
    currentIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherDescription.innerHTML = `${weatherData.weather[0].main} <br>${weatherData.weather[0].description}`;
    temperature.textContent = `${tempInDegree}°C`;
    windSpeed.textContent = `${speedInKnots} Knots`;
}

//get location of the user input

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    const userInput = document.getElementById('search-input').value;
    
    //fetch weather data based on the user input
    if(userInput.trim()!=''){
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=87f9eb7a1a7a1cb851de100d0d5d0afd`;
        
        fetch(api)
            .then(response=>response.json())
            .then(weatherData=>{
                displayCurrentWeather(weatherData)
                //console.log(weatherData)
            })
            .catch((error)=>{
                //document.body.innerHTML = `<h1> Innvalid name for City or Town...refreshing in 3 seconds</h1>`;
                alert("Invalid name for City or Town. Please enter the a valid name")
                // setTimeout(function() {
                    
                //     location.reload('true')
                //   }, 3000)
                  
                
            })
    }
})