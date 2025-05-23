import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    background-color: #000;
    height: 100vh;
    display: block;
    width: 100%;
`;

const FractalCanvas = () => {
    const canvasRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = "green";
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(0,0,0,0.7)";
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;

        let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        const maxLevel = 3;
        const branches = 2;

        let sides = 5;
        let scale = 0.5;
        let spread = 0;
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        let lineWidth = Math.floor(Math.random() * (10 - 5)) + 5;

        const drawBranch = (level) => {
            if (level > maxLevel) return;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(size, 0);
            ctx.stroke();

            for (let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(size - (size / branches) * i, 0);
                ctx.scale(scale, scale);

                ctx.save();
                ctx.rotate(spread);
                drawBranch(level + 1);
                ctx.restore();

                ctx.save();
                ctx.rotate(-spread);
                drawBranch(level + 1);
                ctx.restore();

                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawFractal = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(canvas.width / 2, canvas.height / 2);

            for (let i = 0; i < sides; i++) {
                ctx.rotate((Math.PI * 2) / sides);
                drawBranch(0);
            }

            ctx.restore();
        };

        const randomizeFractal = () => {
            sides = Math.floor(Math.random() * 5 + 2);
            scale = Math.random() * 0.2 + 0.4;
            spread = Math.random() * 3.1 - 3.1;
            color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            lineWidth = Math.floor(Math.random() * (10 - 5)) + 5;
            drawFractal();
        };

        let countSpread = 0;
        let spreadChange = 0.05;
        spread = 0;

        const updateSpread = () => {
            spread += spreadChange;
            drawFractal();

            countSpread++;
            if (countSpread > 150) {
                countSpread = 0;
                randomizeFractal();
            }

            timeoutRef.current = setTimeout(updateSpread, 1000 / 33);
        };

        updateSpread();

        return () => {
            clearTimeout(timeoutRef.current);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return <Canvas ref={canvasRef} />;
};

export default FractalCanvas;
