import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    display: block;
    background-color: #000;
`;

const ParticleText = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: null, y: null, radius: 50 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let adjustX = 10;
        let adjustY = 10;

        ctx.fillStyle = "#fff";
        ctx.font = "30px Consolas";
        ctx.fillText("a2rp", 0, 30);
        const textCoordinates = ctx.getImageData(0, 0, 100, 100);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 3;
                this.baseX = x;
                this.baseY = y;
                this.density = Math.random() * 40 + 5;
            }

            draw() {
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.current.x - this.x;
                let dy = mouse.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.current.radius) {
                    let force = (mouse.current.radius - distance) / mouse.current.radius;
                    let directionX = (dx / distance) * force * this.density;
                    let directionY = (dy / distance) * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 5;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 5;
                    }
                }
            }
        }

        const initParticles = () => {
            particles.current = [];
            for (let y = 0; y < textCoordinates.height; y++) {
                for (let x = 0; x < textCoordinates.width; x++) {
                    const alpha = textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3];
                    if (alpha > 128) {
                        const posX = x + adjustX;
                        const posY = y + adjustY;
                        particles.current.push(new Particle(posX * 6, posY * 6));
                    }
                }
            }
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i; j < particles.current.length; j++) {
                    let dx = particles.current[i].x - particles.current[j].x;
                    let dy = particles.current[i].y - particles.current[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 30) {
                        const opacity = 1 - distance / 30;
                        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current.forEach((p) => {
                p.draw();
                p.update();
            });
            connectParticles();
            animationRef.current = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            mouse.current.x = (e.clientX - rect.left) * scaleX;
            mouse.current.y = (e.clientY - rect.top) * scaleY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <Canvas ref={canvasRef} />;
};

export default ParticleText;