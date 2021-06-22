const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherData(location) {
    const resp = await fetch(url(location), {origin: "cors"});

    const respData = await resp.json();

    // console.log(respData);

    showWeatherToPage(respData);
}


function showWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add("weather");

    main.innerHTML = '';

    weather.innerHTML = `
    <h2>

        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />

        ${temp}°C  
    </h2>
    <p>${data.weather[0].main}</p>
    `;

    main.innerHTML = '';

    main.appendChild(weather);
}

function KtoC(tempK) {
    return Math.floor(tempK - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    if(location) {
        getWeatherData(location);
    }
});