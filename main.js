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
    const getBoard = () => board; // fetch board

    // display game board (only for console)
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    const isFull = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const cell = board[i][j];
                if (cell.getValue() !== '') {
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
            const condition1 = board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol;
            conditions.push(condition1);
            const condition2 = board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol;
            conditions.push(condition2);
            // rows
            const condition3 = board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol;
            conditions.push(condition3);
            const condition4 = board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol;
            conditions.push(condition4);
            const condition5 = board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol;
            conditions.push(condition5);
            // columns
            const condition6 = board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol;
            conditions.push(condition6);
            const condition7 = board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol;
            conditions.push(condition7);
            const condition8 = board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol;
            conditions.push(condition8);

            const gameOver = (condition) => condition === true;
            return conditions.some(gameOver);
            // check if at least one win condition is satisfied}
     }
    }

    return {getBoard, printBoard, isFull, hasWonGame};
}


function Cell() {
    let cellValue = '';
    // change value of the cell if player decides to make a valid move
    const changeCellValue = (player) => {
        cellValue = player.getNumber() === 1 ? "X" : "O";
    }
    const getValue = () => cellValue;
    const isEmpty = () => cellValue === ''; // check if cell if empty
    return {changeCellValue, getValue, isEmpty};
}

function Player(name, number) {
    let symbol = number === 1 ? "X" : "O";
    const getSymbol = () => symbol;
    const playerName = name;
    const playerNum = number;
    const getName = () => playerName;
    const getNum = () => playerNum;
    return {getName, getNum, getSymbol};
}

function GameController() {
    const board = GameBoard(); // create our game board
    const player1 = Player("player 1", 1);
    const player2 = Player("player 2", 2);
    let curr = player1;
    // switch current player
    const switchPlayer = () => {
        curr = curr === player1 ? player2 : player1;
    };

    const getActivePlayer = () => curr; // get the player who's turn it is

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getName()}'s turn.`);
      };

    const playRound = () => {
        const userInput = prompt("Please enter the position at which you want to place your marker, e.g. 2,2 (0 to 2 inclusive):");
        const row = Number.parseInt(userInput.split(',')[0].replace(' ', ''));
        const column = Number.parseInt(userInput.split(',')[1].replace(' ', ''));

        if (board[row][column].isEmpty()) {
            // drop the token in the cell
            board[row][column].changeCellValue(curr);
            switchPlayer();
            printNewRound();
        }
        else {
            alert("Cell filled");
        }
    };

    const playGame = () => {
        let tie = board.hasWonGame(curr.getSymbol());
        let full = board.isFull();
        printNewRound();
        while (!tie && !full) {
            playRound();
            tie = board.hasWonGame(curr.getSymbol());
            full = board.isFull();
        }  
    };


    return {printNewRound, playRound, playGame};
}

const game = GameController();