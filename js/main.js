'use strict';

window.addEventListener('DOMContentLoaded', () => {
 const DOMElements = {
  'whatsAppButton': document.querySelector('.whatsapp-button'),
  'heroContainer': document.querySelector('.hero-container'),
  'contactSection': document.querySelector('.contact'),
  'navbar': document.querySelector('.navbar'),
  'serviceDescription': Array.from(document.querySelectorAll('.service-description'))
 }
 // Click Event Handler
 window.addEventListener('click', e => {
  const eventTarget = e.target;

  if(eventTarget.matches('.whatsapp-button')) {
   redirectWhatsapp(DOMElements);
  }
  if(eventTarget.matches('.nav-contact') || eventTarget.matches('.navbar-link-button')) {
   scrollToContact(DOMElements);
  }
  if(eventTarget.matches('.go-top') || eventTarget.matches('footer') || eventTarget.matches('.nav-home') || eventTarget.matches('.fa-home')) {
   scrollToTop(DOMElements);
  }
 });
 // Scroll Event Handler
 window.addEventListener('scroll', e => {
  wAppAndNavStyling(DOMElements);
 });

 // Resize Event Handler
 window.addEventListener('resize', e => {
  if(window.innerHeight > 820) {
   fixServicesHeight(DOMElements);
  }
 })
});

function redirectWhatsapp() {
 const num = 556699331539;
 const url = 'https://api.whatsapp.com/send?phone=';
 window.open(url + num, '__blank');
}

function scrollToContact(DOMElements) {
 const { contactSection } = DOMElements;
 contactSection.scrollIntoView({
  behavior: 'smooth'
 });
}

function wAppAndNavStyling(DOMElements) {
 const { whatsAppButton, heroContainer, navbar } = DOMElements;
 const triggerHeight = heroContainer.offsetHeight;

 if (window.pageYOffset > triggerHeight) {
  whatsAppButton.style.transform = 'translateX(0)';
  navbar.style.background = 'var(--translucent)';
 } else {
  whatsAppButton.style.transform = 'translateX(120%)';
  navbar.style.background = 'var(--transparent)';
 }
}
function scrollToTop(DOMElements) {
 const { heroContainer } = DOMElements;
 heroContainer.scrollIntoView({
  behavior: 'smooth'
 })
}
function fixServicesHeight(DOMElements) {
 const { serviceDescription } = DOMElements;
 const heights = serviceDescription.map(container => container.offsetHeight);
 const maxHeight = heights.sort( (a, b) => b-a)[0];

 serviceDescription.forEach(container => {
  if(container.offsetHeight < maxHeight) {
   container.style.height = maxHeight + 'px';
  }
 });

}