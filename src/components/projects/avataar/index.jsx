import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { FaCopy } from "react-icons/fa";
import parse from "html-react-parser";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import avataarStyle from "./avataarStyles";
import { Styled } from "./styled";

const RandomAvataars = () => {
    const [svg, setSvg] = useState("");
    const [selectedStyleId, setSelectedStyleId] = useState(avataarStyle[0].id);
    const [seed, setSeed] = useState(0);

    useEffect(() => {
        if (selectedStyleId) {
            nextAvataar();
        }
    }, [selectedStyleId]);

    const getSelectedStyle = () => {
        return avataarStyle.find(item => item.id === selectedStyleId)?.style;
    };

    const nextAvataar = () => {
        const style = getSelectedStyle();
        if (!style) return;

        const seedValue = Math.floor(Math.random() * 10000);
        setSeed(seedValue);

        const avatar = createAvatar(style, { seed: seedValue });
        const value = avatar.toString();
        setSvg(value);
    };

    const downloadAvataar = () => {
        const style = getSelectedStyle();
        if (!style) return;

        const avatar = createAvatar(style, { seed });
        const svgString = avatar.toString();

        const svgBlob = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
        });

        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "avatar.png";
            link.href = pngUrl;
            link.click();
        };
        img.src = url;
    };

    const handleCopyIconClick = () => {
        copy(svg);
        toast.info("Copied SVG");
    };

    return (
        <Styled.Wrapper>
            <Styled.Heading>Random Avataars</Styled.Heading>

            <Styled.ImageContainer>
                <Styled.MainImageWrapper>
                    <Styled.SvgWrapper>{parse(svg)}</Styled.SvgWrapper>
                </Styled.MainImageWrapper>
            </Styled.ImageContainer>

            <Styled.SelectNextWrapper>
                <Styled.Select
                    id="avataar-style-select"
                    value={selectedStyleId}
                    onChange={(e) => {
                        const id = parseInt(e.target.value);
                        if (!isNaN(id)) {
                            setSelectedStyleId(id);
                        }
                    }}
                >
                    {avataarStyle.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Styled.Select>
                <Styled.Button onClick={nextAvataar}>Next</Styled.Button>
            </Styled.SelectNextWrapper>

            <Styled.ButtonsContainer>
                <Styled.Button onClick={downloadAvataar}>Download Image</Styled.Button>
                <Styled.Button onClick={handleCopyIconClick}>Copy Image as SVG</Styled.Button>
            </Styled.ButtonsContainer>
        </Styled.Wrapper>
    );
};

export default RandomAvataars;
