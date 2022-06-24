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
            let newData = new Set(fetchedData)
            displaySunnyActivities(newData)
            
        })
}

function fetchSnowyActivities(){
    fetch("http://localhost:3000/snowActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            let newData = new Set(fetchedData)
            displaySnowyActivities(newData)
        })
}

function fetchSnowyAndRainyNightActivities(){
    fetch("http://localhost:3000/rainyAndSnowNightActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            let newData = new Set(fetchedData)
            displaySnowyAndRainyNightActivitie(newData)
        })
}

function fetchNormalNightActivities(){
    fetch("http://localhost:3000/normalNightActivities")
        .then(res=>res.json())
        .then(fetchedData=>{
            let newData = new Set(fetchedData)
            displayNormalNightActivities(newData)
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

function patchSnowyAndRainyNightActivities(activityObject){
    fetch(`http://localhost:3000/rainyAndSnowNightActivities/${activityObject.id}`,{
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

function patchNormalNightActivities(activityObject){
    fetch(`http://localhost:3000/normalNightActivities/${activityObject.id}`,{
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

const cardSection = document.getElementById('card-section');
function displayCurrentWeather(weatherData){
    const countryAndCity = document.getElementById('city-country');
    const currentIcon = document.querySelector('#currentIcon');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('wind-speed');
    

    //units conversion from default givenfrom the API;
    const tempInDegree = Math.round(weatherData.main.temp -  273.15, 2);
    const speedInKnots = Math.floor(weatherData.wind.speed * 1.944)

    let iconId = weatherData.weather[0].icon
    console.log(typeof iconId)

    //insert contents into the tags
    countryAndCity.textContent = `City/ Town: ${weatherData.name} ${weatherData.sys.country}`;
    currentIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    weatherDescription.innerHTML = `${weatherData.weather[0].main} <br>${weatherData.weather[0].description}`;
    temperature.textContent = `${tempInDegree}°C`;
    windSpeed.textContent = `${speedInKnots} Knots`;

    //Display acitivities based on the weather conditions
    
    if(iconId==="01n" || iconId==="02n" || iconId==="03n" ){
        cardSection.innerHTML=``
        fetchNormalNightActivities()
    }else if(iconId==="04n" || iconId==="09n" || iconId==="10n" || iconId==="11n" || iconId==="13n" || iconId==="50n"){
        cardSection.innerHTML=``
        fetchSnowyAndRainyNightActivities();
    }else{
        if (weatherData.weather[0].main==="Clear" || weatherData.weather[0].description==="scattered clouds"|| weatherData.weather[0].description==="few clouds"){
            cardSection.innerHTML=``
            fetchSunnyActivities()
        }else if(weatherData.weather[0].main==="Clouds" &&(weatherData.weather[0].description !="scattered clouds"|| weatherData.weather[0].description !="few clouds")){
            cardSection.innerHTML=``
            fetchRainyActivities()
        }else if(weatherData.weather[0].main==="Rain" || weatherData.weather[0].main==="Drizzle" || weatherData.weather[0].main==="Thunderstorm"){
            cardSection.innerHTML=``
            fetchRainyActivities()
        }else if(weatherData.weather[0].main==="Snow" ){
            cardSection.innerHTML=``
            fetchSnowyActivities()
        }else if(weatherData.weather[0].main==="Clear"){
            cardSection.innerHTML=``
            fetchSunnyActivities()
        }
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

        //cardSection.appendChild(cardItem)
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

//display snowy and rainy night activities
function displaySnowyAndRainyNightActivitie(snowyAndRainyActivities){
    snowyAndRainyActivities.forEach(activity=>{
        let likes = activity.likes;
        let activityName = activity.name;
        let imageUrl = activity.image;
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

        deleteBtn.addEventListener('click', e=>{
            if (confirm('Are you sure you want to delete?')){
                cardItem.remove()
            }
        });
        let likesCount = cardItem.querySelector("#likes");
        likeBtn.addEventListener('click', e=>{
            likes += 1;
            likesCount.textContent = `${likes} Favorites`
            activity.likes = likes;
            patchSnowyAndRainyNightActivities(activity)
        })

    })
}

//display normal night activiies
function displayNormalNightActivities(nightActivities){
    nightActivities.forEach(activity=>{
        let likes = activity.likes;
        let activityName = activity.name;
        let imageUrl = activity.image;
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

        deleteBtn.addEventListener('click', e=>{
            if (confirm('Are you sure you want to delete?')){
                cardItem.remove()
            }
        });
        let likesCount = cardItem.querySelector("#likes");
        likeBtn.addEventListener('click', e=>{
            likes += 1;
            likesCount.textContent = `${likes} Favorites`
            activity.likes = likes;
            patchNormalNightActivities(activity)
        })

    })
}


