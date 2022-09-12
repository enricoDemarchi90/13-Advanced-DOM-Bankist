'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Page Navigation

// Button Scrooling
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation and event delegation

//1. Add event listener to commmon parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

///////////////////////////////////////
//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return; // a modern way to prevent errors if clicks occur in places we don't want to register them

  // Removing classes first: a common tecnique is to first remove the class in all elements then add just to the selected element.

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
//Menu Fade

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; //select the element we are clickinthag
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//Sticy navigation
// const section1 = document.querySelector('#section--1');
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   //  console.log(window.scrollY); //get the current scroll position in viewport units
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Sticky navigation with Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Reveal on Scroll

const allSections = document.querySelectorAll('.section'); // selects all sections

const revealSection = function (entries, observer) {
  console.log(`Entradas =` + entries);
  const [entry] = entries; // array destructuring getting the first element inn the entries array
  if (!entry.isIntersecting) return; //  guard clause to return if the section is not intersecting

  entry.target.classList.remove('section--hidden'); // removes the sectio--hidden
  observer.unobserve(entry.target); // after the first execution, the observers stops to observe that element (entry.target)
};

const sectionObserver = new IntersectionObserver(revealSection, {
  //creates the observer to the callback function
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  //ads the observer to the nodelist
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
//Lazy Loading Images

// select all needed images
const imgTargets = document.querySelectorAll('img[data-src]');

// callback to load the high-res images
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //when the image is completely load, remove the blur effect
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

//New observer to apply the callback at 200px before the user sees the images
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//Slider Component

const slides = document.querySelectorAll('.slide');

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})`));

/////////////////
//////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Lectures

// // console.log(document.documentElement); // selects the whole DOM, you can use it to apply CSS to everything.
// // console.log(document.documentHead); // selects the page's Head portion
// // console.log(document.documentHead); // selects the page's Body portion

// const header = document.querySelector('.header'); // selects the first header element;
// // console.log(header);
// const allSections = document.querySelectorAll('.section'); // Selects all class = sections of the page

// document.getElementsByTagName('button'); // selects all button elements. The output is a live collection of HTML elements that is updated in real time, so you can use to sistematically remove elements of the page.

// document.getElementsByClassName('btn'); // selects all btn class elements, also returns a live collection.

// /////////////////////
// //Creating elements

// // insertAdjacentHTML(position, text); // positions: "beforebegin", "afterbegin", "afterend". text: The string to be parsed as HTML or XML and inserted into the tree.

// const message = document.createElement('div'); // creates a div element, but it's not in the DOM for now

// message.classList.add('cookie-message'); // add a CSS class to message variable

// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; //adds to the HTML of the message element
// //header.preprend(message); // add the element to the DOM, at the begining of the parent element
// header.append(message); // add the element to the DOM, at the end of the parent element. The element can only exist at one place at time.
// console.log(header);

// //header.append(message.cloneNode(true)); //copies the element previously prepended.

// //header.before(message); //Inserts before the header element
// //header.after(message); //Inserts after the header element

// /////////////////////
// //Delete elements

// // document
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   }); // .remove() is a new method

// //message.parentElement.removeChild(message); // old way to remove an element, using DOM traversing

// ///////////////////////////////////////
// // Styles, Attributes and Classes

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color); // .style can only select properties manually set, not those on css sheets.
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// //gets the numeric value from height in px and adds 30 to it.

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard
// console.log(logo.designer); // can only set attributes that make sense for that type of element.
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // absolute path
// console.log(logo.getAttribute('src')); //relative path

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes

// // Don't use
// logo.clasName = 'jonas';

///////////////////////////////////////
// Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // removes the event listener after a timeout.

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

///////////////////////////////////////
// DOM Traversing

// const h1 = document.querySelector('h1');

// //Going downwards: child
// console.log(h1.querySelector('.highlight'));
// console.log(h1.childNodes); //gives every single node that existis whithin that element
// console.log(h1.children); //gives a HTML collection with only the children elements
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'black';

// //Going Upwards: parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //used all the time for event delegation
// h1.closest('h1').style.background = 'var(--gradient-primary)'; //if pointed to the same type, it will find the element itself

// //Going sideways: sibllings

// //In JS, we can ony select the previous and next siblings of an element.
// console.log(h1.previousElementSibling); //returns previous element
// console.log(h1.nextElementSibling); // returns next element

// console.log(h1.previousSibling); //returns previous node
// console.log(h1.nextSibling); // returns next node

// //If you need all the siblings, not only the previous and next one, you can use the trick to move to the parent elements and get all children from there.

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.9)';
// });

///////////////////////////////////////
//Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // element that the target is intersecting. Null will observe the target element interacting with the entire viewport
//   threshold: [0, 0.2], // Percentage of intersection on wich the callback function will be called.
//   // Zero percent means that the callback will be triggered as soon it enters or leaves the viewport.
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
