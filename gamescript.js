// Selecting elements from the DOM
const board = document.getElementById('board');
const turnDisplay = document.getElementById('turn');
const restartBtn = document.getElementById('restart-btn');
const playerBtn = document.getElementById('player-btn');
const aiBtn = document.getElementById('ai-btn');

// Game variables
let currentPlayer = 'X';
let isAiGame = false; // Flag to indicate if playing against AI
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board

// Winning combinations
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Event listeners
board.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);
playerBtn.addEventListener('click', () => startGame(false)); // Play with another player
aiBtn.addEventListener('click', () => startGame(true)); // Play with AI

// Initialize the board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        board.appendChild(cell);
    }
}

// Start the game
function startGame(isAi) {
    isAiGame = isAi;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
    board.innerHTML = '';
    initializeBoard();
    board.addEventListener('click', handleCellClick);

    if (isAi && currentPlayer === 'O') {
        // If playing against AI and AI is 'O', make AI move first
        setTimeout(makeAIMove, 500); // Delay for visual effect
    }
}

// Handle click on cells
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] === '' && (currentPlayer === 'X' || !isAiGame)) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            turnDisplay.textContent = `Player ${currentPlayer} wins!`;
            board.removeEventListener('click', handleCellClick);
        } else if (boardState.every(cell => cell !== '')) {
            turnDisplay.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = `Player ${currentPlayer}'s turn`;

            if (isAiGame && currentPlayer === 'O') {
                // If playing against AI and it's AI's turn
                setTimeout(makeAIMove, 500); // Delay for visual effect
            }
        }
    }
}

// Function to make AI move
function makeAIMove() {
    // Check for available empty cells
    let emptyCells = boardState.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    // Randomly select an empty cell (for simplicity)
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiMoveIndex = emptyCells[randomIndex];

    // Simulate AI's move after a short delay (for visual effect)
    setTimeout(() => {
        boardState[aiMoveIndex] = currentPlayer;
        let cells = document.querySelectorAll('.cell');
        cells[aiMoveIndex].textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            turnDisplay.textContent = `Player ${currentPlayer} wins!`;
            board.removeEventListener('click', handleCellClick);
        } else if (boardState.every(cell => cell !== '')) {
            turnDisplay.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }, 500); // Adjust delay as needed for visual effect
}

// Check for a win
function checkWin(player) {
    return winCombos.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
}

// Restart the game
function restartGame() {
    currentPlayer = 'X';
    isAiGame = false;
    boardState = ['', '', '', '', '', '', '', '', ''];
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
    board.innerHTML = '';
    initializeBoard();
    board.addEventListener('click', handleCellClick);
}
