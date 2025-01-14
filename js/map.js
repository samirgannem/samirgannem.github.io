'use strict';

const mapEl = document.querySelector('.map');

function initMap() {
 const location = {
  lat:  -15.5481646,
  lng: -55.1586333
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