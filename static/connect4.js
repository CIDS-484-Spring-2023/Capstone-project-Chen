var playerRed ="R";
var playerYellow = "Y";

/*
let gameState = {
    board: [],
    currentPlayer: playerRed,
    gameOver: false,
    currentColumns: null
}
*/
var number_rows = 6;
var number_columns = 7;

window.onload = function(){
    setGame()
}
function setGame() {
    for(let r=0; r<number_rows; r++){
        for(let c=0; c<number_columns;c++) {
            
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setPiece);
            if (gameState.board[r][c] == "R") {
                tile.classList.add("red-piece");
            } else if (gameState.board[r][c] == "Y") {
                tile.classList.add("yellow-piece");
            }
            document.getElementById("board").append(tile);
        }
    }
}
async function setPiece(){
    var currentPlayer = currentPlayer
    console.log(gameState)
    if(document.getElementById("red").checked){
        if(gameState.currentPlayer != playerRed){
            return;
        }
    }
    if(document.getElementById("yellow").checked){
        if(gameState.currentPlayer != playerYellow) {
            return;
        }
    }
    if(gameState.gameOver){
        return;
    }

    let coords=this.id.split("-");
    let r =parseInt(coords[0]);
    let c =parseInt(coords[1]);
    
    r = gameState.currentColumns[c];
    if(r<0){
        return;
    }
    gameState.board[r][c] = gameState.currentPlayer;
    let tile = document.getElementById(r.toString() +"-" + c.toString());
    if(gameState.currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        gameState.currentPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        gameState.currentPlayer = playerRed;
    }
    r-=1;
    gameState.currentColumns[c] = r;

    checkWinner();
    await fetch(window.location.href, { method: "POST",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify(gameState)})
}

function checkWinner(){
    //horizontallly
    for(let r=0; r<number_rows; r++){
        for(let c=0; c<number_columns-3;c++){
            if(gameState.board[r][c]==gameState.board[r][c+1] && gameState.board[r][c+1]==gameState.board[r][c+2] && gameState.board[r][c+2] == gameState.board[r][c+3]){
                if(gameState.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //vertically
    for(let c=0; c<number_columns;c++){
        for(let r=0; r<number_rows-3; r++){
            if(gameState.board[r][c]==gameState.board[r+1][c] && gameState.board[r+1][c]==gameState.board[r+2][c] && gameState.board[r+2][c] == gameState.board[r+3][c]){
                if(gameState.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //diagonally
    for(let c=0; c<number_columns-3;c++){
        for(let r=0; r<number_rows-3; r++){
            if(gameState.board[r][c]==gameState.board[r+1][c+1] && gameState.board[r+1][c+1]==gameState.board[r+2][c+2] && gameState.board[r+2][c+2] == gameState.board[r+3][c]){
                if(gameState.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}
function setWinner(r,c) {
    let winner = document.getElementById("winner");
    if(gameState.board[r][c] == playerRed){
        winner.innerText = "Red Wins";
    }
    else{
        winner.innerText = "Yellow Wins"
    }
}
