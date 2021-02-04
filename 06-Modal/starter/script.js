'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonList = document.querySelectorAll('.show-modal');
const close = document.querySelector('.close-modal');

const closeModal = function () {
  modal.style.display = 'none';
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.style.display = 'inline-block';
  overlay.classList.remove('hidden'); //better practice!
};

close.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

for (let i = 0; i < buttonList.length; i++) {
  buttonList[i].addEventListener('click', openModal);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeModal();
  }
});
