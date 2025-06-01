
// IIFE function that creates game board object
const gameBoard = (function() {
    let board = Array(9).fill(""); // Initialize a 3x3 board with null values

    return {
        getBoard: () => board, // Returns the current state of the board
        setCell: (index, value) => {
            if (index >= 0 && index < 9 && !board[index]) { // Check if index is valid and cell is empty
                board[index] = value; // Set the cell to the given value (X or O)
                return true;
            }
            return false;
        },
        resetBoard: () => {
            for (let i = 0; i < board.length; i++) {
                board = Array(9).fill(""); // Reset all cells to null
            }
        }
    };
})();