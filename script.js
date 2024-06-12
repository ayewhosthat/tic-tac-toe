const form = document.querySelector('form');
const modal = document.querySelector('.modal');
modal.showModal();
let p1;
let p2;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p1Name = document.getElementById('p1name').value;
    const p2Name = document.getElementById('p2name').value;
    p1 = Player(p1Name, 1);
    p2 = Player(p2Name, 2);
    ScreenController();
    modal.close()
});

function GameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    // build game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            const cell = Cell();
            board[i].push(cell);
        }
    }

    const getBoardElement = (row, col) => board[row][col]; // fetch board element

    // display game board (only for console)
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    const isFull = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const cell = getBoardElement(i,j);
                if (cell.getValue() === '') {
                    return false;
                }
            }
        }
        return true;
    }

    const hasWonGame = (symbol) => {
        if (symbol !== '') {
            const conditions = [];
            // checks to see if any row, column, or diagonal has all three entries as the parameter 'symbol'
            // diagonals
            const condition1 = getBoardElement(0,0).getValue() === symbol && getBoardElement(1,1).getValue() === symbol && getBoardElement(2,2).getValue() === symbol;
            conditions.push(condition1);
            const condition2 = getBoardElement(0,2).getValue() === symbol && getBoardElement(1,1).getValue() === symbol && getBoardElement(2,0).getValue() === symbol;
            conditions.push(condition2);
            // rows
            const condition3 = getBoardElement(0,0).getValue() === symbol && getBoardElement(0,1).getValue() === symbol && getBoardElement(0,2).getValue() === symbol;
            conditions.push(condition3);
            const condition4 = getBoardElement(1,0).getValue() === symbol && getBoardElement(1,1).getValue() === symbol && getBoardElement(1,2).getValue() === symbol;
            conditions.push(condition4);
            const condition5 = getBoardElement(2,0).getValue() === symbol && getBoardElement(2,1).getValue() === symbol && getBoardElement(2,2).getValue() === symbol;
            conditions.push(condition5);
            // columns
            const condition6 = getBoardElement(0,0).getValue() === symbol && getBoardElement(1,0).getValue() === symbol && getBoardElement(2,0).getValue() === symbol;
            conditions.push(condition6);
            const condition7 = getBoardElement(1,0).getValue() === symbol && getBoardElement(1,1).getValue() === symbol && getBoardElement(2,1).getValue() === symbol;
            conditions.push(condition7);
            const condition8 = getBoardElement(2,0).getValue() === symbol && getBoardElement(2,1).getValue() === symbol && getBoardElement(2,2).getValue() === symbol;
            conditions.push(condition8);

            const gameOver = (condition) => condition === true;
            return conditions.some(gameOver);
            // check if at least one win condition is satisfied
     }
    }

    return {getBoardElement, printBoard, isFull, hasWonGame};
}

function Cell() {
    let cellValue = '';
    // change value of the cell if player decides to make a valid move
    const changeCellValue = (player) => {
        cellValue = player.getNum() === 1 ? "❌" : "⭕";
    }
    const getValue = () => cellValue;
    const isEmpty = () => cellValue === ''; // check if cell if empty
    const resetCell = () => {cellValue = ''};
    return {changeCellValue, getValue, isEmpty, resetCell};
}

function Player(name, number) {
    let symbol = number === 1 ? "❌" : "⭕";
    const getSymbol = () => symbol;
    const playerName = name;
    const playerNum = number;
    const getName = () => playerName;
    const getNum = () => playerNum;
    return {getName, getNum, getSymbol};
}

function GameController() {
    const board = GameBoard();
    let curr = p1;
    let gameStatus;
    const getBoard = () => board;
    const switchPlayer = () => {
        curr = curr === p1 ? p2 : p1
    };
    const getActivePlayer = () => curr;
    const getGameStatus = () => {
        gameStatus;
    };
    const resetActivePlayer = () => {
        curr = p1;
    };

    const playRound = (row, column) => {
        if (board.getBoardElement(row, column).isEmpty()) {
            // drop the token in the cell
            board.getBoardElement(row, column).changeCellValue(curr);
            won = board.hasWonGame(curr.getSymbol());
            full = board.isFull();
            if (won) {
                // this means that there was a 3 in a row, we check for this first before the board full check
                gameStatus = "won";
            } else if (!won && full) {
                gameStatus = "draw";
            }
            if (!full && !won) {
                switchPlayer(); // only switch if the game is not finished
            }
        }
        else {
            alert("Cell filled");
        }
    };
    return {switchPlayer, getActivePlayer, playRound, getGameStatus, getBoard, resetActivePlayer};
}

function ScreenController() {
    const game = GameController(); // initialize our game
    const buttons = document.querySelectorAll('.grid-btn');
    const currPlayer = game.getActivePlayer().getName();
    const text = document.querySelector('h2');
    text.textContent = `Currently ${currPlayer}'s turn`;

    const getGame = () => game;

    // function to update screen
    const updateBoard = (n) => {
        const row = Math.floor(n/3);
        const column = n % 3;
        buttons[n].textContent = game.getBoard().getBoardElement(row, column).getValue();
        const currPlayer = game.getActivePlayer().getName();
        const text = document.querySelector('h2');
        text.textContent = `Currently ${currPlayer}'s turn`;
    };

    // add event listeners to buttons
    for (let i = 0; i < buttons.length; i++) {
        const gridBtn = buttons[i];
        gridBtn.addEventListener('click', () => {
            const row = Math.floor(i/3);
            const column = i % 3;
            game.playRound(row, column)
            updateBoard(i);
        });
    }

    // add event listener for reset button
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
        const gridSlots = document.querySelectorAll('.grid-btn');
        for (let i = 0; i < gridSlots.length; i++) {
            const slot = gridSlots[i];
            slot.textContent = ''; // reset display text
            // now reset actual cell value
            let row = Math.floor(i/3);
            let column = i % 3;
            getGame().getBoard().getBoardElement(row, column).resetCell();
        }
        const resultsText = document.querySelector('h2');
        resultsText.textContent = '';
        getGame.resetActivePlayer();
    });

    return {updateBoard, getGame};
}