import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    background-color: #000;
    width: 100%;
    height: 100vh;
    display: block;
`;

const PixelRain = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationRef = useRef(null);
    const totalParticles = 1000;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.speed = 0;
                this.velocity = Math.random() * 3.5;
                this.size = Math.random() * 1.5 + 1;
            }

            update() {
                let movement = 2.5 - this.speed + this.velocity;
                this.y += movement;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                context.beginPath();
                context.fillStyle = "white";
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fill();
            }
        }

        const init = () => {
            particles.current = [];
            for (let i = 0; i < totalParticles; i++) {
                particles.current.push(new Particle());
            }
        };
        init();

        const animate = () => {
            context.globalAlpha = 0.05;
            context.fillStyle = "rgb(0,0,0)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationRef.current);
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return <Canvas ref={canvasRef} />;
};

export default PixelRain;
