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
        if (type === "found") return "#2ecc71";
        if (type === "active") return "#00f2ff";
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

const Input = styled.input`
    padding: 10px;
    width: 100px;
    font-size: 16px;
    margin: 10px;
`;

const generateArray = (length = 20) =>
    Array.from({ length }, () => Math.floor(Math.random() * 200) + 20);

const LinearSearchVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [searching, setSearching] = useState(false);
    const [target, setTarget] = useState("");

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const linearSearch = async () => {
        if (!target || isNaN(target)) return;
        setSearching(true);
        const num = parseInt(target);
        const arr = [...array];

        for (let i = 0; i < arr.length; i++) {
            setBarTypes({ [i]: "active" });
            await sleep(300);
            if (arr[i] === num) {
                setBarTypes({ [i]: "found" });
                setSearching(false);
                return;
            }
            setBarTypes({});
        }

        alert("Value not found");
        setSearching(false);
    };

    const handleReset = () => {
        setArray(generateArray());
        setBarTypes({});
        setSearching(false);
        setTarget("");
    };

    return (
        <Container>
            <h2>Linear Search Visualizer</h2>
            <BarWrapper>
                {array.map((value, index) => (
                    <Bar key={index} value={value} type={barTypes[index]} />
                ))}
            </BarWrapper>

            <div>
                <Input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Search for..."
                    disabled={searching}
                />
                <Button onClick={linearSearch} disabled={searching}>
                    Search
                </Button>
                <Button onClick={handleReset} disabled={searching}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};

export default LinearSearchVisualizer;
