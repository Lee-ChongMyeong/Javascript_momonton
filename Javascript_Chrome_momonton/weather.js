const weather = document.querySelector(".js-weather");
const API_KEY = "0ccc258014bb4fd5ce925996a7e0ae61";
const COORDS = 'coords';

function getWeather(lat, lng) {
fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=matric`)
.then(function (response) {
return response.json();
})
.then(function (json) {
const temperature = json.main.temp;
const place = json.name;
weather.innerText = `${temperature} @ ${place}`;
})
}


function saveCoords(coordsObj) {
localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const coordsObj = {
latitude,
longitude
};

saveCoords(coordsObj);
getWeather(latitude, longitude);

}

function handleGeoError() {
console.log('Cant acess geo location');
}

function askForCoords() {
navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
const loadedCoords = localStorage.getItem(COORDS);
if (loadedCoords === null) {
askForCoords();
} else {
const parseCoords = JSON.parse(loadedCoords);
getWeather(parseCoords.latitude, parseCoords.longitude);

}
}

function init() {
loadCoords();
}

init();