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
    const getBoardElement = (row, col) => board[row][col]; // fetch board

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
        cellValue = player.getNum() === 1 ? "X" : "O";
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
    let won = board.hasWonGame(curr.getSymbol());
    let full = board.isFull();

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
        let userInput = prompt(`${curr.getName()}'s turn. Enter cell: `);
        const row = Number.parseInt(userInput.split(',')[0].replace(' ',''));
        const column = Number.parseInt(userInput.split(',')[1].replace(' ',''));

        if (board.getBoardElement(row, column).isEmpty()) {
            // drop the token in the cell
            board.getBoardElement(row, column).changeCellValue(curr);
            printNewRound();
            won = board.hasWonGame(curr.getSymbol());
            full = board.isFull();
            if (won) {
                // this means that there was a 3 in a row, we check for this first before the board full check
                console.log(`Game over! ${curr.getName()} wins!`);
                return; // break out of loop from playGame()
            }
            
            } else if (!won && full) {
                console.log("It's a draw!");
                return;
            }
            if (!full) {
                switchPlayer(); // only switch if the game is not finished
        }
        else {
            alert("Cell filled");
        }
    };

    const playGame = () => {
        while (!full) {
            printNewRound();
            playRound();
        } 
        
        board.printBoard();
    };
    return {printNewRound, playRound, playGame};
}

const game = GameController();