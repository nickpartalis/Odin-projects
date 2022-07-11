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
    if (playerChoice == compChoice) return "tie";
    
    if ((playerChoice == "rock" && compChoice == "scissors") ||
        (playerChoice == "paper" && compChoice == "rock") ||
        (playerChoice == "scissors" && compChoice == "paper")
    ) return "player";

    return "computer";
}

function game() {
    let playerScore = compScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerChoice = prompt("Rock, paper or scissors? ");
        let compChoice = computerPlay();
        let result = playRound(playerChoice, compChoice);

        if (result == "tie") console.log("It's a tie!");
        else if (result == "player") {
            ++playerScore;
            console.log(`You win this round, ${playerChoice} beats ${compChoice}.`);
        }
        else {
            ++compScore;
            console.log(`You lose this round, ${compChoice} beats ${playerChoice}.`);
        }
    }
    
    if (playerScore > compScore) console.log(`Congratulations, you won ${playerScore}-${compScore}!`);
    else if (compScore > playerScore) console.log(`Game over. You lost ${playerScore}-${compScore}.`);
    else console.log (`Game is a draw, ${playerScore}-${compScore}.`);
}

game()