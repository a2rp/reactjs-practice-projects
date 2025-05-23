import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    text-align: center;
    margin-top: 40px;
    font-family: sans-serif;
`;

const Title = styled.h2``;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
`;

const Cell = styled.div`
    width: 100px;
    height: 100px;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    cursor: pointer;
    background: ${(props) => (props.disabled ? "#eee" : "#fff")};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

    &:hover {
        background-color: ${(props) => (props.disabled ? "#eee" : "#f0f0f0")};
    }
`;

const Status = styled.p`
    margin: 20px 0;
    font-weight: bold;
`;

const ResetButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    background: #0077ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #0055cc;
    }
`;

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [status, setStatus] = useState("Your turn (X)");
    const [gameOver, setGameOver] = useState(false);

    const winner = calculateWinner(board);

    useEffect(() => {
        if (winner) {
            setGameOver(true);
            setStatus(winner === "X" ? "You win! 🎉" : "Computer wins 😈");
        } else if (board.every((cell) => cell !== "")) {
            setGameOver(true);
            setStatus("It's a draw 🤝");
        }
    }, [board, winner]);

    useEffect(() => {
        if (!isUserTurn && !gameOver && !winner) {
            const timeout = setTimeout(() => {
                makeComputerMove();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [isUserTurn, gameOver, winner]);

    const handleClick = (index) => {
        if (board[index] !== "" || !isUserTurn || gameOver || winner) return;
        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);

        // Check if this move caused a win before switching turns
        const moveWinner = calculateWinner(newBoard);
        if (!moveWinner) {
            setIsUserTurn(false);
        }
    };

    const makeComputerMove = () => {
        if (gameOver || winner) return;

        const emptyIndexes = board
            .map((v, i) => (v === "" ? i : null))
            .filter((i) => i !== null);
        if (emptyIndexes.length === 0) return;

        const randomIndex =
            emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        const newBoard = [...board];
        newBoard[randomIndex] = "O";
        setBoard(newBoard);

        // Check if this move caused a win before switching turns
        const moveWinner = calculateWinner(newBoard);
        if (!moveWinner) {
            setIsUserTurn(true);
            setStatus("Your turn (X)");
        }
    };

    const handleReset = () => {
        setBoard(Array(9).fill(""));
        setIsUserTurn(true);
        setStatus("Your turn (X)");
        setGameOver(false);
    };

    return (
        <Wrapper>
            <Title>Tic Tac Toe (You vs Computer)</Title>
            <Board>
                {board.map((cell, index) => (
                    <Cell
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={cell !== "" || !isUserTurn || gameOver || winner}
                    >
                        {cell}
                    </Cell>
                ))}
            </Board>
            <Status>{status}</Status>
            <ResetButton onClick={handleReset}>Reset Game</ResetButton>
        </Wrapper>
    );
};

const calculateWinner = (squares) => {
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // cols
        [0, 4, 8],
        [2, 4, 6], // diagonals
    ];
    for (let [a, b, c] of combos) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
};

export default TicTacToe;