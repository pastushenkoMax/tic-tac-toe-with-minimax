function createBoard() {
    // Create the table element with rows and cells
    var table = document.createElement("table");

    for (var i = 0; i < 3; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
        var cell = document.createElement("td");
        cell.addEventListener("click", cellClicked);
        row.appendChild(cell);
    }
    table.appendChild(row);
    }

    document.getElementById('table').appendChild(table);
}

function cellClicked() {
    // Get the current player
    var currentPlayer = getCurrentPlayer();

    // Check if the cell is already occupied
    if (this.textContent !== "") {
    return;
    }

    // Update the cell with the current player's symbol
    this.textContent = currentPlayer;

    // Check if the game is over
    if (gameOver(getBoard())) {
      // Display a message and reset the game
        if(!hasWon(getBoard(),currentPlayer)){
            alert("tie");
            resetGame();
            return;
        } else {
            alert("Game over! " + currentPlayer + " has won.");
            resetGame();
            return;
        }
    }
    console.log(currentPlayer);
    // Switch players
    switchPlayer();
    console.log(currentPlayer);
    // Check if the computer's turn
    if (getCurrentPlayer() === "O") {
      // Make the computer's move
        makeComputerMove();
        switchPlayer();
    }
}
let player = "X";

function resetGame() {
  // Clear the board
var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }

  // Reset the player
    return player = "X";
}

function gameOver(board) {
    // Check if the game is over
    return hasWon(board, "X") || hasWon(board, "O") || isFull(board);
}

function switchPlayer() {
    player = (player === "X") ? "O" : "X";
}

function getCurrentPlayer() {
    return player;
}

function makeComputerMove() {
  // Use the minimax algorithm to determine the best move for the computer
    var bestMove = getBestMove(getBoard(), 0, true);

  // Make the computer's move
    document.getElementsByTagName("td")[bestMove].textContent = "O";

  // Check if the game is over
    if (gameOver(getBoard())) {
    // Display a message and reset the game
    alert("Game over! O has won.");
    resetGame();
    }
}

function getScore(board) {
    // Evaluate the score of the given board state
    if (hasWon(board, "X")) {
        return -10;
    } else if (hasWon(board, "O")) {
        return 10;
    } else if (isFull(board)) {
        return 0;
    } else {
        return null;
    }
}

function getBestMove(board, depth, maximizingPlayer) {
    // Use the minimax algorithm to determine the best move
    if (gameOver(board) || depth === 2) {
        return getScore(board);
    }

    if (maximizingPlayer) {
        var maxScore = -Infinity;
        var bestMove = -1;
        var validMoves = getValidMoves(board);
        validMoves = shuffle(validMoves);
        for (var i = 0; i < validMoves.length; i++) {
            var move = validMoves[i];
            var row = Math.floor(move / 3);
            var col = move % 3;
            board[row][col] = "O";
            var score = getBestMove(board, depth + 1, false);
            board[row][col] = "";
            if (score > maxScore) {
                maxScore = score;
                bestMove = move;
            }
        }
        return (depth === 0) ? bestMove : maxScore;
        } else {
            var minScore = Infinity;
            var validMoves = getValidMoves(board);
            // Shuffle the array of valid moves
            validMoves = shuffle(validMoves);
            for (var i = 0; i < validMoves.length; i++) {
                var move = validMoves[i];
                var row = Math.floor(move / 3);
                var col = move % 3;
                board[row][col] = "X";
                var score = getBestMove(board, depth + 1, true);
                board[row][col] = "";
                minScore = Math.min(minScore, score);
            }
        return minScore;
        } 
    }
function shuffle(array) {
    // Shuffle an array using the Fisher-Yates shuffle algorithm
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function gameOver(board) {
    // Check if the game is over
    return hasWon(board, "X") || hasWon(board, "O") || isFull(board);
}

function hasWon(board, player) {
    // Check the rows
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    // Check the columns
    for (var i = 0; i < 3; i++) {
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return true;
        }
    }
    // Check the diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }
    return false;
}

function isFull(board) {
    // Check if the board is full
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

function getValidMoves(board) {
    // Get an array of all the valid moves on the board
    var moves = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                moves.push(i * 3 + j);
            }
        }
    }
    return moves;
}

function getBoard() {
    // Get the current state of the board
    var board = [];
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < 3; i++) {
        board[i] = [];
        for (var j = 0; j < 3; j++) {
            board[i][j] = cells[i * 3 + j].textContent;
        }
    }
    return board;
}


