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
            displayCurrentWeather(currentWeatherData);
            
        })
    })
    
}
//get requests
function fetchRainyActivities(){
    fetch("http://localhost:3000/rainyActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            displayRainyActivities(fetchedData)
        })
}

function fetchSunnyActivities(){
    fetch("http://localhost:3000/sunnyActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            displaySunnyActivities(fetchedData)
        })
}

function fetchSnowyActivities(){
    fetch("http://localhost:3000/snowActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            displaySnowyActivities(fetchedData)
        })
}

//perform a pacth request
function patchRainyActivities(activityObject){
    fetch(`http://localhost:3000/rainyActivities/${activityObject.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(activityObject)
    })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
}

function patchSunnyActivities(activityObject){
    fetch(`http://localhost:3000/sunnyActivities/${activityObject.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(activityObject)
    })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
}

function patchSnowyActivities(activityObject){
    fetch(`http://localhost:3000/snowActivities/${activityObject.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(activityObject)
    })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
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

    
    if (tempInDegree < 25 && tempInDegree > 10){
        fetchRainyActivities()

    }else if(tempInDegree < 10){
        fetchSnowyActivities()
    }else if(tempInDegree > 25){
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
            })
            .catch(()=>{
                alert("Invalid name for City or Town. Please enter the a valid name")  
            })
    }
})



//grab the section to display the activtiy cards
const cardSection = document.getElementById('card-section');
//const actionList = document.querySelector('#action-list');

//displays the rainy activities
function displayRainyActivities(rainyActivities){
    rainyActivities.forEach(rainyActivity => {
        let activityName = rainyActivity.name;
        let imageUrl = rainyActivity.image;
        let likes = rainyActivity.likes;
        //creates a div element to display the data
        let cardItem = document.createElement('div')
        //cardItem.setAttribute('class', 'card')
        cardItem.innerHTML= `<div class="card">
                            <img id="acivity-image" src="${imageUrl}" alt=""/>
                            <div class="activity-description">${activityName}</div>
                            <p id="likes">${likes} Favorites</p>
                            <button class="btn" id="remove">Remove</button>
                            <button class="btn" id='like-btn' >Like ❤️</button>
                            </div>`

        //grab the delete and like buttons 
        let deleteBtn = cardItem.querySelector("#remove");
        let likeBtn = cardItem.querySelector("#like-btn");
        //append card to the html div node
        cardSection.appendChild(cardItem)
        //add event listener to delete and like button
        deleteBtn.addEventListener('click', e=>{
            if (confirm('Are you sure you want to delete?')){
                cardItem.remove()
            }
            
        });
        let likesCount = cardItem.querySelector("#likes");
        likeBtn.addEventListener('click', e=>{
            likes += 1;
            likesCount.textContent = `${likes} Favorites`
            rainyActivity.likes = likes;
            patchRainyActivities(rainyActivity)
        })

    });
    
}

//displays the snow activities
function displaySnowyActivities(snowActivities){

    snowActivities.forEach(snowActivity=>{
        let activityName = snowActivity.name;
        let imageUrl = snowActivity.image;
        let likes = snowActivity.likes;
        //creates a div element to display the information
        let cardItem = document.createElement('div');
        cardItem.innerHTML= `<div class="card">
                            <img id="acivity-image" src="${imageUrl}" alt=""/>
                            <div class="activity-description">${activityName}</div>
                            <p id="likes">${likes} Favorites</p>
                            <button class="btn" id="remove">Remove</button>
                            <button class="btn" id='like-btn' >Like ❤️</button>
                            </div>`
        //grab the delete and like buttons 
        let deleteBtn = cardItem.querySelector("#remove");
        let likeBtn = cardItem.querySelector("#like-btn");
        cardSection.appendChild(cardItem)

        cardSection.appendChild(cardItem)
        deleteBtn.addEventListener('click', e=>{
            if (confirm('Are you sure you want to delete?')){
                cardItem.remove()
            }
        });
        let likesCount = cardItem.querySelector("#likes");
        likeBtn.addEventListener('click', e=>{
            likes += 1;
            likesCount.textContent = `${likes} Favorites`
            snowActivity.likes = likes;
            patchSnowyActivities(snowActivity)
        })

    })
    
}

//display the sunny activities
function displaySunnyActivities(sunnyActivities){

    sunnyActivities.forEach(sunnyActivity=>{
        let likes = sunnyActivity.likes;
        let activityName = sunnyActivity.name;
        let imageUrl = sunnyActivity.image;
        //creates a div element to display the information
        let cardItem = document.createElement('div');
        cardItem.innerHTML= `<div class="card">
                            <img id="acivity-image" src="${imageUrl}" alt=""/>
                            <div class="activity-description">${activityName}</div>
                            <p id="likes">${likes} Favorites</p>
                            <button class="btn" id="remove">Remove</button>
                            <button class="btn" id='like-btn' >Like ❤️</button>
                            </div>`
        //grab the delete and like buttons 
        let deleteBtn = cardItem.querySelector("#remove");
        let likeBtn = cardItem.querySelector("#like-btn");
        cardSection.appendChild(cardItem)

        cardSection.appendChild(cardItem)
        deleteBtn.addEventListener('click', e=>{
            if (confirm('Are you sure you want to delete?')){
                cardItem.remove()
            }
        });
        let likesCount = cardItem.querySelector("#likes");
        likeBtn.addEventListener('click', e=>{
            likes += 1;
            likesCount.textContent = `${likes} Favorites`
            sunnyActivity.likes = likes;
            patchSunnyActivities(sunnyActivity)
        })
    })
    
}


