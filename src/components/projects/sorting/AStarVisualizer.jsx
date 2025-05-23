import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ROWS = 20;
const COLS = 30;

const Wrapper = styled.div`
    padding: 20px;
    background: #111;
    color: #fff;
    min-height: 100vh;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${COLS}, 20px);
    grid-gap: 1px;
`;

const Cell = styled.div`
    width: 20px;
    height: 20px;
    background: ${({ type }) => {
        if (type === "start") return "#2ecc71";
        if (type === "end") return "#e74c3c";
        if (type === "wall") return "#333";
        if (type === "path") return "#00f2ff";
        if (type === "visited") return "#f39c12";
        return "#222";
    }};
    border: 1px solid #111;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 5px;
    background: #00f2ff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
`;

const Node = (row, col, type = "empty") => ({
    row,
    col,
    type,
    f: 0,
    g: 0,
    h: 0,
    parent: null,
});

const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const AStarVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const [startNode, setStartNode] = useState(Node(2, 2, "start"));
    const [endNode, setEndNode] = useState(Node(17, 27, "end"));

    useEffect(() => {
        resetGrid();
    }, []);

    const resetGrid = () => {
        const newGrid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                let type = "empty";
                if (row === startNode.row && col === startNode.col)
                    type = "start";
                else if (row === endNode.row && col === endNode.col)
                    type = "end";
                currentRow.push(Node(row, col, type));
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
    };

    const toggleWall = (row, col) => {
        if (isRunning) return;

        const newGrid = grid.map((r) =>
            r.map((cell) => {
                if (cell.row === row && cell.col === col) {
                    if (cell.type === "empty") return { ...cell, type: "wall" };
                    else if (cell.type === "wall")
                        return { ...cell, type: "empty" };
                }
                return cell;
            })
        );
        setGrid(newGrid);
    };

    const visualizeAStar = async () => {
        setIsRunning(true);
        const openSet = [];
        const closedSet = [];
        const newGrid = [...grid].map((r) => [...r]);

        openSet.push(startNode);

        while (openSet.length > 0) {
            let lowestIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
            }

            let current = openSet[lowestIndex];

            if (current.row === endNode.row && current.col === endNode.col) {
                let temp = current;
                const path = [];
                while (temp.parent) {
                    path.push(temp);
                    temp = temp.parent;
                }
                for (let i = path.length - 1; i >= 0; i--) {
                    const cell = path[i];
                    newGrid[cell.row][cell.col].type = "path";
                    setGrid([...newGrid]);
                    await new Promise((r) => setTimeout(r, 20));
                }
                setIsRunning(false);
                return;
            }

            openSet.splice(lowestIndex, 1);
            closedSet.push(current);

            const neighbors = getNeighbors(current, newGrid);
            for (let neighbor of neighbors) {
                if (
                    closedSet.find(
                        (n) => n.row === neighbor.row && n.col === neighbor.col
                    ) ||
                    neighbor.type === "wall"
                )
                    continue;

                let tentative_g = current.g + 1;
                let newPath = false;

                const openNeighbor = openSet.find(
                    (n) => n.row === neighbor.row && n.col === neighbor.col
                );
                if (!openNeighbor) {
                    newPath = true;
                    neighbor.g = tentative_g;
                    openSet.push(neighbor);
                } else if (tentative_g < neighbor.g) {
                    newPath = true;
                    neighbor.g = tentative_g;
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }

            const updateVisited = (row, col) => {
                const c = newGrid[row][col];
                if (c.type === "empty") newGrid[row][col].type = "visited";
            };

            updateVisited(current.row, current.col);
            setGrid([...newGrid]);
            await new Promise((r) => setTimeout(r, 15));
        }

        setIsRunning(false);
        alert("No Path Found");
    };

    const getNeighbors = (node, grid) => {
        const { row, col } = node;
        const neighbors = [];

        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < COLS - 1) neighbors.push(grid[row][col + 1]);

        return neighbors;
    };

    return (
        <Wrapper>
            <h2>A* Search Pathfinding Visualizer</h2>
            <Grid>
                {grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => (
                        <Cell
                            key={`${rowIdx}-${colIdx}`}
                            type={cell.type}
                            onClick={() => toggleWall(rowIdx, colIdx)}
                        />
                    ))
                )}
            </Grid>
            <div>
                <Button onClick={visualizeAStar} disabled={isRunning}>
                    Visualize A*
                </Button>
                <Button onClick={resetGrid} disabled={isRunning}>
                    Reset
                </Button>
            </div>
        </Wrapper>
    );
};

export default AStarVisualizer;
