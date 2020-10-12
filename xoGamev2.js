const x = 'x'
const o = 'o'
let presentPlayer
// winning combination where win can happen
const winningPossibility = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//player X turn
let xTurn = false

const board = document.getElementById("board")
const cells = document.getElementsByClassName("cell");
let restartGame = document.getElementById("restartGame")
let winningMessage = document.getElementById('winMessage')

// starting of the game by calling the startGame function
startGame()

//this is event for restart button whenever restart button press game will start again
restartGame.addEventListener('click', startGame, false);


function startGame() {
    swapTurn()  
    Array.prototype.forEach.call(cells, cell => {
    // for(const cell of cells){    
        cell.classList.remove(x, o)
        cell.addEventListener('click', handleClick, { once: true })
    })
}

function handleClick(e) {
    targetedcell = e.target
    
    if(!checkWinner(cells)){
        presentPlayer = xTurn ? x : o
        targetedcell.classList.add(presentPlayer)
    }
    
    // console.log(cells)
    if (checkWinner(cells)) {
        if(xTurn == true){
            winningMessage.innerHTML = (`&emsp;PLAYER - 1 ${xTurn ? " - Hurah.. Party for you..." : " - Sorryyy.. bill for you..."} &emsp;PLAYER - 2 ${xTurn ? " - Sorryyy.. bill for you..." : " - Hurah.. Party for you..."}`)
            winningMessage.style.backgroundColor = '#C2DB64'
            winningMessage.style.fontSize = "15px";
            winningMessage.style.fontWeight = "bold"
            winningMessage.style.color = "#601314"
        }
        else{
            winningMessage.innerHTML = (`&emsp;PLAYER - 1 ${xTurn ? " - Hurah.. Party for you..." : " - Sorryyy.. bill for you..."} &emsp;PLAYER - 2 ${xTurn ? " - Sorryyy.. bill for you..." : " - Hurah.. Party for you..."}`)
            winningMessage.style.backgroundColor = 'white'
            winningMessage.style.fontSize = "15px";            
            winningMessage.style.fontWeight = "bold"
            winningMessage.style.color = "#be2626"
        }
    }
    else if (drawGame(cells)) {
        winningMessage.innerHTML = ('Game draw')
        winningMessage.style.backgroundColor = 'yellow'
        winningMessage.style.color = 'red' 
        winningMessage.style.fontSize = "24px"; 
        winningMessage.style.fontWeight = "bold"   
    }
    else {
        swapTurn()
    }
}

function swapTurn(){
    xTurn = !xTurn
}

//checkwin function where we check that is there any winner or not
function checkWinner(cells) {
    return winningPossibility.some(possibility => {
        return possibility.every(index => {
            return cells[index].classList.contains('x')
        }) || possibility.every(index => {
            return cells[index].classList.contains('o')
        })
    })
}

// drawGame is for that if all place in the board is fulled and there is no winner than game is DRAW
function drawGame(cells) {
    let count = 0;
    Array.prototype.forEach.call(cells, cell => {
        if (cell.classList.contains(x) || cell.classList.contains(o)) count++;
    })
    return count === 9;
}
