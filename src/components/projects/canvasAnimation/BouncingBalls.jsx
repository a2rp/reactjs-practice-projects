import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
    background-color: #000;
    display: block;
    min-height: 100vh;
`;

const BouncingBalls = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Circle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;

                const speed = 1 + Math.random() * 3;
                this.dx = Math.random() < 0.5 ? -speed : speed;
                this.dy = Math.random() < 0.5 ? -speed : speed;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update(ctx, canvasWidth, canvasHeight) {
                if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.draw(ctx);
            }
        }

        const balls = [];
        for (let i = 0; i < 20; i++) {
            const radius = Math.floor(Math.random() * 30) + 15;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            balls.push(new Circle(x, y, radius, "#f00"));
        }

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach((ball) => ball.update(context, canvas.width, canvas.height));
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationRef.current);
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return <Canvas ref={canvasRef} />;
};

export default BouncingBalls;
