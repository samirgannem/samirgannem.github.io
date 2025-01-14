'use strict';

const mapEl = document.querySelector('.map');

function initMap() {
 const location = {
  lat:  -15.5482238,
  lng: -55.1600832
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