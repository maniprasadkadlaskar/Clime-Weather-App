let root = document.getElementById('root');
let search = document.getElementById('city-search');
let searchBtn = document.getElementById('search-btn');

let apiKey = config.API_KEY;

function frontPage() {
    root.innerHTML = `<h1 style="color:white">Welcome To Clime<br>
    Clime - Weather Web App built using HTML ,CSS ,Javascript and Bootstrap. <br>
    We used OpenWeatherMap API to fetch the weather data.</h1><br>
    <button type="button" class="btn btn-primary" id="get-started">Get Location</button>`;

    let getStart = document.getElementById('get-started');

    getStart.addEventListener('click',dataFetch);

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
            fetch(url)
            .then(res => res.json())
            .then(data => displayData(data));
        });
    } else 
        console.log("Could not find current position");
}



function dataFetch() {

    if(search.value === "" || search.value === undefined) {
        getLocation();
    } else {
        let cityName = search.value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data));
    }
}

function displayData(data) {

    if(data.cod == 404) {
        root.innerHTML = `<h1 style="color:white">&#128531 <br>
        Oop's NOT Found</h1>`;
        return;
    }

    let wCity = data.name;
    let wIconId = data.weather[0].icon;
    let wTemp = Math.ceil(data.main.temp - 273.15);
    let wFeelsLike = Math.ceil(data.main.feels_like - 273.15);
    let wSpeed = Math.ceil(data.wind.speed * 1.609);
    let wFullDescrip = data.weather[0].description;
    let wDescription = data.weather[0].main;
    let wHumidity = data.main.humidity;
    let wPressure = data.main.pressure;
    let wVisibility = data.visibility / 1000;

    let highLight = document.createElement('div');
    highLight.className = "container highlight";
    highLight.innerHTML = `<p class="celcius">${wTemp}<sup class="degree"><sup>o</sup>C</sup></p>
<img class="weatherimage" src="http://openweathermap.org/img/wn/${wIconId}@2x.png">
<div class="container top-content">
  <p class="description">${wDescription}</p>
  <p class="place">${wCity}</p>
</div>`;

    let detailGrid = document.createElement('div');
    detailGrid.className = "container row block-content";

    let description = document.createElement('div');
    description.className = "container col block";
    description.innerHTML = `<p class="title">${wFullDescrip}</p>`;

    let feelsLike = document.createElement('div');
    feelsLike.className = "container col block";
    feelsLike.innerHTML = `<p class="title">Feels like</p>
<p class="content">${wFeelsLike}<sup>&degc</sup></p>`;

    let humidity = document.createElement('div');
    humidity.className = "container col block";
    humidity.innerHTML = `<p class="title">Humidity</p>
<p class="content">${wHumidity}%</p>`;

    let pressure = document.createElement('div');
    pressure.className = "container col block";
    pressure.innerHTML = `<p class="title">Pressure</p>
<p class="content">${wPressure}<span> mBar</span></p>`;

    let visibility = document.createElement('div');
    visibility.className = "container col block";
    visibility.innerHTML = `<p class="title">visibility</p>
<p class="content">${wVisibility} km</p>`;

let windSpeed = document.createElement('div');
    windSpeed.className = "container col block";
    windSpeed.innerHTML = `<p class="title">Wind speed</p>
<p class="content">${wSpeed} km/h</p>`;

    detailGrid.appendChild(feelsLike);
    detailGrid.appendChild(description);
    detailGrid.appendChild(humidity);
    detailGrid.appendChild(pressure);
    detailGrid.appendChild(windSpeed);
    detailGrid.appendChild(visibility);
    root.innerHTML = null;
    root.appendChild(highLight);
    root.appendChild(detailGrid);
}

frontPage();

searchBtn.addEventListener('click',searchCity);

function searchCity() {
    root.innerHTML = `<h1 style="color:white">Fetching data......</h1>`;
    dataFetch();
}
