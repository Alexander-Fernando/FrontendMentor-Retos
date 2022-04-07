/*  DOOM ELEMENTS */
const ip = document.querySelector('.ip');
const locationhTML = document.querySelector('.location');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');
const inputIp = document.querySelector('.hero__input');
const buttonSearch = document.querySelector('.hero__cta');

/*  CONSTANTES */
const cors = 'https://cors-anywhere.herokuapp.com/';
const apiKey = 'at_xQuAJJWbc7mMWTlrW5Fl6p16e0qfa';

/* MaoLocation default */
const map = L.map('map', {zoomControl: false}).setView([51.505, -0.09], 8);

/* Display map */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  minZoom: 1,
  maxZoom: 16,
}).addTo(map);

L.control.zoom({ position: 'bottomleft' }).addTo(map);
/*  setLocation function: map */
const setLocation = ([lat, lng]) => {
  map.setView([lat, lng], 15);
  L.marker([lat, lng]).addTo(map);
};

const getIpDefault = async () => {
  const response = await fetch(`https://api.ipify.org?format=json`);
  return await response.json();
};

const DefaultValues = () => {
  getIpDefault().then(({ ip }) => {
    getDataIp(ip);
  });
};

/*  getDataIP function */
const getDataIp = (ipValue) => {
  const url = `https://geo.ipify.org/api/`;
  const setIp = `${cors}${url}${'v1'}?apiKey=${apiKey}&ipAddress=${ipValue}`;

  fetch(setIp, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then((response) => response.json())
    .then(
      ({
        ip: ipvalue,
        isp: ispvalue,
        location: { country, region, city, timezone: timezonevalue, lat, lng },
      }) => {
        ip.textContent = ipvalue;
        locationhTML.textContent = `${country}, ${region}, ${city}`;
        timezone.textContent = `${timezonevalue}`;
        isp.textContent = ispvalue;
        setLocation([lat, lng]);
      }
    )
    .catch((err) =>
      console.log('Ocurrió un error. Digite correctamente su ip: ', err)
    );
};

/*  EVENT LISTENERS */
// document.addEventListener('DOMContentLoaded', DefaultValues);

buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const ipSearch = inputIp.value;
  console.log('Dando click: ', ipSearch);
  if (ipSearch != '' && ipSearch != null) {
    getDataIp(ipSearch);
    ipSearch[0].value = '';
    return;
  }
  console.log('Ingrese una IP.');
});
