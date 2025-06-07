/**
 * Module representing the game board for a Tic-Tac-Toe game.
 * Provides methods to get the current board state, set a cell value, and reset the board.
 *
 * @module GameBoard
 * @namespace GameBoard
 * @typedef {Object} GameBoard
 * @property {function(): string[]} getBoard - Returns the current state of the board as an array of 9 strings.
 * @property {function(number, string): boolean} setCell - Sets the value ('X' or 'O') at the specified index if the cell is empty. Returns true if successful, false otherwise.
 * @property {function(): void} resetBoard - Resets the board to its initial empty state.
 */
const GameBoard = (function () {
  let board = Array(9).fill(""); // Initialize a 3x3 board with empty strings

  return {
    getBoard: () => board, // Returns the current state of the board
    setCell: (index, value) => {
      if (index >= 0 && index < 9 && board[index] === "") { // Check if index is valid and cell is empty
        board[index] = value; // Set the cell to the given value (X or O)
        return true;
      }
      return false;
    },
    resetBoard: () => {
      board = Array(9).fill("");
    }
  };
})();

/**
 * Factory function to create a Player object with a name and marker.
 *
 * @param {string} name - The name of the player.
 * @param {string} marker - The marker assigned to the player (e.g., 'X' or 'O').
 * @returns {{getName: function(): string, getMarker: function(): string}} 
 *   An object with methods to get the player's name and marker.
 */
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
}

/**
 * GameController module for managing the state and logic of a Tic-Tac-Toe game.
 * Handles player turns, game progression, win/tie detection, and board resets.
 *
 * @module GameController
 * @namespace GameController
 * 
 * @function startGame
 * @description Initializes a new game with two players and resets the game board.
 * @param {string} player1Name - The name of the first player.
 * @param {string} player2Name - The name of the second player.
 * 
 * @function playRound
 * @description Plays a round by setting the current player's marker on the board at the specified index.
 * @param {number} index - The board cell index (0-8) where the marker should be placed.
 * @returns {boolean} Returns false if the game is over or the cell is already occupied, true otherwise.
 * 
 * @function checkWinner
 * @description Checks the current board state for a winner or a tie.
 * @returns {(string|null)} Returns the marker of the winning player ("X" or "O"), "tie" if the board is full with no winner, or null if the game should continue.
 * 
 * @function getCurrentPlayer
 * @description Retrieves the current player object.
 * @returns {Object} The current player.
 * 
 * @function resetGame
 * @description Resets the game state and board for a new game.
 * 
 * @private
 * @function switchPlayer
 * @description Switches the turn to the other player.
 */
const GameController = (function () {
  let players = [];
  let currentPlayerIndex = 0;
  let isGameOver = false;

  const startGame = (player1Name, player2Name) => {
    players = [
      Player(player1Name, "X"),
      Player(player2Name, "O")
    ];

    currentPlayerIndex = 0;

    GameBoard.resetBoard();
  };

  // plays round and sets sell on game board with current player.
  // returns false if game over. Returns true if still another round
  const playRound = (index) => {
    if (isGameOver) {
      return false;
    }
    const setCellSuccessful = GameBoard.setCell(index, getCurrentPlayer().getMarker());

    if (!setCellSuccessful) {
      return false;
    }

    const winner = checkWinner();
    if (winner === null) {
      switchPlayer();
    } else {
      isGameOver = true;
    }
    return true;

  };

  // is game over function
  const getIsGameOver = () => {
    return isGameOver;
  }

  // check winner function
  const checkWinner = () => {
    const board = GameBoard.getBoard();
    // check horizontal wins
    for (const i of [0, 3, 6]) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let index = i + j;
        row.push(board[index]);
      }
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
        return row[0];
      }
    }

    // check vertical wins
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (const j of [0, 3, 6]) {
        let index = i + j;
        row.push(board[index]);
      }
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
        return row[0];
      }
    }

    // check diagonal wins
    for (const diagonalSet of [[0, 4, 8], [2, 4, 6]]) {
      let diagonal = [];
      for (const index of diagonalSet) {
        diagonal.push(board[index]);
      }
      if (diagonal[0] === diagonal[1] && diagonal[1] === diagonal[2] && diagonal[0] !== "") {
        return diagonal[0];
      }
    }

    // if there are no blank spaces, it is a tie
    if (!board.includes("")) {
      return "tie";
    } else {
      return null;
    }
  };

  // switch player function
  const switchPlayer = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  // get current player function
  const getCurrentPlayer = () => {
    return players[currentPlayerIndex];
  };

  // reset game
  const resetGame = () => {
    currentPlayerIndex = 0;

    GameBoard.resetBoard();
  };

  return {
    startGame,
    playRound,
    checkWinner,
    getCurrentPlayer,
    resetGame,
    getIsGameOver
  };
})();

// Display controller IIFE
const DisplayController = (function () {
  // DOM elements
  const newGameBtn = document.querySelector("#newGameBtn");
  const resetGameBtn = document.querySelector("#resetGameBtn");
  const gameBoardDiv = document.querySelector(".gameBoard");
  const playerNamesDiv = document.querySelector("#playerNamesDiv");
  // function to render board
  const renderBoard = () => {
    board = GameBoard.getBoard();

    // clear gameboard display
    gameBoardDiv.innerHTML = "";

    for (let i = 0; i < board.length; i++) {
      let div = document.createElement("div");
      div.classList.add("boardSquare");
      div.setAttribute("data-index",i);
      div.innerHTML = board[i];
      gameBoardDiv.appendChild(div);
    }
    boardSquareApplyListener();
  }
  // function to set set result message at end of game
  const newGameBtnApplyListener = () => {
    newGameBtn.addEventListener("click", (e) => {
      // make player names form visible
      playerNamesDiv.classList.remove("hidden");
      // hide game board while form is being filled out
      gameBoardDiv.classList.add("hidden");
      resetGameBtn.classList.add("hidden");
    });
  }

  const submitNamesBtnApplyListener = () => {
    const submitNamesBtn = document.querySelector("#submitNamesBtn");
    submitNamesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const {player1Name, player2Name} = getPlayerNames();

      // deal with hidden elements
      playerNamesDiv.classList.add("hidden");
      gameBoardDiv.classList.remove("hidden");
      resetGameBtn.classList.remove("hidden");

      newGameBtn.textContent = "New Game";

      GameController.startGame(player1Name,player2Name);
      renderBoard();
    });
  }

  const boardSquareApplyListener = () => {
    const squareList = document.querySelectorAll(".boardSquare");

    for (const boardSquare of squareList) {

      boardSquare.addEventListener("click",(e) => {
        if (GameController.getIsGameOver()) {
          return
        }
        const index = e.target.getAttribute("data-index");
        const roundSuccess = GameController.playRound(index);
        console.log("round success:",roundSuccess);
        renderBoard();
        if (GameController.getIsGameOver()) {
          const winner = GameController.checkWinner();
          console.log(winner);
          switch (winner) {
            case "tie":
              alert("It's a tie!");
              break;
            default:
              alert(`${GameController.getCurrentPlayer().getName()} Wins!`)
              break;
          }
        }
      });
    }
  };

  // get player names from input fields
  const getPlayerNames = () => {
    const player1Name = document.querySelector("#player1Name").value.trim();
    const player2Name = document.querySelector("#player2Name").value.trim();
    return {
      player1Name,
      player2Name
    }
  }

  // apply button listeners immediately
  submitNamesBtnApplyListener();
  newGameBtnApplyListener();


  return {
    renderBoard,
    getPlayerNames
  }
})();