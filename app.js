require('dotenv').config();

const API_WEATHER = process.env.API_URL_WEATHER; //API End Point WEATHER
const API_FORECAST = process.env.API_URL_FORECAST; //API End Point FORECAST

const APP_ID = process.env.KEY;
const Q = 'Lima';
const ID = 3936456;

let data;

//By City Name
function getWeatherByCity() {
  fetch(`${API_WEATHER}id=${ID}&appid=${APP_ID}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.name);
      console.log(data);
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
}
// getWeatherByCity()

//By Coordinates
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(mostrarUbicacion);
}
function mostrarUbicacion(ubicacion) {
  const lat = ubicacion.coords.latitude;
  // const lat = '35.02';
  const lng = ubicacion.coords.longitude;
  // const lng = '139.01';
  getWeatherByCoordinates(lat, lng);
  // console.log(`longitud: ${ lng } | latitud: ${ lat }`);
}
function getWeatherByCoordinates(lat, lng) {
  fetch(`${API_WEATHER}lat=${lat}&lon=${lng}&appid=${APP_ID}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      //Ciudad
      const pais = data.sys.country;
      const ciudad = data.name;
      $ciudad.innerHTML = `${ciudad}, ${pais}`;
      //Temperatura
      const temperatura = data.main.temp - 273.15;
      $temperatura.innerHTML = `${temperatura}°`;
      const maxima = data.main.temp_max - 273.15;
      const minima = data.main.temp_min - 273.15;
      $maxima.innerHTML = `${maxima}°`;
      $minima.innerHTML = `${minima}°`;
      //Icono
      const icon =
        'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
      console.log(`Url icono: ${icon}`);
      $icono.setAttribute('src', icon);
      //Descripción del Clima
      const descripcion = data.weather[0].description;
      $descripcion.innerHTML = descripcion;
      //Velocidad del Viento
      const velocidad = data.wind.speed * 3.6; //En Km/H
      $velocidad.innerHTML = `${velocidad} Km/h`;
      //Dirección del Viento
      const direccion = data.wind.deg;
      $direccion.innerHTML = `${direccion}°`;
      //Humedad
      const humedad = data.main.humidity;
      $humedad.innerHTML = `${humedad}%`;
      //
      //Calculando SunRise
      const sunrise = data.sys.sunrise;
      let amanece = new Date(sunrise * 1000);
      console.log(
        `Amanece: ${amanece.getHours()}:${
          amanece.getMinutes() < 10 ? '0' : ''
        }${amanece.getMinutes()}`
      );
      //Calculando SunSet
      const sunset = data.sys.sunset;
      let anochece = new Date(sunset * 1000);
      console.log(
        `Anochece: ${anochece.getHours()}:${
          anochece.getMinutes() < 10 ? '0' : ''
        }${anochece.getMinutes()}`
      );

      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
}

// Selectores DOM
const $ciudad = document.querySelector('#ciudad');
const $temperatura = document.querySelector('#temperatura');
const $icono = document.querySelector('#icono-tiempo');
const $maxima = document.querySelector('#maxima');
const $minima = document.querySelector('#minima');
const $descripcion = document.querySelector('#descripcion');
const $humedad = document.querySelector('#humedad');
const $direccion = document.querySelector('#direccion-viento');
const $velocidad = document.querySelector('#velocidad-viento');
