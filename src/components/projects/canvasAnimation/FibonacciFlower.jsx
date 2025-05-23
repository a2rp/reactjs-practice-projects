import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    width: 100%;
    height: 100vh;
    display: block;
    background-color: #000;
`;

const DisplayInfo = styled.div`
    position: absolute;
    top: 10px;
    left: calc(50% - 50px);
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    color: #000;
    border-radius: 3px;
    padding: 0 15px;
    cursor: default;
`;

const FibonacciFlower = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [petalCount, setPetalCount] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.globalCompositeOperation = "destination-over";

        const compositeOperations = [
            "source-over", "source-atop", "source-in", "source-out",
            "destination-over", "destination-atop", "destination-in",
            "destination-out", "lighter", "copy", "xor"
        ];

        const colors = [
            "violet", "indigo", "blue", "green", "yellow", "orange", "red"
        ];

        let number = 0;
        let multiplier = 1;
        let scale = 10;
        let size = Math.floor(Math.random() * (20 - 5)) + 5;
        let compositeIndex = 0;
        let count = 0;

        const drawFlower = () => {
            setPetalCount(Math.floor(number / 10));

            const angle = number * multiplier;
            const radius = scale * Math.sqrt(number);
            const x = radius * Math.sin(angle) + canvas.width / 2;
            const y = radius * Math.cos(angle) + canvas.height / 2;

            ctx.globalCompositeOperation = compositeOperations[compositeIndex];
            const color = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = color;
            ctx.strokeStyle = "pink";
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            number++;
            count = count > 1000 ? 0 : count + 1;

            if (number > 100) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                size = Math.floor(Math.random() * (25 - 5)) + 5;
                compositeIndex = Math.floor(Math.random() * compositeOperations.length);
                number = 1;
                multiplier = multiplier >= 100 ? 1 : multiplier + 1;
            }
        };

        const animate = () => {
            drawFlower();
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return (
        <>
            <Canvas ref={canvasRef} />
            <DisplayInfo>{petalCount}</DisplayInfo>
        </>
    );
};

export default FibonacciFlower;
