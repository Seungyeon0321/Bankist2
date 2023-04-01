'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// for(let i = 0; i < btnCloseModal.length; i++) {
  
  btnsOpenModal.forEach((v, i) => v.addEventListener('click', (e) => {
    openModal();
    }
  )
)

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    e.key === "Escape" && !modal.classList.contains('.hidden') ? closeModal() : '';
  })

  //keydown을 하려고 할때 어디에서 keydown이 되야 하는가? 커서 가는 부분이 보통 overlay하고 modal이기 때문에 이 곳에서 keydown이 일어나면 될 거 같음  두군데다가 햇는데 안됨

  