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

const InsertionSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const insertionSort = async () => {
        setSorting(true);
        const arr = [...array];

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            setBarTypes({ [i]: "active" });
            await sleep(250);

            while (j >= 0 && arr[j] > key) {
                setBarTypes({ [j]: "active", [j + 1]: "active" });
                arr[j + 1] = arr[j];
                setArray([...arr]);
                await sleep(250);
                j--;
            }

            arr[j + 1] = key;
            setArray([...arr]);
            setBarTypes({});
        }

        const finalTypes = {};
        arr.forEach((_, i) => (finalTypes[i] = "sorted"));
        setBarTypes(finalTypes);

        setSorting(false);
    };

    const resetArray = () => {
        setArray(generateArray());
        setBarTypes({});
        setSorting(false);
    };

    return (
        <Container>
            <h2>Insertion Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={insertionSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={resetArray} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default InsertionSortVisualizer;
