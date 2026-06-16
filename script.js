const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");

const playerDisplay = document.getElementById("players");
const turnText = document.getElementById("turnText");

const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";

let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function startGame(){

    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";

    playerDisplay.innerText =
    `${player1} (X) VS ${player2} (O)`;

    turnText.innerText =
    `${player1}'s Turn (X)`;
}

cells.forEach(cell=>{
    cell.addEventListener("click",handleClick);
});

function handleClick(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive)
    return;

    board[index] = currentPlayer;

    this.innerText = currentPlayer;

    this.classList.add(
        currentPlayer === "X" ? "x" : "o"
    );

    checkWinner();

    if(gameActive){

        currentPlayer =
        currentPlayer === "X" ? "O" : "X";

        turnText.innerText =
        currentPlayer === "X"
        ? `${player1}'s Turn (X)`
        : `${player2}'s Turn (O)`;
    }
}

function checkWinner(){

    for(let pattern of winPatterns){

        let [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            gameActive = false;

            const winner =
            currentPlayer === "X"
            ? player1
            : player2;

            winnerText.innerHTML =
            `🎉 Congratulations ${winner}!<br>You Won The Game`;

            popup.style.display = "flex";

            return;
        }
    }

    if(!board.includes("")){

        gameActive = false;

        winnerText.innerHTML =
        "🤝 Match Draw";

        popup.style.display = "flex";
    }
}

function restartGame(){

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    gameActive = true;

    cells.forEach(cell=>{
        cell.innerText = "";
        cell.classList.remove("x","o");
    });

    turnText.innerText =
    `${player1}'s Turn (X)`;
}

function playAgain(){

    popup.style.display = "none";

    restartGame();
}