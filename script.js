const btnList = document.querySelectorAll(".selection");
const options = ["rock", "paper", "scissor"];
const optionsLink = ["./icons/stone.png", "./icons/toilet-paper.png", "./icons/scissor.png"];
const rockIcon = document.createElement("img");
const paperIcon = document.createElement("img");
const scissorIcon = document.createElement("img");
const playerConsole = document.querySelector(".player-console");
const computerConsole = document.querySelector(".computer-console");
const playerScorecard = document.querySelector("#player-score");
const computerScorecard = document.querySelector("#computer-score");
const result = document.querySelector(".result");

rockIcon.setAttribute('src', optionsLink[0]);
paperIcon.setAttribute('src', optionsLink[1]);
scissorIcon.setAttribute('src', optionsLink[2]);
const iconsToBeAppended = [rockIcon, paperIcon, scissorIcon];

function getComputerSelectionIdx(){
    let randomIdx = Math.floor(Math.random() * 3);
    return randomIdx.toString();
}

// let computerSelection;
// let playerSelection;
let playerScore = 0;
let computerScore = 0;
let map = new Map();

function playRound(playerSelectionIdx, computerSelectionIdx){
    let playerSelection = options[playerSelectionIdx];
    let computerSelection = options[computerSelectionIdx];
    
    map.clear();
    map.set(playerSelectionIdx, "you");
    map.set(computerSelectionIdx, "computer");
    let winner, looser;

    let diff = Math.abs(playerSelectionIdx - computerSelectionIdx);

    if(diff === 1){
        winner = Math.max(playerSelectionIdx, computerSelectionIdx);
        looser = Math.min(playerSelectionIdx, computerSelectionIdx);
    } else if(diff === 2){
        winner = Math.min(playerSelectionIdx, computerSelectionIdx);
        looser = Math.max(playerSelectionIdx, computerSelectionIdx);
    } else{
        return "you both selected the same option try again";
    }

    map.get(winner.toString()) === "you" ? playerScore++ : computerScore++;
    playerScorecard.textContent = playerScore;
    computerScorecard.textContent = computerScore;
    return map.get(winner.toString()) + " selected " + options[winner] + " while " + map.get(looser.toString()) + " selected " + options[looser] + " winner is " + map.get(winner.toString());

}

function reset(){
    alert("game over play again")
}

btnList.forEach((ele) => {
    ele.addEventListener("click", () => {
        while(computerConsole.lastChild){
            computerConsole.lastChild.remove();
        }
        while(playerConsole.lastChild){
            playerConsole.lastChild.remove();
        }
        let computerSelectedIdx = getComputerSelectionIdx();
        if(ele.id === computerSelectedIdx){
            const tempIcon = iconsToBeAppended[parseInt(ele.id)].cloneNode(true);
            playerConsole.appendChild(tempIcon);
        } else{
            playerConsole.appendChild(iconsToBeAppended[parseInt(ele.id)]);
        }
        computerConsole.appendChild(iconsToBeAppended[parseInt(computerSelectedIdx)]);
        let status = playRound(ele.id, computerSelectedIdx);
        result.textContent =status;
    })
})

function playGame(){

}