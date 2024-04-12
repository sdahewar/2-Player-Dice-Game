'use strict';

//Defining the variables and elements used
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');

let activePlayer = 0;
let score = [0, 0];
let flag = 0;
let winner = 0;
let currentScore = 0;

//Generate the ticket
function diceroll() {
  let diceval = Math.trunc(Math.random() * 6) + 1;
  return diceval;
}

//Logic on switch player. Use of a ternary operator to swap the activePlayer index. Add player--active to the activePlayer and remove it from the inactive player.
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0; //Using ternary operator instead of if else to shorten the code
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${Number(!activePlayer)}`)
    .classList.remove('player--active');
}

//Logic on game initialisation. Set all values to zero and make Player--0 as the activePlayer. In case the previous game ended on Player--1 being the activePlayer, then remove it.
function initialiseGame() {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  flag = 0;
  document.querySelector('.player--0').classList.add('player--active');
  if (
    document.querySelector('.player--1').classList.contains('player--active')
  ) {
    document.querySelector('.player--1').classList.remove('player--active');
  }
}

//Logic on winner. If the activePlayer scores above 100 , flag is set to 1 (win) and the player--winner class is added to the player. Also the winner value is noted (0 or 1).
function checkWinner() {
  if (score[Number(!activePlayer)] >= 100) {
    flag = 1;
    document
      .querySelector(`.player--${Number(!activePlayer)}`)
      .classList.add('player--winner');
  }
  winner = Number(!activePlayer);
}

initialiseGame();

//Event when ROLL button is clicked. Firstly its checked if the game is won or not. If no , ticket is generated and the corresponding dice pic is displayed. Then the dice value is checked (if 1 then switch, reset the currentScore) and if !1 , keep adding it to the currentScore.

btnRoll.addEventListener('click', function () {
  //Generate the ticket
  if (flag == 0) {
    let diceval = diceroll();

    //Start to display the dice image corresponding to the ticket
    diceEl.classList.remove('hidden');

    //Dice image getting manipulated
    diceEl.src = `dice-${diceval}.png`;
    console.log(diceval);

    //Now we write the condition on score updation. If dice is 1 then switch to next player , else keep adding to current of that player.

    if (diceval == 1) {
      //Switch to next player and make current as zero. Also the previous rolls dont get added up

      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      switchPlayer();
    } else {
      //Keep adding up the values of dice to current
      currentScore += diceval;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//Event when HOLD button is clicked. It is supposed to push the currentScore to the Score array and assign it to the index of the active player. Checks if game is over or not firstly (flag). Also resets the score and switches the player. The win condition is checked everytime HOLD button is clicked.
btnHold.addEventListener('click', function () {
  if (flag == 0) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    switchPlayer();

    diceEl.classList.add('hidden');
    checkWinner();
  }
});

//Event when NEW button is clicked. In cases when the game is won and user resets , player--winner class is removed from the winner and in case game is not won yet (flag = 0) , then the game is just initialised.
btnNew.addEventListener('click', function () {
  if (flag == 1) {
    document
      .querySelector(`.player--${winner}`)
      .classList.toggle('player--winner');
  }
  initialiseGame();
});
