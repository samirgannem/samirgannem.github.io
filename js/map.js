'use strict';

const mapEl = document.querySelector('.map');

function initMap() {
 const location = {
  lat: -27.1285600,
  lng: -49.0071989
 };
 const map = new google.maps.Map(mapEl, {
  zoom: 16,
  center: location
 });
 const marker = new google.maps.Marker({
  position: location,
  map: map,
 });
}