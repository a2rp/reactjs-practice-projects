import React, { useState } from 'react'
import { AnimationNameWrapper, Wrapper } from './styled'
import BouncingBalls from "./BouncingBalls";
import FibonacciFlower from "./FibonacciFlower";
import FractalCanvas from "./FractalCanvas";
import MatrixRain from "./MatrixRain";
import ParticlesCanvas from "./ParticlesCanvas";
import ParticleText from "./ParticleText";
import PixelRain from "./PixelRain";

const CanvasAnimation = () => {
    const [selectedAnimation, setSelectedAnimation] = useState("Bouncing Balls");

    return (
        <Wrapper>
            <h1 className='heading'>Canvas Animation</h1>
            <AnimationNameWrapper>
                <div className='name' onClick={() => setSelectedAnimation("Bouncing Balls")}>Bouncing Balls</div>
                <div className='name' onClick={() => setSelectedAnimation("Fibonacci Flower")}>Fibonacci Flower</div>
                <div className='name' onClick={() => setSelectedAnimation("Fractal Canvas")}>Fractal Canvas</div>
                <div className='name' onClick={() => setSelectedAnimation("Matrix Rain")}>Matrix Rain</div>
                <div className='name' onClick={() => setSelectedAnimation("Particles Canvas")}>Particles Canvas</div>
                <div className='name' onClick={() => setSelectedAnimation("Particle Text")}>Particle Text</div>
                <div className='name' onClick={() => setSelectedAnimation("Pixel Rain")}>Pixel Rain</div>
            </AnimationNameWrapper>

            {selectedAnimation === "Bouncing Balls" && <div key="BouncingBalls">
                <h3 className='subheading'>Bounrcing Balls</h3>
                <div className='animation'>
                    <BouncingBalls />
                </div>
            </div>}

            {selectedAnimation === "Fibonacci Flower" && <div key="FibonacciFlower">
                <h3 className='subheading'>Fibonacci Flower</h3>
                <div className='animation'>
                    <FibonacciFlower />
                </div>
            </div>}

            {selectedAnimation === "Fractal Canvas" && <div key="FractalCanvas">
                <h3 className='subheading'>Fractal Canvas</h3>
                <div className='animation'>
                    <FractalCanvas />
                </div>
            </div>}

            {selectedAnimation === "Matrix Rain" && <div key="MatrixMain">
                <h3 className='subheading'>Matrix Rain</h3>
                <div className='animation'>
                    <MatrixRain />
                </div>
            </div>}

            {selectedAnimation === "Particles Canvas" && <div key="PracticlesCanvas">
                <h3 className='subheading'>Mousemove Particles Canvas</h3>
                <div className='animation'>
                    <ParticlesCanvas />
                </div>
            </div>}

            {selectedAnimation === "Particle Text" && <div key="ParticleText">
                <h3 className='subheading'>Particle Text</h3>
                <div className='animation'>
                    <ParticleText />
                </div>
            </div>}

            {selectedAnimation === "Pixel Rain" && <div key="PixelRain">
                <h3 className='subheading'>Pixel Rain</h3>
                <div className='animation'>
                    <PixelRain />
                </div>
            </div>}
        </Wrapper>
    )
}

export default CanvasAnimation