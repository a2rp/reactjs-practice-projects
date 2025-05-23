import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 30px;
    text-align: center;
    background: #111;
    color: #fff;
    min-height: 100vh;
`;

const BarWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
    height: 300px;
    margin-bottom: 30px;
`;

const Bar = styled.div`
    width: 20px;
    height: ${({ value }) => value}px;
    background-color: ${({ type }) => {
        if (type === "pivot") return "#f39c12";
        if (type === "compare") return "#00f2ff";
        if (type === "sorted") return "#2ecc71";
        return "#888";
    }};
    transition: all 0.3s ease;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 5px;
    font-size: 16px;
    background: #00f2ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
        background: #444;
        cursor: not-allowed;
    }
`;

const generateArray = (length = 20) =>
    Array.from({ length }, () => Math.floor(Math.random() * 200) + 20);

const QuickSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [sorting, setSorting] = useState(false);
    const [barTypes, setBarTypes] = useState({});

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const quickSort = async (arr, left, right) => {
        if (left >= right) return;

        let pivotIndex = right;
        let pivot = arr[pivotIndex];
        setBarTypes((prev) => ({ ...prev, [pivotIndex]: "pivot" }));
        await sleep(300);

        let i = left;

        for (let j = left; j < right; j++) {
            setBarTypes((prev) => ({ ...prev, [j]: "compare" }));
            await sleep(300);

            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                i++;
                await sleep(300);
            }

            setBarTypes((prev) => ({ ...prev, [j]: null }));
        }

        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        setArray([...arr]);
        setBarTypes((prev) => ({ ...prev, [pivotIndex]: null, [i]: "sorted" }));
        await sleep(300);

        await quickSort(arr, left, i - 1);
        await quickSort(arr, i + 1, right);
    };

    const handleSort = async () => {
        setSorting(true);
        const newArr = [...array];
        await quickSort(newArr, 0, newArr.length - 1);
        setBarTypes({});
        setSorting(false);
    };

    const handleReset = () => {
        setArray(generateArray());
        setBarTypes({});
        setSorting(false);
    };

    return (
        <Container>
            <h2>Quick Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={handleSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={handleReset} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default QuickSortVisualizer;
