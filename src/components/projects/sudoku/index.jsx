import React, { useState, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { generateSudoku, solveSudoku } from "./utils";

const Sudoku = () => {
    const [initialBoard, setInitialBoard] = useState(() => generateSudoku());
    const [board, setBoard] = useState(() =>
        initialBoard.map((row) => [...row])
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const lastClickTime = useRef(0);

    const handleInputChange = useCallback((row, col, value) => {
        const num = parseInt(value);
        if (value === "" || (num >= 1 && num <= 9)) {
            setBoard((prev) => {
                const newBoard = prev.map((r) => [...r]);
                newBoard[row][col] = value === "" ? "" : num;
                return newBoard;
            });
        }
    }, []);

    const handleNewSudoku = useCallback(async () => {
        // Debounce - prevent rapid clicks
        const now = Date.now();
        if (now - lastClickTime.current < 1000) return;
        lastClickTime.current = now;

        setIsGenerating(true);
        try {
            // Create a new promise to handle the generation
            const newBoard = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(generateSudoku());
                }, 0); // This allows the UI to update first
            });
            setInitialBoard(newBoard);
            setBoard(newBoard.map((row) => [...row]));
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleSolve = useCallback(() => {
        const solution = solveSudoku(board);
        if (solution) {
            setBoard(solution);
        } else {
            alert("No valid solution found.");
        }
    }, [board]);

    return (
        <Wrapper>
            <h2>Sudoku Game</h2>
            {isGenerating && (
                <Overlay>
                    <Spinner />
                </Overlay>
            )}
            <Board $disabled={isGenerating}>
                {board.map((row, i) =>
                    row.map((cell, j) => {
                        const readOnly = initialBoard[i][j] !== "";
                        return (
                            <Cell
                                key={`${i}-${j}`}
                                type="text"
                                value={cell || ""}
                                readOnly={readOnly || isGenerating}
                                onChange={(e) =>
                                    handleInputChange(i, j, e.target.value)
                                }
                                $readOnly={readOnly}
                            />
                        );
                    })
                )}
            </Board>
            <div>
                <Button onClick={handleNewSudoku} disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "New Sudoku"}
                </Button>
                <Button onClick={handleSolve} disabled={isGenerating}>
                    Solve
                </Button>
            </div>
        </Wrapper>
    );
};

// Add spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #007bff;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const Wrapper = styled.div`
    max-width: min(300px, 90vw);
    margin: 20px auto;
    padding: 15px;
    background: #f4f4f4;
    border-radius: 8px;
    text-align: center;
    position: relative;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 1px;
    margin: 15px auto;
    background: #ccc;
    border: 2px solid #333;
    opacity: ${(props) => (props.$disabled ? 0.7 : 1)};
    pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
`;

const Cell = styled.input.attrs(({ $readOnly }) => ({
    readOnly: $readOnly,
}))`
    width: 100%;
    aspect-ratio: 1;
    text-align: center;
    font-size: clamp(12px, 4vw, 20px);
    /* font-weight: bold; */
    background: ${(props) => (props.$readOnly ? "#eee" : "#fff")};
    color: ${(props) => (props.$readOnly ? "#333" : "#000")};
    border: 1px solid #ccc;
    padding: 0;

    &:focus {
        border: 1px solid #007bff;
        outline: none;
        background: ${(props) => (props.$readOnly ? "#eee" : "#fff")};
    }
`;

const Button = styled.button`
    margin: 8px;
    padding: 8px 12px;
    font-size: 14px;
    background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
    border: none;
    border-radius: 4px;
    color: white;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: background 0.2s;

    &:hover {
        background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
    }

    &:active {
        transform: ${(props) => (props.disabled ? "none" : "scale(0.98)")};
    }
`;

export default Sudoku;
