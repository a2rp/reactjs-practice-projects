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
    Array.from({ length }, () => Math.floor(Math.random() * 1000));

const getMaxDigits = (arr) => {
    let max = Math.max(...arr);
    return max.toString().length;
};

const getDigit = (num, i) => {
    return Math.floor(num / Math.pow(10, i)) % 10;
};

const RadixSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const radixSort = async () => {
        setSorting(true);
        let arr = [...array];
        const maxDigits = getMaxDigits(arr);

        for (let k = 0; k < maxDigits; k++) {
            const buckets = Array.from({ length: 10 }, () => []);

            for (let i = 0; i < arr.length; i++) {
                const digit = getDigit(arr[i], k);
                buckets[digit].push(arr[i]);
                setBarTypes({ [i]: "active" });
                await sleep(150);
            }

            arr = [].concat(...buckets);
            setArray([...arr]);
            setBarTypes({});
            await sleep(400);
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
            <h2>Radix Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value / 2} type={barTypes[index]} /> // scaled height
                ))}
            </BarWrapper>
            <div>
                <Button onClick={radixSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={handleReset} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default RadixSortVisualizer;
