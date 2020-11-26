const DOMElements = {
  whatsAppButton: document.querySelector('.whatsapp-button'),
  heroContainer: document.querySelector('.hero-container'),
  contactSection: document.querySelector('.contact'),
  navbar: document.querySelector('.navbar'),
  serviceDescription: Array.from(document.querySelectorAll('.service-description')),
  navbarBrandTitle: document.querySelector('.navbar-brand-title'),
  navbarBrandImage: document.querySelector('.navbar-brand-image'),
  container: document.querySelector('.container'),
  progressBar: document.querySelector('.progress-bar'),
  heroHeader: document.querySelector('.hero-header'),
  contactForm: document.querySelector('.contact-form'),
};

const formElements = {
  inputName: document.querySelector('#input-name'),
  inputEmail: document.querySelector('#input-email'),
  inputMessage: document.querySelector('#input-message'),
}

//
// handlers
//
// form event handler
DOMElements.contactForm.addEventListener('submit', formSubmitHandler);
// click event handler
window.addEventListener('click', (e) => {
  const eventTarget = e.target;

  if (eventTarget.matches('.whatsapp-button')) {
    redirectWhatsapp(DOMElements);
  }
  if (eventTarget.matches('.nav-contact') || eventTarget.matches('.navbar-link-button')) {
    scrollToContact(DOMElements);
  }
  if (eventTarget.matches('.go-top') || eventTarget.matches('footer') || eventTarget.matches('.nav-home') || eventTarget.matches('.fa-chevron-up') || eventTarget.matches('.navbar-brand-image') || eventTarget.matches('.navbar-brand-title')) {
    scrollToTop(DOMElements);
  }
});
// scroll event handler
window.addEventListener('scroll', (e) => {
  wAppAndNavStyling(DOMElements);
  handleProgressBar(DOMElements);
});

// resize event handler
window.addEventListener('resize', (e) => {
  if (window.innerHeight > 820) {
    fixServicesHeight(DOMElements);
  }
});

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
    behavior: 'smooth',
  });
}
function scrollToTop(DOMElements) {
  const { heroContainer } = DOMElements;
  heroContainer.scrollIntoView({
    behavior: 'smooth',
  });
}

function wAppAndNavStyling(DOMElements) {
  const {
    whatsAppButton, heroContainer, navbar, navbarBrandTitle, heroHeader,
  } = DOMElements;
  const STATIC_TRIGGER_HEIGHT = 10;
  const triggerHeight = heroContainer.offsetHeight - heroHeader.offsetHeight;

  if (window.pageYOffset >= STATIC_TRIGGER_HEIGHT) {
    whatsAppButton.style.transform = 'translateX(0)';
    navbar.style.background = 'var(--translucent)';
    if (window.scrollY >= triggerHeight) {
      navbarBrandTitle.style.opacity = 1;
    } else {
      navbarBrandTitle.style.opacity = 0;
    }
  } else {
    whatsAppButton.style.transform = 'translateX(120%)';
    navbar.style.background = 'var(--transparent)';
  }
}
function fixServicesHeight(DOMElements) {
  const { serviceDescription } = DOMElements;
  const heights = serviceDescription.map((container) => container.offsetHeight);
  const maxHeight = heights.sort((a, b) => b - a)[0];

  serviceDescription.forEach((container) => {
    if (container.offsetHeight < maxHeight) {
      container.style.height = `${maxHeight}px`;
    }
  });
}

function handleProgressBar(DOMElements) {
  const { container, progressBar } = DOMElements;
  const containerHeight = container.clientHeight - window.innerHeight;
  const offset = window.scrollY;

  progressBar.style.width = `${(offset / containerHeight) * 100}%`;
}

async function formSubmitHandler(e) {
  e.preventDefault();  
  const { contactApiUrl } = config;

  const name = formElements.inputName.value;
  const email = formElements.inputEmail.value;
  const message = formElements.inputMessage.value;

  if(!name || !email || !message) return;

  try {
    await fetch(contactApiUrl, {
      method: 'POST',
      body: JSON.stringify({
        name, email, message
      })
    });
    formElements.inputName.value = ''
    formElements.inputEmail.value = ''
    formElements.inputMessage.value = ''
  } catch(err) {
    return err.message;
  }
}
