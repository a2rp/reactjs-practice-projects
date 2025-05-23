import React, { useEffect, useState } from "react";
import {
    ColorsList,
    ControlsSection,
    DisplaySection,
    Heading,
    Main,
    Wrapper,
} from "./styled";
import { FaRegCopy } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { colors } from "./predefined_color_names";
import { toast } from "react-toastify";

const HtmlColors = () => {
    const [color, setColor] = useState(null);
    const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
    const [alpha, setAlpha] = useState(1);
    const [history, setHistory] = useState([]);
    const [hexInput, setHexInput] = useState("");

    useEffect(() => {
        if (color?.hex) setHexInput(color.hex);
    }, [color]);

    useEffect(() => {
        if (color && !color.name.startsWith("Custom")) {
            setHistory((prev) => {
                const exists = prev.find((c) => c.hex === color.hex);
                if (exists) return prev;
                return [color, ...prev.slice(0, 9)];
            });
        }
    }, [color]);

    useEffect(() => {
        if (color) {
            setHistory((prev) => {
                const exists = prev.find((c) => c.hex === color.hex);
                if (exists) return prev;
                return [color, ...prev.slice(0, 9)];
            });
        }
    }, [color]);

    const handleColorNameClick = (color) => {
        setColor(color);

        const hex = color.hex.replace("#", "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        setRgb({ r, g, b });
    };

    const handleSliderChange = (channel, value) => {
        const newRgb = { ...rgb, [channel]: parseInt(value) };
        setRgb(newRgb);

        const hex = `#${(
            (1 << 24) +
            (newRgb.r << 16) +
            (newRgb.g << 8) +
            newRgb.b
        )
            .toString(16)
            .slice(1)
            .toUpperCase()}`;

        const colorName =
            getColorNameFromHex(hex) ||
            `Custom (${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;

        setColor({
            name: colorName,
            hex: hex,
        });
    };

    const getColorNameFromHex = (hex) => {
        const found = colors.find(
            (c) => c.hex.toUpperCase() === hex.toUpperCase()
        );
        return found ? found.name : null;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast("Copied: " + text);
    };

    const getContrastColor = () => {
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128 ? "#000" : "#FFF";
    };

    return (
        <>
            <Wrapper>
                <Main>
                    <Heading>HTML Colors</Heading>
                    <ControlsSection>
                        <ColorsList>
                            <ul>
                                {colors.map((color, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleColorNameClick(color)
                                        }
                                    >
                                        {color.name}
                                        <span
                                            className="color"
                                            style={{
                                                backgroundColor: `${color.name}`,
                                            }}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        </ColorsList>
                        <DisplaySection>
                            {color ? (
                                <>
                                    <h1 className="color_name">{color.name}</h1>
                                    <p className="hex_code">
                                        <strong>Hex Code: {color.hex}</strong>
                                        <FaRegCopy
                                            title="copy"
                                            className="icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                copyToClipboard(color?.hex)
                                            }
                                        />
                                    </p>
                                    <p className="rgb_color">
                                        <strong>
                                            RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})
                                        </strong>
                                        <FaRegCopy
                                            title="copy"
                                            className="icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                copyToClipboard(
                                                    `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                                                )
                                            }
                                        />
                                    </p>
                                    <div
                                        className="selected_color"
                                        style={{
                                            backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                                        }}
                                    >
                                        <span>Selected Color</span>
                                    </div>

                                    <div className="slider_wrapper">
                                        <label>
                                            Red: {rgb.r}
                                            <input
                                                type="range"
                                                min="0"
                                                max="255"
                                                value={rgb.r}
                                                onChange={(e) =>
                                                    handleSliderChange(
                                                        "r",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>

                                        <label>
                                            Green: {rgb.g}
                                            <input
                                                type="range"
                                                min="0"
                                                max="255"
                                                value={rgb.g}
                                                onChange={(e) =>
                                                    handleSliderChange(
                                                        "g",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>

                                        <label>
                                            Blue: {rgb.b}
                                            <input
                                                type="range"
                                                min="0"
                                                max="255"
                                                value={rgb.b}
                                                onChange={(e) =>
                                                    handleSliderChange(
                                                        "b",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </label>

                                        <label>
                                            Opacity: {Math.round(alpha * 100)}%
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={alpha}
                                                onChange={(e) =>
                                                    setAlpha(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <p>Please select a color to view details</p>
                            )}

                            <div
                                className="opaque_color"
                                style={{
                                    color: getContrastColor(),
                                    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`,
                                }}
                            >
                                <span>Color with opacity</span>
                            </div>

                            <h1 className="recent_colors">Recent</h1>
                            <div className="color_history">
                                {history.map((c, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleColorNameClick(c)}
                                        title={c.name}
                                        style={{
                                            backgroundColor: c.hex,
                                        }}
                                        className="color"
                                    />
                                ))}
                                <FaRegCopy
                                    title="copy"
                                    className="icon"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            JSON.stringify(history, null, 2)
                                        );
                                        toast(
                                            "Color palette copied to clipboard!"
                                        );
                                    }}
                                />
                            </div>

                            <div className="color_input_wrapper">
                                <span>Input #RRGGBB value</span>
                                <input
                                    className="color_input"
                                    type="text"
                                    value={hexInput}
                                    placeholder="#RRGGBB"
                                    style={{
                                        borderColor: /^#[0-9A-F]{6}$/i.test(
                                            hexInput
                                        )
                                            ? "#ccc"
                                            : "#000",
                                    }}
                                    onChange={(e) => {
                                        const hex = e.target.value;
                                        setHexInput(hex);
                                        if (/^#[0-9A-F]{6}$/i.test(hex)) {
                                            const bigint = parseInt(
                                                hex.slice(1),
                                                16
                                            );
                                            const r = (bigint >> 16) & 255;
                                            const g = (bigint >> 8) & 255;
                                            const b = bigint & 255;
                                            setRgb({ r, g, b });

                                            const colorName =
                                                getColorNameFromHex(hex) ||
                                                `Custom (${r}, ${g}, ${b})`;
                                            setColor({ name: colorName, hex });
                                        }
                                    }}
                                />
                            </div>
                        </DisplaySection>
                    </ControlsSection>
                </Main>
            </Wrapper>
        </>
    );
};

export default HtmlColors;
