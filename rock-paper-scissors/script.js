const playerScoreCount = document.querySelector('#player-score');
const compScoreCount = document.querySelector('#comp-score');
const result = document.querySelector('#result');
const main = document.querySelector('main');
const playerImg = document.querySelector('#player-img');
const compImg = document.querySelector('#comp-img');
const playerText = document.querySelector('#player h3');
const compText = document.querySelector('#comp h3');

const buttons = document.querySelectorAll('#buttons button');
for (const btn of buttons) {
    btn.addEventListener('click', () => game(btn.id));
}

let playerScore = compScore = 0;

function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    let compChoice = Math.floor(Math.random() * 3); // 0, 1 or 2
    return choices[compChoice];
}

function playRound(playerChoice, compChoice) {
    playerChoice = playerChoice.toLowerCase();
    if (playerChoice == compChoice) return "tie";
    
    if ((playerChoice == "rock" && compChoice == "scissors") ||
        (playerChoice == "paper" && compChoice == "rock") ||
        (playerChoice == "scissors" && compChoice == "paper")
    ) return "player";

    return "computer";
}

function game(playerChoice) {
    if (playerScore >= 5 || compScore >= 5) return;

    let compChoice = computerPlay();
    let round = playRound(playerChoice, compChoice);

    playerImg.style.backgroundImage = `url(assets/${playerChoice}.png)`;
    compImg.style.backgroundImage = `url(assets/${compChoice}.png)`;

    if (round == "tie") {
        result.textContent = "It's a tie!";
        result.className = "";
    }
    else if (round == "player") {
        playerScore++;
        playerScoreCount.textContent = playerScore;
        result.textContent = `You win this round, ${playerChoice} beats ${compChoice}.`;
        result.className = "win";
    }
    else {
        compScore++;
        compScoreCount.textContent = compScore;
        result.textContent = `You lose this round, ${compChoice} beats ${playerChoice}.`;
        result.className = "lose";
    }

    updateScoreColor()
    if (playerScore == 5 || compScore == 5) announceWinner();
}

function announceWinner() {
    const displayWinner = document.createElement('div');
    displayWinner.setAttribute('id', "winner");

    const winner = document.createElement('h3');
    let text;
    if (playerScore > compScore) {
        text = `Congratulations! You won ${playerScore}-${compScore}.`
        winner.className = "win";
    }
    else {
        text = `Game over. You lost ${playerScore}-${compScore}.`;
        winner.className = "lose";
    }
    winner.textContent = text;
    displayWinner.appendChild(winner);
    const playAgain = document.createElement('button');
    playAgain.innerHTML = "Play again";
    playAgain.addEventListener('click', () => restartGame())
    displayWinner.appendChild(playAgain);

    main.appendChild(displayWinner);
}

function restartGame() {
    playerScore = compScore = 0;
    playerScoreCount.textContent = playerScore;
    compScoreCount.textContent = compScore;
    result.textContent = "Make your choice:";
    result.className = "";
    playerImg.style.backgroundImage = "none";
    compImg.style.backgroundImage = "none";
    const displayWinner = document.querySelector("#winner");
    main.removeChild(displayWinner);
    updateScoreColor();
}

function updateScoreColor() {
    if (playerScore > compScore) {
        playerText.className = "win";
        compText.className = "lose";
    }
    else if (playerScore < compScore) {
        playerText.className = "lose";
        compText.className = "win";
    }
    else playerText.className = compText.className = "";
}