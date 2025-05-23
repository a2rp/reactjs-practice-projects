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
        type === "compare"
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

const generateArray = (length = 20) =>
    Array.from({ length }, () => Math.floor(Math.random() * 200) + 20);

const MergeSortVisualizer = () => {
    const [array, setArray] = useState(generateArray());
    const [barTypes, setBarTypes] = useState({});
    const [sorting, setSorting] = useState(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const merge = async (arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;

        const left = arr.slice(l, m + 1);
        const right = arr.slice(m + 1, r + 1);

        let i = 0,
            j = 0,
            k = l;

        while (i < n1 && j < n2) {
            setBarTypes((prev) => ({ ...prev, [k]: "compare" }));
            await sleep(200);

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }

            setArray([...arr]);
            setBarTypes((prev) => ({ ...prev, [k]: "sorted" }));
            await sleep(200);
            k++;
        }

        while (i < n1) {
            setBarTypes((prev) => ({ ...prev, [k]: "compare" }));
            arr[k] = left[i];
            i++;
            setArray([...arr]);
            setBarTypes((prev) => ({ ...prev, [k]: "sorted" }));
            await sleep(200);
            k++;
        }

        while (j < n2) {
            setBarTypes((prev) => ({ ...prev, [k]: "compare" }));
            arr[k] = right[j];
            j++;
            setArray([...arr]);
            setBarTypes((prev) => ({ ...prev, [k]: "sorted" }));
            await sleep(200);
            k++;
        }
    };

    const mergeSort = async (arr, l, r) => {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    };

    const handleSort = async () => {
        setSorting(true);
        const arr = [...array];
        await mergeSort(arr, 0, arr.length - 1);
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
            <h2>Merge Sort Visualizer</h2>
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

export default MergeSortVisualizer;
