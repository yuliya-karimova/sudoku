module.exports = function solveSudoku(matrix) {
    const totalSize = matrix.length;
    const boxSize = Math.sqrt(matrix.length);
    
    const findEmptyCell = (matrix) => {
        for (let r = 0; r < totalSize; r++) {
            for (let c = 0; c < totalSize; c++) {
                if (matrix[r][c] === 0) {
                    return[r, c];
                } 
            }
        }
        return null;
    }

    const isValid = (number, position, matrix) => {
        const [r, c] = position;
        
        for (let i = 0; i < totalSize; i++) {
            if (matrix[i][c] === number && i !== r) {
                return false;
            }
        }
        for (let i = 0; i < totalSize; i++) {
            if (matrix[r][i] === number && i !== c) {
                return false;
            }
        }
        const boxRow = Math.floor(r / boxSize) * boxSize;
        const boxCol = Math.floor(c / boxSize) * boxSize;

        for (let i = boxRow; i < boxRow + boxSize; i++) {
            for (let j = boxCol; j < boxCol + boxSize; j++) {
                if (matrix[i][j] === number && i !== r && j !== c) {
                    return false;
                }
            }
        }
        return true;
    }

    const solve = () => {
        const currentPosition = findEmptyCell(matrix);

        if (currentPosition === null) {
            return true;
        }

        for (let i = 1; i <= totalSize; i++) {
            const currentNumber = i;
            const isCurNumberValid = isValid(currentNumber, currentPosition, matrix);

            if (isCurNumberValid) {
                const [x, y] = currentPosition;
                matrix[x][y] = currentNumber;
                
                if (solve()) {
                    return true;
                }

                matrix[x][y] = 0;
            }
        }
        return false;
    }

    solve();
    return matrix;
}
