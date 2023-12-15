const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  /* 
    Configuramos el mensaje inicial para que los jugadores sepan de quién es el turno. 
  */
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
  /* 
    Actualizamos nuestro estado interno del juego para reflejar el movimiento realizado. 
    así como actualizar la interfaz de usuario para reflejar el movimiento realizado 
  */
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

}
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function handleResultValidation() {
  let roundWon = false;
  for(let i = 0; i <= 7; i++){
    const winCondition = winningConditions[i]; // [0, 1, 2]
    let a = gameState[winCondition[0]]; // gameState[0] = "" || "X" || "O", winCondition[0] = 0
    let b = gameState[winCondition[1]]; // gameState[1] = "" || "X" || "O", winCondition[1] = 1
    let c = gameState[winCondition[2]]; // gameState[2] = "" || "X" || "O", winCondition[2] = 2
    if(a === '' || b === '' || c === ''){
      continue;
    }
    if(a === b && b === c){ 
      roundWon = true;
      break
    }
  }
  if(roundWon){
    statusDisplay.innerHTML = winningMessage(); //<h2> Player X has won! </h2>
    gameActive = false;
    return;
  }
  /* 
    Comprobaremos si hay valores en nuestra matriz de estado del juego. 
    que todavía no están poblados con un cartel de jugador 
  */
  let roundDraw = !gameState.includes("");
  if(roundDraw){
    statusDisplay.innerHTML = drawMessage(); //<h2> Game ended in a draw! </h2>
    gameActive = false;
    return;
  }
  /* 
    Si llegamos hasta aquí sabremos que nadie ganó el juego todavía, 
    y que aún quedan movimientos por realizar, 
    por lo que continuamos cambiando el jugador actual. 
  */
  handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
  /* Guardaremos el elemento html en el que se hizo clic en una variable para facilitar su uso posterior. */
  const clickedCell = clickedCellEvent.target; // <div class="cell" data-cell-index="0">X</div>
  /*
    Aquí tomaremos el atributo 'data-cell-index' de la celda en la que se hizo clic para identificar dónde está esa celda en nuestra cuadrícula.
    Tenga en cuenta que getAttribute devolverá un valor de cadena. Como necesitamos un número real, lo analizaremos en un número entero)
  */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );
  console.log(clickedCellIndex); // 0
  /*
    A continuación debemos verificar si la llamada ya se ha reproducido, o si el juego está en pausa. 
    Si cualquiera de las dos cosas es cierta, simplemente ignoraremos el clic.
  */
  if(gameState[clickedCellIndex] !== "" || !gameActive){
    return;
  }
  /* Si todo está en orden procederemos con el flujo del juego. */
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);