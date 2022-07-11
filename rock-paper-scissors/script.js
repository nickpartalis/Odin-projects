function computerPlay() {
    let compChoice = Math.floor(Math.random() * 3); // 0, 1 or 2
    switch(compChoice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function playRound(playerChoice, compChoice) {
    playerChoice = playerChoice.toLowerCase();
    if (playerChoice == compChoice) return "It's a tie!";
    
    if ((playerChoice == "rock" && compChoice == "scissors") ||
        (playerChoice == "paper" && compChoice == "rock") ||
        (playerChoice == "scissors" && compChoice == "paper")
    ) return `You win, ${playerChoice} beats ${compChoice}.`;

    return `You lose, ${compChoice} beats ${playerChoice}`;
}