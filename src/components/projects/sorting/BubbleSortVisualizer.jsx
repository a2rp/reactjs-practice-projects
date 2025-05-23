import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 30px;
    text-align: center;
    background: #121212;
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
    background-color: ${({ $active }) => ($active ? "#00f2ff" : "#888")};
    height: ${({ value }) => value}px;
    transition: height 0.3s, background-color 0.3s;
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

const BubbleSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [sorting, setSorting] = useState(false);
    const [activeIndex, setActiveIndex] = useState([]);

    const bubbleSort = async () => {
        setSorting(true);
        const arr = [...array];
        const len = arr.length;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                setActiveIndex([j, j + 1]);
                await new Promise((resolve) => setTimeout(resolve, 150));

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                }
            }
        }
        setActiveIndex([]);
        setSorting(false);
    };

    const resetArray = () => {
        setArray(generateArray());
        setActiveIndex([]);
        setSorting(false);
    };

    return (
        <Container>
            <h2>Bubble Sort Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar
                        key={index}
                        value={value}
                        $active={activeIndex.includes(index)}
                    />
                ))}
            </BarWrapper>
            <div>
                <Button onClick={bubbleSort} disabled={sorting}>
                    Play
                </Button>
                <Button onClick={resetArray} disabled={sorting}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default BubbleSortVisualizer;
