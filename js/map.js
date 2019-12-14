'use strict';

const mapEl = document.querySelector('.map');

function initMap() {
 const location = {
  lat:  -15.550027,
  lng: -55.164853
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