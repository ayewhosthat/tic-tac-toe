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

