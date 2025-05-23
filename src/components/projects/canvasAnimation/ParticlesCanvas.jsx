import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
    margin: 0;
    padding: 0;
`;

const ParticleCanvas = styled.canvas`
    display: block;
    /* Remove width/height from CSS to prevent scaling issues */
`;

const ParticleAnimation = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const hueRef = useRef(0);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            // Set canvas dimensions directly without CSS scaling
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const createParticle = (x, y) => ({
            x,
            y,
            size: Math.random() * 7 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            color: `hsl(${hueRef.current}, 100%, 50%)`,
        });

        const handleMouseMove = (event) => {
            // Get precise mouse coordinates
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            for (let i = 0; i < 2; i++) {
                particlesRef.current.push(createParticle(x, y));
            }
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const handleParticles = () => {
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.size > 0.2) p.size -= 0.1;

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.color;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            particlesRef.current = particles.filter((p) => p.size > 0.3);
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            hueRef.current += 2;
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationIdRef.current);
        };
    }, []);

    return (
        <CanvasContainer>
            <ParticleCanvas ref={canvasRef} />
        </CanvasContainer>
    );
};

export default ParticleAnimation;