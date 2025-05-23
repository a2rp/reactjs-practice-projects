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
    height: ${({ value }) => value * 2}px;
    background-color: ${({ type }) =>
        type === "counting"
            ? "#f39c12"
            : type === "placing"
            ? "#00f2ff"
            : type === "sorted"
            ? "#2ecc71"
            : "#888"};
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

const generateArray = (length = 20, max = 20) =>
    Array.from({ length }, () => Math.floor(Math.random() * max));

const CountingSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const countingSort = async () => {
        setSorting(true);
        const arr = [...array];
        const max = Math.max(...arr);
        const count = new Array(max + 1).fill(0);

        for (let i = 0; i < arr.length; i++) {
            count[arr[i]]++;
            setBarTypes({ [i]: "counting" });
            await sleep(150);
        }

        let index = 0;
        for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
                arr[index] = i;
                setArray([...arr]);
                setBarTypes({ [index]: "placing" });
                await sleep(150);
                count[i]--;
                index++;
            }
        }

        const sortedTypes = {};
        arr.forEach((_, i) => (sortedTypes[i] = "sorted"));
        setBarTypes(sortedTypes);
        setSorting(false);
    };

    const handleReset = () => {
        setArray(generateArray());
        setBarTypes({});
        setSorting(false);
    };

    return (
        <Container>
            <h2>Counting Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={countingSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={handleReset} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default CountingSortVisualizer;
