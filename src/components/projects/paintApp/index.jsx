import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Slider, TextField, Typography } from "@mui/material";

// Styled Components
const Container = styled.div`
    padding: 30px;
    background-color: #fff;
`;

const Main = styled.div`
    max-width: 1000px;
    margin: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin-bottom: 30px;
`;

const StyledTextField = styled(TextField)`
    width: 140px;
`;

const BrushControl = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
`;

const StyledButton = styled(Button)`
    height: 40px;
`;

const Canvas = styled.canvas`
    border: 1px solid #ccc;
    width: 100%;
    height: 500px;
    border-radius: 8px;
    cursor: crosshair;
`;

const PaintApp = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [first, setFirst] = useState(false);
    const [brushColor, setBrushColor] = useState("#000000");
    const [brushWidth, setBrushWidth] = useState(5);
    const [brushOpacity, setBrushOpacity] = useState(0.1);
    const [isDrawing, setIsDrawing] = useState(false);

    const handleBrushColorChange = (e) => setBrushColor(e.target.value);
    const handleBrushWidthChange = (e) => setBrushWidth(e.target.value);
    const handleBrushOpacityChange = (e) => setBrushOpacity(e.target.value);

    const valuetext = (value) => `Brush width - ${value}`;

    const init = () => {
        const canvas = canvasRef.current;
        if (!first) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            setFirst(true);
        }
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.globalAlpha = brushOpacity;
        context.strokeStyle = brushColor;
        context.lineWidth = brushWidth;
        contextRef.current = context;
    };

    useEffect(() => {
        init();
        window.addEventListener("resize", () => {
            setFirst(false);
            init();
        });
    }, [brushColor, brushWidth, brushOpacity]);

    const handleMouseDown = (e) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const handleMouseUp = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveAsImage = () => {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "canvas-image.png";
        link.href = url;
        link.click();
    };

    return (
        <Container>
            <Main>
                <Heading>Paint Application</Heading>

                <MenuContainer>
                    <StyledTextField
                        value={brushColor}
                        onChange={handleBrushColorChange}
                        type="color"
                        label={`Brush color: ${brushColor}`}
                    />

                    <BrushControl>
                        <Typography>Brush width: {brushWidth}</Typography>
                        <Slider
                            aria-label="Brush width"
                            value={brushWidth}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            min={1}
                            max={50}
                            step={1}
                            onChange={handleBrushWidthChange}
                        />
                    </BrushControl>

                    <BrushControl>
                        <Typography>Brush opacity: {brushOpacity}</Typography>
                        <Slider
                            aria-label="Brush opacity"
                            value={brushOpacity}
                            valueLabelDisplay="auto"
                            min={0.001}
                            max={1}
                            step={0.001}
                            onChange={handleBrushOpacityChange}
                        />
                    </BrushControl>

                    <StyledButton variant="contained" onClick={clearCanvas}>
                        Clear
                    </StyledButton>

                    <StyledButton variant="contained" onClick={saveAsImage}>
                        Save
                    </StyledButton>
                </MenuContainer>

                <Canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            </Main>
        </Container>
    );
};

export default PaintApp;
