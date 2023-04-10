var playerRed ="R";
var playerYellow = "Y";

/*
let GAMESTATE = {
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
            if (GAMESTATE.board[r][c] == "R") {
                tile.classList.add("red-piece");
            } else if (GAMESTATE.board[r][c] == "Y") {
                tile.classList.add("yellow-piece");
            }
            document.getElementById("board").append(tile);
        }
    }
}
async function setPiece(){
    var currentPlayer = currentPlayer
    console.log(GAMESTATE)
    if(GAMESTATE.currentPlayer != COLOR){
        return;
    }
    if(GAMESTATE.gameOver){
        return;
    }

    let coords=this.id.split("-");
    let r =parseInt(coords[0]);
    let c =parseInt(coords[1]);
    
    r = GAMESTATE.currentColumns[c];
    if(r<0){
        return;
    }
    GAMESTATE.board[r][c] = GAMESTATE.currentPlayer;
    let tile = document.getElementById(r.toString() +"-" + c.toString());
    if(GAMESTATE.currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        GAMESTATE.currentPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        GAMESTATE.currentPlayer = playerRed;
    }
    r-=1;
    GAMESTATE.currentColumns[c] = r;

    checkWinner();
    await fetch("/game", {  method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(GAMESTATE)})
}

function checkWinner(){
    //horizontallly
    for(let r=0; r<number_rows; r++){
        for(let c=0; c<number_columns-3;c++){
            if(GAMESTATE.board[r][c]==GAMESTATE.board[r][c+1] && GAMESTATE.board[r][c+1]==GAMESTATE.board[r][c+2] && GAMESTATE.board[r][c+2] == GAMESTATE.board[r][c+3]){
                if(GAMESTATE.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //vertically
    for(let c=0; c<number_columns;c++){
        for(let r=0; r<number_rows-3; r++){
            if(GAMESTATE.board[r][c]==GAMESTATE.board[r+1][c] && GAMESTATE.board[r+1][c]==GAMESTATE.board[r+2][c] && GAMESTATE.board[r+2][c] == GAMESTATE.board[r+3][c]){
                if(GAMESTATE.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //diagonally
    for(let c=0; c<number_columns-3;c++){
        for(let r=0; r<number_rows-3; r++){
            if(GAMESTATE.board[r][c]==GAMESTATE.board[r+1][c+1] && GAMESTATE.board[r+1][c+1]==GAMESTATE.board[r+2][c+2] && GAMESTATE.board[r+2][c+2] == GAMESTATE.board[r+3][c]){
                if(GAMESTATE.board[r][c] != ' '){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}
function setWinner(r,c) {
    let winner = document.getElementById("winner");
    if(GAMESTATE.board[r][c] == playerRed){
        winner.innerText = "Red Wins";
    }
    else{
        winner.innerText = "Yellow Wins"
    }
}
