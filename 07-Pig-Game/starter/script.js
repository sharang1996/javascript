'use strict';

const elemScore0 = document.querySelector('#score--0');
const elemScore1 = document.getElementById('score--1'); //slightly faster
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const elemDice = document.querySelector('.dice');

//starting conditions

let scores, activePlayer, rollScore;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  rollScore = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  elemDice.classList.add('hidden');
  elemScore0.textContent = 0;
  elemScore1.textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
}

init();

const switchPlayer = function () {
  rollScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = rollScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(activePlayer);
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  elemDice.classList.remove('hidden');
  elemDice.src = `dice-${dice}.png`;

  if (dice === 1) {
    switchPlayer();
  } else {
    rollScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = rollScore;
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += rollScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    //end game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    btnHold.disabled = true;
    btnRoll.disabled = true;
    elemDice.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
