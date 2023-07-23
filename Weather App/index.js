const apiKey = "595cfa94aad083309824df84d08adaa7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const locationBtn = document.querySelector(".locate button")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    // make the invalid message appear and weather dissapear
    if (response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else {

    var data = await response.json();

    // update values to the appropriate data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    // change image based upon data from the weather API
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }

    // remove invalid message and display weather
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"
}
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})

// https://ipinfo.io/json?token=72f6b944c71f6a


// call a location api that retrieves a users location from their browser
// use the data.city to provide a city to checkWeather
async function getCity() {
    let url = 'https://ipinfo.io/json?token=72f6b944c71f6a';
    let response = await fetch(url);
    let data = await response.json();
    
    checkWeather(data.city)
}

locationBtn.addEventListener("click", ()=>{
    getCity()
})