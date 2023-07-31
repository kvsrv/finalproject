
const $uDice1Img = $('#user-dice1');
const $uDice2Img = $('#user-dice2');
const $opDice1Img = $('#op-dice1');
const $opDice2Img = $('#op-dice2');
const $userRoll = $('#user-roll');
const $userTotalScore = $('#user-totalScore');
const $computerRoll = $('#op-roll');
const $computerTotalScore = $('#op-totalScore');
const $finalScorePopup = $('#finalScore-popup');
const $closeFSPopup = $('#closeFS-popup');
const $newGame = $('#newGame');
const $newGame2 = $('#newGame2');
const $finalScore = $('#finalScore');
const $howToPlayBtn = $('#howToPlay');
const $howToPlayPopup = $('#howToPlay-popup');
const $closeHTPPopup = $('#closeHTP-popup');

const rollBtn = document.getElementById('roll');

let gameRounds =0;
let userRoll;
let userTotalScore = 0;
let computerRoll;
let computerTotalScore = 0;
let winnerTimeOut;

$howToPlayBtn.click(function(){
    $howToPlayPopup.show();
    $closeHTPPopup.click(function(){
        $howToPlayPopup.fadeOut();
    });
})

$finalScorePopup.hide();
class Dice {
    constructor() {
        this.dice;
    }
    roll() {
        this.dice = Math.floor(Math.random() *6 + 1);
        return [this.dice];
    }
}

const userDice1 = new Dice();
const userDice2 = new Dice();
const computerDice1 = new Dice();
const computerDice2 = new Dice();

rollBtn.addEventListener('click',rollDices)

function rollDices(){
    gameRounds++;
    $uDice1Img.attr('src',`images/dice-${userDice1.roll()}.jpg`);
    $uDice2Img.attr('src',`images/dice-${userDice2.roll()}.jpg`);
    $opDice1Img.attr('src',`images/dice-${computerDice1.roll()}.jpg`);
    $opDice2Img.attr('src',`images/dice-${computerDice2.roll()}.jpg`);

    if(userDice1.dice == 1 || userDice2.dice == 1){
        userRoll = 0;
    }
    else if (userDice1.dice == userDice2.dice){
        userRoll = (userDice1.dice + userDice2.dice)*2
    }
    else{
        userRoll = userDice1.dice + userDice2.dice;
    }
    userTotalScore = userTotalScore + userRoll;
    $userRoll.html(`Score: <span>${userRoll}</span>`);
    $userTotalScore.html(`Total Score: <span>${userTotalScore}</span>`);


    if(computerDice1.dice == 1 || computerDice2.dice == 1){
        computerRoll = 0;
    }
    else if (computerDice1.dice == computerDice2.dice){
        computerRoll = (computerDice1.dice + computerDice2.dice)*2
    }
    else{
        computerRoll = computerDice1.dice + computerDice2.dice
    }
    computerTotalScore = computerTotalScore + computerRoll;
    $computerRoll.html(`Score: <span>${computerRoll}</span>`);
    $computerTotalScore.html(`Total Score: <span>${computerTotalScore}</span>`)

    if (gameRounds == 3){
        rollBtn.removeEventListener('click',rollDices);
        if(userTotalScore>computerTotalScore){
            $finalScore.html(`Congratulations! You won by ${userTotalScore-computerTotalScore} point(s)`);
        }
        else if(computerTotalScore>userTotalScore){
            $finalScore.html(`Sorry! You lost by ${computerTotalScore-userTotalScore} point(s)`)
        }
        else{
            $finalScore.html(`Looks like it's a tie! What are the odds!`)
        }
        winnerTimeOut = setTimeout(function(){
            $finalScorePopup.fadeIn();
        },500)
        $closeFSPopup.click(hideFS);
        $newGame2.click(function(){
            $finalScorePopup.hide();
            gameRounds = 0;
            computerTotalScore = 0;
            userTotalScore = 0;
            $userRoll.html(`Roll`);
            $userTotalScore.html(`Total Score`);
            $computerRoll.html(`Roll`);
            $computerTotalScore.html(`Total Score`)
            rollBtn.addEventListener('click',rollDices)
         })
     }

 }

 function hideFS() {
    $finalScorePopup.hide();
 }

 $newGame.click(function(){
    gameRounds = 0;
    computerTotalScore = 0;
    userTotalScore = 0;
    $userRoll.html(`Roll`);
    $userTotalScore.html(`Total Score`);
    $computerRoll.html(`Roll`);
    $computerTotalScore.html(`Total Score`)
    rollBtn.addEventListener('click',rollDices)
 })
