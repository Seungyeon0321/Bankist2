'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav__links = document.querySelector('.nav__links');
const nav__link = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const features__img = document.querySelectorAll('.features__img');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for(let i = 0; i < btnCloseModal.length; i++) {
btnsOpenModal.forEach((v, i) =>
  v.addEventListener('click', e => {
    openModal();
  })
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  e.key === 'Escape' && !modal.classList.contains('.hidden')
    ? closeModal()
    : '';
});

// Smooth하게 내려가기 (이거 event delegation으로 한 번 해보기)
nav__links.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //matching이란 의미는 그 target은 딱 정하는 거, if we do not have this matching, this handler will fire when we click its' parents element
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//샘은 target을 이용해서 해결, 그리고 Matching strategy라는 것을 이용,
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();

//   // Matching strategy => what is matching strategy?
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

//sticky nav bar

// Using 'scroll' event

// window.addEventListener('scroll', function () {
//   const boundingClientRect = section1.getBoundingClientRect();
//   // console.log(boundingClientRect);
//   // console.log(window.scrollY);
//   if (window.scrollY > boundingClientRect.top) console.log('Succeed');
// });

// Using 'IntersectionObserver API'

const navHeight = nav.getBoundingClientRect();

const callback = function (e, o) {
  e.forEach(e => {
    !e.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky'); //분명히 option에 맞는 조건에 들어왔는데 왜 isIntersecting value는 false인가? 조건이 맞았을 때 event가 동작하는 거고 실제로 intersecting만 봤을 때는 더이상 intersecting하고 있지 않기 때문에 이는 false이다
  });
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
};

const observer = new IntersectionObserver(callback, option);

observer.observe(header); //header가 viewport에서 10 거의 없어질 때 딱 nav height정도가 됐을 때 nav가 sticky position을 얻도록 함.

//opacity clearing
sections.forEach(v => v.classList.add('section--hidden'));

const clearOpacity = function (e, o) {
  e.forEach(e => {
    e.isIntersecting ? section1.classList.remove('section--hidden') : '';
    e.isIntersecting
      ? features__img.forEach(v => v.classList.remove('lazy-img'))
      : '';
  });
};

const observerForOpacity = new IntersectionObserver(clearOpacity, {
  root: null,
  threshold: 0.4,
});

observerForOpacity.observe(section1);

///////////////////2///////////////////

const clearOpacity2 = function (e, o) {
  e.forEach(e => {
    e.isIntersecting ? section2.classList.remove('section--hidden') : '';
  });
};

const observerForOpacity2 = new IntersectionObserver(clearOpacity2, {
  root: null,
  threshold: 0.4,
});

observerForOpacity2.observe(section2);

///////////////////3//////////////////

const clearOpacity3 = function (e, o) {
  e.forEach(e => {
    e.isIntersecting ? section3.classList.remove('section--hidden') : '';
  });
};

const observerForOpacity3 = new IntersectionObserver(clearOpacity3, {
  root: null,
  threshold: 0.4,
});

observerForOpacity3.observe(section3);

//I don't know how it can be seperated

//Do I have to make several observe to make the image clear?

// const observer = new IntersectionObserver(callback, option);
// // 1. 새로운 객체를 만들어야 함

// observer.observe(section1);

//위와 같이 코딩을 하면 그냥 callback이 반환 됨, 왠지 잘 모르겠음

//keydown을 하려고 할때 어디에서 keydown이 되야 하는가? 커서 가는 부분이 보통 overlay하고 modal이기 때문에 이 곳에서 keydown이 일어나면 될 거 같음  두군데다가 햇는데 안됨

//클릭했을 때 어떻게 스크롤해서 내려갈까

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

//h1의 parent element중에 header을 가지고 있는 녀석을 targeting 한다
