import React, { useEffect, useRef, useState } from "react";
import { Container, SvgInfo, SvgWrapper, ControlButton } from "./styled";
import mapSrc from "./map.svg";

const WorldMap = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [infoText, setInfoText] = useState(
        "a2rp: an Ashish Ranjan presentation"
    );
    const [viewBox, setViewBox] = useState({ x: 0, y: -5, w: 1000, h: 600 });
    const [countryCode, setCountryCode] = useState("IN");

    useEffect(() => {
        const svg = svgRef.current;
        const width = svg?.clientWidth || 1000;
        const height = (svg?.clientHeight || 600) + 200;
        setViewBox({ x: 0, y: -5, w: width, h: height });

        fetch("https://extreme-ip-lookup.com/json/")
            .then((res) => res.json())
            .then((response) => {
                setCountryCode(response.countryCode || "IN");
                setInfoText(
                    response.country === "India"
                        ? "The Republic of India"
                        : response.country
                );
            })
            .catch(() => console.log("IP fetch failed"));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!svgRef.current) return;
            const paths = svgRef.current.querySelectorAll("path.land");
            paths.forEach((path) => {
                if (path.id === "IN") path.style.fill = "#f67280";
                else if (path.id === countryCode) path.style.fill = "#00f";
                else path.style.fill = "#f00";
            });
        }, 1000 / 60);
        return () => clearInterval(interval);
    }, [countryCode]);

    const zoom = (factor) => {
        const newW = viewBox.w * factor;
        const newH = viewBox.h * factor;
        setViewBox((prev) => ({
            x: prev.x + (prev.w - newW) / 2,
            y: prev.y + (prev.h - newH) / 2,
            w: newW,
            h: newH,
        }));
    };

    const pan = (dx, dy) => {
        setViewBox((prev) => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy,
        }));
    };

    return (
        <Container>
            <SvgInfo>{infoText}</SvgInfo>

            <SvgWrapper ref={containerRef}>
                <object
                    id="map_svg"
                    ref={svgRef}
                    type="image/svg+xml"
                    data={mapSrc}
                    style={{ width: "100%", height: "100%" }}
                />
            </SvgWrapper>

            <ControlButton top="150px" onClick={() => zoom(0.95)}>
                ZOOM IN
            </ControlButton>
            <ControlButton top="200px" onClick={() => zoom(1.05)}>
                ZOOM OUT
            </ControlButton>
            <ControlButton top="250px" onClick={() => pan(10, 0)}>
                GO LEFT
            </ControlButton>
            <ControlButton top="300px" onClick={() => pan(-10, 0)}>
                GO RIGHT
            </ControlButton>
            <ControlButton top="350px" onClick={() => pan(0, 10)}>
                GO UP
            </ControlButton>
            <ControlButton top="400px" onClick={() => pan(0, -10)}>
                GO DOWN
            </ControlButton>
        </Container>
    );
};

export default WorldMap;
