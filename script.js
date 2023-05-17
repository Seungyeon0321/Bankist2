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
const features__img = document.querySelectorAll('.features__img');
const operationContainer = document.querySelector('.operations__tab-container');
const operationButtons = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');

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

//부모 tag를 선택해도 capture 때문에 아래로 내려가게 됨, 그렇기 때문에 nav__link도 클릭이 가능함

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

const clearOpacity = function (e, o) {
  const [entry] = e;

  entry.isIntersecting ? entry.target.classList.remove('section--hidden') : '';

  observer.unobserve(entry.target);
};

const observerForOpacity = new IntersectionObserver(clearOpacity, {
  root: null,
  threshold: 0.4,
});

sections.forEach(section => {
  observerForOpacity.observe(section);
  section.classList.add('section--hidden');
});

// load image

const lazyImgs = document.querySelectorAll('.features img');

const clearImg = function (e, o) {
  const [entry] = e;

  entry.isIntersecting ? (entry.target.src = entry.target.dataset.src) : '';

  entry.target.addEventListener('load', () => {
    entry.isIntersecting
      ? lazyImgs.forEach(img => img.classList.remove('lazy-img'))
      : '';
  });

  observer.unobserve(entry.target);
};

const observerForImage = new IntersectionObserver(clearImg, {
  root: null,
  threshold: 0,
  margin: '200px',
});

lazyImgs.forEach(img => {
  observerForImage.observe(img);
});

// section 2 => click 했을 때 해당 클릭한 부분만 활성화 되고 나머지는 활성화 되지 않게 하기

const targetData = operationButtons.forEach(v => {
  return v.getAttribute('data-tab');
});

operationContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //이렇게 하면 contains method로 안하고 클릭한 녀석을 모두 알 수 있다.

  // Guard clause
  if (!clicked) return; //이렇게 함으로써 이 클릭된 녀석이 아닌 다른 녀석이 클릭하면 무시할 수 있다.

  operationButtons.forEach(btn =>
    btn.classList.remove('operations__tab--active')
  );
  operationContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');

  const active = clicked.getAttribute('data-tab');

  operationContent.forEach(v => {
    v.classList.contains(`operations__content--${active}`)
      ? v.classList.add('operations__content--active')
      : '';
  });
});

//slide
const dots = document.querySelector('.dots');
const slides = document.querySelectorAll('.slide');
const slideRightBtn = document.querySelector('.slider__btn--right');
const slideLeftBtn = document.querySelector('.slider__btn--left');

let curSlide = 0;
const maxSlide = slides.length;

const slideHandler = function () {
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
  );
};

slideHandler();

const gotoSlide = curSlide => {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

const NextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
    console.log(curSlide);
  }
  gotoSlide(curSlide);
};

const PrevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
};

slideRightBtn.addEventListener('click', NextSlide);
slideLeftBtn.addEventListener('click', PrevSlide);

const createDots = function () {
  slides.forEach((_, i) =>
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};

createDots();

//처음 dot 나오게 하는 방법
const eachDots = dots.querySelectorAll('.dots__dot');
const firstDot = eachDots[0];
firstDot.classList.add('dots__dot--active');

//클릭했을 때 handler
dots.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
  }

  const clickedDots = e.target.closest('.dots__dot');

  if (!clickedDots) return;

  const activeDots = dots.querySelector('.dots__dot--active');
  activeDots ? activeDots.classList.remove('dots__dot--active') : '';

  clickedDots.classList.add('dots__dot--active');
});

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
