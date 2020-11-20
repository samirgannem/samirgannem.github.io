'use strict';

const DOMElements = {
 'whatsAppButton': document.querySelector('.whatsapp-button'),
 'heroContainer': document.querySelector('.hero-container'),
 'contactSection': document.querySelector('.contact'),
 'navbar': document.querySelector('.navbar'),
 'serviceDescription': Array.from(document.querySelectorAll('.service-description')),
 'navbarBrandTitle': document.querySelector('.navbar-brand-title'),
 'navbarBrandImage': document.querySelector('.navbar-brand-image'),
 'container': document.querySelector('.container'),
 'progressBar': document.querySelector('.progress-bar')

}

//
// handlers
//
// click event handler
window.addEventListener('click', e => {
 const eventTarget = e.target;

 if(eventTarget.matches('.whatsapp-button')) {
  redirectWhatsapp(DOMElements);
 }
 if(eventTarget.matches('.nav-contact') || eventTarget.matches('.navbar-link-button')) {
  scrollToContact(DOMElements);
 }
 if(eventTarget.matches('.go-top') || eventTarget.matches('footer') || eventTarget.matches('.nav-home') || eventTarget.matches('.fa-chevron-up') || eventTarget.matches('.navbar-brand-image') || eventTarget.matches('.navbar-brand-title')) {
  scrollToTop(DOMElements);
 }
});
// scroll event handler
window.addEventListener('scroll', e => {
 wAppAndNavStyling(DOMElements);
 handleProgressBar(DOMElements);
});

// resize event handler
window.addEventListener('resize', e => {
 if(window.innerHeight > 820) {
  fixServicesHeight(DOMElements);
 }
})
//
// functions
//
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
function scrollToTop(DOMElements) {
 const { heroContainer } = DOMElements;
 heroContainer.scrollIntoView({
  behavior: 'smooth'
 })
}

function wAppAndNavStyling(DOMElements) {
 const { whatsAppButton, heroContainer, navbar, navbarBrandTitle, navbarBrandImage } = DOMElements;
 const triggerHeight = heroContainer.offsetHeight - navbarBrandImage.offsetHeight;
 
 if (window.pageYOffset >= triggerHeight) {
  whatsAppButton.style.transform = 'translateX(0)';
  navbar.style.background = 'var(--translucent)';
  navbarBrandTitle.style.opacity = 1;
 } else {
  whatsAppButton.style.transform = 'translateX(120%)';
  navbar.style.background = 'var(--transparent)';
  navbarBrandTitle.style.opacity = 0;
 }
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

function handleProgressBar(DOMElements) {
  const { container, progressBar } = DOMElements;
  const containerHeight = container.clientHeight - window.innerHeight;
  const offset = window.scrollY;

  progressBar.style.width = `${(offset / containerHeight) * 100}%`
}