// Helper function for faster board cloning
const cloneBoard = (board) => board.map((row) => row.slice());

// Precompute box starting positions for faster validation
const boxStartPos = Array.from({ length: 9 }, (_, i) => Math.floor(i / 3) * 3);

export const isValid = (board, row, col, num) => {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }

    // Check 3x3 box using precomputed positions
    const boxRow = boxStartPos[row];
    const boxCol = boxStartPos[col];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }
    return true;
};

export const solveSudoku = (inputBoard) => {
    const board = cloneBoard(inputBoard);
    const emptyCells = [];

    // Pre-find all empty cells to optimize solving order
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (!board[r][c]) emptyCells.push([r, c]);
        }
    }

    // Sort empty cells by fewest possibilities first (optimization)
    emptyCells.sort((a, b) => {
        const countA = countPossibilities(board, a[0], a[1]);
        const countB = countPossibilities(board, b[0], b[1]);
        return countA - countB;
    });

    const solve = (index = 0) => {
        if (index === emptyCells.length) return true;

        const [r, c] = emptyCells[index];
        // Try numbers in random order for more variability
        const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const n of nums) {
            if (isValid(board, r, c, n)) {
                board[r][c] = n;
                if (solve(index + 1)) return true;
                board[r][c] = "";
            }
        }
        return false;
    };

    return solve() ? board : null;
};

const countPossibilities = (board, row, col) => {
    let count = 0;
    for (let n = 1; n <= 9; n++) {
        if (isValid(board, row, col, n)) count++;
    }
    return count;
};

// Cache for previously generated puzzles
const puzzleCache = new Set();

export const generateSudoku = () => {
    // Start with completely empty board
    const emptyBoard = Array(9)
        .fill()
        .map(() => Array(9).fill(""));

    // Fill random cells with random numbers (while maintaining validity)
    fillRandomCells(emptyBoard, 11); // Start with 11 random cells

    // Solve the board to get a complete solution
    const solved = solveSudoku(emptyBoard);
    if (!solved) return generateSudoku(); // Retry if failed

    // Create puzzle by removing cells strategically
    const puzzle = createPuzzle(solved, 45); // Remove 45 cells

    // Check if we've seen this puzzle before (simple hash)
    const puzzleHash = JSON.stringify(puzzle);
    if (puzzleCache.has(puzzleHash)) {
        return generateSudoku(); // Try again if duplicate
    }

    // Add to cache (limit cache size)
    if (puzzleCache.size > 10) {
        const first = puzzleCache.keys().next().value;
        puzzleCache.delete(first);
    }
    puzzleCache.add(puzzleHash);

    return puzzle;
};

const fillRandomCells = (board, count) => {
    const positions = [];
    // Generate all possible positions
    for (let i = 0; i < 81; i++) {
        positions.push([Math.floor(i / 9), i % 9]);
    }

    // Shuffle positions
    shuffleArray(positions);

    let filled = 0;
    while (filled < count && positions.length) {
        const [row, col] = positions.pop();
        if (board[row][col] === "") {
            const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (const num of nums) {
                if (isValid(board, row, col, num)) {
                    board[row][col] = num;
                    filled++;
                    break;
                }
            }
        }
    }

    return filled === count;
};

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const createPuzzle = (solvedBoard, emptyCells) => {
    const puzzle = cloneBoard(solvedBoard);
    const positions = [];

    // Generate all possible positions
    for (let i = 0; i < 81; i++) {
        positions.push([Math.floor(i / 9), i % 9]);
    }

    // Shuffle positions
    shuffleArray(positions);

    let removed = 0;
    while (removed < emptyCells && positions.length) {
        const [row, col] = positions.pop();
        if (puzzle[row][col] !== "") {
            const backup = puzzle[row][col];
            puzzle[row][col] = "";

            // Check if the puzzle still has a unique solution
            const tempBoard = cloneBoard(puzzle);
            if (countSolutions(tempBoard) === 1) {
                removed++;
            } else {
                puzzle[row][col] = backup;
            }
        }
    }

    return puzzle;
};

const countSolutions = (board, count = 0) => {
    // Modified solver that counts solutions up to 2 for efficiency
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (!board[r][c]) {
                for (let n = 1; n <= 9 && count < 2; n++) {
                    if (isValid(board, r, c, n)) {
                        board[r][c] = n;
                        count = countSolutions(board, count);
                        board[r][c] = "";
                    }
                }
                return count;
            }
        }
    }
    return count + 1;
};
