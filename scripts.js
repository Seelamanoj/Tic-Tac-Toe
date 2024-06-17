document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.getAttribute('data-cell'));

        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.setAttribute('data-symbol', currentPlayer); // Set data-symbol attribute
        e.target.style.color = currentPlayer === 'X' ? '#e74c3c' : '#3498db';

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = `It's a Draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    };

    const checkWin = () => {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s Turn`;
        board.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#fff';
            cell.removeAttribute('data-symbol'); // Remove data-symbol attribute
        });
    };

    board.addEventListener('click', handleCellClick);
    restartBtn.addEventListener('click', restartGame);
});
