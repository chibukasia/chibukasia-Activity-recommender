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

    //conditions for displaying activities

    // switch(tempInDegree){
    //     case 21:
    //         fetchSunnyActivities();
    //     case 12:
    //         fetchRainyActivities()
            
    // }
    if (tempInDegree > 25){
        fetchRainyActivities()
    }else{
        fetchSunnyActivities()
    }
    
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


function fetchRainyActivities(){
    fetch("http://localhost:3000/activities")
        .then(res=>res.json())
        .then(fetchedData=>{
            displayRainyActivities(fetchedData)
            // displaySunnyActivities(fetchedData)
            // displaySnowyActivities(fetchedData)
            //console.log(fetchedData)
        })
}

function fetchSunnyActivities(){
    fetch("http://localhost:3000/activities")
        .then(res=>res.json())
        .then(fetchedData=>{
            //displayRainyActivities(fetchedData)
            displaySunnyActivities(fetchedData)
            //displaySnowyActivities(fetchedData)
            //console.log(fetchedData)
        })
}

function fetchSnowyActivities(){
    fetch("http://localhost:3000/activities")
        .then(res=>res.json())
        .then(fetchedData=>{
            // displayRainyActivities(fetchedData)
            // displaySunnyActivities(fetchedData)
            displaySnowyActivities(fetchedData)
            //console.log(fetchedData)
        })
}
//grab the section to display the activtiy cards
const cardSection = document.getElementById('card-section');

//displays the rainy activities
function displayRainyActivities(fetchedData){
    const rainyActivities = fetchedData.rainyActivities;

    rainyActivities.forEach(rainyActivity => {
        let activityName = rainyActivity.name;
        let imageUrl = rainyActivity.image;
        //creates a div element to display the data
        let cardItem = document.createElement('div')
        //cardItem.setAttribute('class', 'card')
        cardItem.innerHTML= `<div class="card">
        <img id="acivity-image" src="${imageUrl}" alt=""/>
        <div class="activity-description">${activityName}</div>
        <button class="btn">Remove</button>
        </div>`
        cardSection.appendChild(cardItem)
    });
    
}

//displays the snow activities
function displaySnowyActivities(fetchedData){
    const snowActivities = fetchedData.snowActivities;

    snowActivities.forEach(snowActivity=>{
        let activityName = snowActivity.name;
        let imageUrl = snowActivity.image;
        //creates a div element to display the information
        let cardItem = document.createElement('div');
        cardItem.innerHTML= `<div class="card">
        <img id="acivity-image" src="${imageUrl}" alt=""/>
        <div class="activity-description">${activityName}</div>
        <button class="btn">Remove</button>
        </div>`
        cardSection.appendChild(cardItem)

    })
    
}

//display the sunny activities
function displaySunnyActivities(fetchedData){
    const sunnyActivities = fetchedData.sunnyActivities;

    sunnyActivities.forEach(sunnyActivity=>{
        let activityName = sunnyActivity.name;
        let imageUrl = sunnyActivity.image;
        //creates a div element to display the information
        let cardItem = document.createElement('div');
        cardItem.innerHTML= `<div class="card">
        <img id="acivity-image" src="${imageUrl}" alt=""/>
        <div class="activity-description">${activityName}</div>
        <button class="btn">Remove</button>
        </div>`
        cardSection.appendChild(cardItem)
    })
    
}