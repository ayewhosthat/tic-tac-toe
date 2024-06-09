function Gameboard() {
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
    return {getBoard, printBoard, isFull};
}

function Cell() {
    let cellValue;
    // change value of the cell if player decides to make a valid move
    const changeCellValue = (player) => {
        cellValue = player.getNumber() === 1 ? "X" : "O";
    }
    const getValue = () => cellValue;
    const isEmpty = () => cellValue === ''; // check if cell if empty
    return {changeCellValue, getValue, isEmpty};
}

function Player(name, number) {
    const playerName = name;
    const playerNum = number;
    const getName = () => playerName;
    const getNum = () => playerNum;
    return {getName, getNum};
}