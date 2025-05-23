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
        if (type === "min") return "#f39c12";
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

const SelectionSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const selectionSort = async () => {
        setSorting(true);
        const arr = [...array];

        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            setBarTypes({ [i]: "min" });
            await sleep(250);

            for (let j = i + 1; j < arr.length; j++) {
                setBarTypes((prev) => ({
                    ...prev,
                    [j]: "compare",
                    [minIndex]: "min",
                }));
                await sleep(200);

                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                    setBarTypes((prev) => ({
                        ...prev,
                        [j]: "min",
                    }));
                    await sleep(200);
                }

                setBarTypes((prev) => {
                    const updated = { ...prev };
                    delete updated[j];
                    return updated;
                });
            }

            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await sleep(250);
            }

            setBarTypes((prev) => ({
                ...prev,
                [i]: "sorted",
            }));
        }

        setSorting(false);
    };

    const handleReset = () => {
        setArray(generateArray());
        setBarTypes({});
        setSorting(false);
    };

    return (
        <Container>
            <h2>Selection Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={selectionSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={handleReset} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default SelectionSortVisualizer;
