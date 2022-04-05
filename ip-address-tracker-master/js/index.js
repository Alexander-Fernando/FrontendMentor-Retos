/*  DOOM ELEMENTS */
const ip = document.querySelector('.ip');
const locationhTML = document.querySelector('.location');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');
const inputIp = document.querySelector('.hero__input');
const buttonSearch = document.querySelector('.hero__cta');

/*  CONSTANTES */
const apiKey = 'at_xQuAJJWbc7mMWTlrW5Fl6p16e0qfa';

const map = L.map('map').setView([51.505, -0.09], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

let marker = L.marker([40.7277831, -74.0080852]).addTo(map);

/*  getApi function */
const getApi = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    console.log('Latitud: ', latitude, ' Longitud: ', longitude);
  });
};

getApi();

/*API KEY: at_xQuAJJWbc7mMWTlrW5Fl6p16e0qfa */
