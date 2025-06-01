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
            if (index >= 0 && index < 9 && board === "") { // Check if index is valid and cell is empty
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
        const setCellSuccessful = GameBoard.setCell(index,getCurrentPlayer().getMarker());

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
        resetGame
    };
})();