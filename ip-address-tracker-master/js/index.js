/*  IMPORTAR DOM ELEMENTS */
import * as UI from './DoomElements.js';
/*  IMPORTAR CREDENCIALES */
import { cors, apikey, headers } from './credentials.js';

/* MapLocation default */
const map = L.map('map', { zoomControl: false }).setView([51.505, -0.09], 8);

/* Display map */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  minZoom: 1,
  maxZoom: 16,
}).addTo(map);

// add  buttons controls of zoom
L.control.zoom({ position: 'bottomleft' }).addTo(map);

// add marker icon
const LeafIcon = L.Icon.extend({
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});
const iconMarker = new LeafIcon({
  iconUrl: '../images/icon-location.svg',
});
L.marker([51.505, -0.09], { icon: iconMarker }).addTo(map);

/*  setLocation function: map */
const setLocation = ([lat, lng]) => {
  map.setView([lat, lng], 15);
  L.marker([lat, lng], { icon: iconMarker }).addTo(map);
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
  const setIp = `${url}${'v1'}?apiKey=${apikey}&ipAddress=${ipValue}`;
  fetch(setIp, headers)
    .then((response) => response.json())
    .then(
      ({
        ip: ipvalue,
        isp: ispvalue,
        location: { country, region, city, timezone: timezonevalue, lat, lng },
      }) => {
        UI.ip.textContent = ipvalue;
        UI.locationhTML.textContent = `${country}, ${region}, ${city}`;
        UI.timezone.textContent = `${timezonevalue}`;
        UI.isp.textContent = ispvalue;
        setLocation([lat, lng]);
      }
    )
    .catch((err) => {
      Swal.fire('Error!', 'Ingrese una dirección Ip válida', 'error');
    });
};

/*  EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', DefaultValues);

UI.buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const ipSearch = UI.inputIp.value;
  if (ipSearch != '') {
    getDataIp(ipSearch);
    return;
  }
  Swal.fire('Error!', 'Ingrese una dirección IP', 'error');
});
