const playerScoreCount = document.querySelector('#player-score');
const compScoreCount = document.querySelector('#comp-score');
const result = document.querySelector('#result');
const main = document.querySelector('main');

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

    if (round == "tie") result.textContent = "It's a tie!";
    else if (round == "player") {
        playerScore++;
        playerScoreCount.textContent = playerScore;
        result.textContent = `You win this round, ${playerChoice} beats ${compChoice}.`;
    }
    else {
        compScore++;
        compScoreCount.textContent = compScore;
        result.textContent = `You lose this round, ${compChoice} beats ${playerChoice}.`;
    }

    if (playerScore == 5 || compScore == 5) announceWinner();
}

function announceWinner() {
    const displayWinner = document.createElement('div');
    displayWinner.setAttribute('id', "winner");

    const winner = document.createElement('p');
    let text = (playerScore > compScore ? `Congratulations! You won ${playerScore}-${compScore}.`
                                        : `Game over. You lost ${playerScore}-${compScore}.`);
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
    const displayWinner = document.querySelector('#winner');
    main.removeChild(displayWinner);
}