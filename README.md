# The Odin Project: Tic Tac Toe
This project is from the Odin Project course which can be found here: [https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

I have attached the directions `project_tic_tac_toe.md` in this repo but the website above will have the most up to date instructions.

See my deployed project here: [https://jackwaterloo.github.io/odin-tic-tac-toe/](https://jackwaterloo.github.io/odin-tic-tac-toe/)

## JavaScript Skills and Techniques Demonstrated

This project showcases a variety of JavaScript concepts and best practices for web development:

*   **Modularity and Encapsulation (IIFE Pattern):**
    *   The game is structured into modules (`GameBoard`, `GameController`, `DisplayController`) using Immediately Invoked Function Expressions (IIFEs).
    *   This approach encapsulates logic, creates private scopes, and avoids polluting the global namespace, adhering to the principle of least global code.

*   **Factory Functions:**
    *   The `Player` objects are created using a factory function, providing a clean way to generate multiple player instances with their own names and markers.

*   **Separation of Concerns:**
    *   **`GameBoard` Module:** Manages the state of the Tic-Tac-Toe board (e.g., storing marks, checking for empty cells, resetting the board).
    *   **`Player` Factory:** Defines the structure and basic properties (name, marker) of a player.
    *   **`GameController` Module:** Orchestrates the game's logic, including starting the game, managing player turns, checking for win/tie conditions, and resetting the game state.
    *   **`DisplayController` Module:** Handles all DOM manipulation and user interface updates. It renders the game board, displays messages (current turn, winner, tie), manages form visibility, and attaches event listeners to UI elements.

*   **DOM Manipulation:**
    *   Dynamic creation and updating of HTML elements to render the game board.
    *   Use of `document.querySelector` to select DOM elements.
    *   Modification of element content (`innerHTML`, `textContent`).
    *   Manipulation of CSS classes (`classList.add`, `classList.remove`) to control element visibility and styling.
    *   Setting element attributes (`setAttribute`) for data binding (e.g., `data-index` on board squares).

*   **Event Handling:**
    *   Implementation of interactive gameplay through `addEventListener` for click events on:
        *   Game board squares (to make a move).
        *   "New Game", "Reset Game", and "Submit Names" buttons.
    *   Use of `event.preventDefault()` to manage default form submission behavior.

*   **Core JavaScript Concepts:**
    *   **Arrays:** Used for representing the game board and managing lists of players.
    *   **Objects:** Fundamental for creating modules and player instances.
    *   **Functions:** Extensive use of functions, including arrow functions, for organizing code and behavior.
    *   **Conditional Logic:** `if/else` statements for game flow control, win/tie checking, and UI updates.
    *   **Loops:** `for` and `for...of` loops for iterating over the game board and DOM elements.
    *   **Scope and Closures:** Leveraged through IIFEs and factory functions to create private variables and maintain state.
    *   **ES6+ Features:** Utilization of `const` and `let` for variable declarations, and destructuring assignment for cleaner data extraction.

*   **Game Logic Implementation:**
    *   Algorithm for determining win conditions (horizontal, vertical, and diagonal checks).
    *   Logic for detecting a tie game.
    *   Turn-based system for alternating players.
    *   Validation to prevent players from marking already occupied squares.