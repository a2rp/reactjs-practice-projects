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
    background-color: ${({ type }) =>
        type === "active" ? "#00f2ff" : type === "sorted" ? "#2ecc71" : "#888"};
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

const HeapSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const heapify = async (arr, n, i) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest !== i) {
            setBarTypes({ [i]: "active", [largest]: "active" });
            await sleep(250);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            setBarTypes({});
            await sleep(250);
            await heapify(arr, n, largest);
        }
    };

    const heapSort = async () => {
        setSorting(true);
        const arr = [...array];
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            setBarTypes({ [0]: "active", [i]: "active" });
            await sleep(250);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            setArray([...arr]);
            setBarTypes({ [i]: "sorted" });
            await sleep(250);
            await heapify(arr, i, 0);
        }

        const finalTypes = {};
        arr.forEach((_, i) => (finalTypes[i] = "sorted"));
        setBarTypes(finalTypes);
        setSorting(false);
    };

    const handleReset = () => {
        setArray(generateArray());
        setBarTypes({});
        setSorting(false);
    };

    return (
        <Container>
            <h2>Heap Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={heapSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={handleReset} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default HeapSortVisualizer;
