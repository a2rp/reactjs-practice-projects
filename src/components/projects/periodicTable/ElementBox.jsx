import { Tooltip as ReactTooltip } from "react-tooltip";
import React from "react";
import { Box } from "./styled";

const ElementBox = ({ element, style }) => {
    const { symbol, name, atomicNumber, atomicWeight, category } = element;
    const tooltipId = `tooltip-${atomicNumber}`;
    const tooltipHtml = `
    <strong>${name}</strong><br/>
    Atomic No: ${atomicNumber}<br/>
    Weight: ${atomicWeight}
  `;

    return (
        <>
            <Box
                className={category}
                style={style}
                data-tooltip-id={tooltipId}
                data-tooltip-html={tooltipHtml}
            >
                <strong>{symbol}</strong>
                <span>{atomicNumber}</span>
            </Box>
            {/* <ReactTooltip id={tooltipId} place="top" variant="light" /> */}
            <ReactTooltip
                id={tooltipId}
                place="top"
                strategy="fixed"
                positionStrategy="absolute" // try removing if causing issues
                className="custom-tooltip"
                style={{ zIndex: 9999 }}
            />
        </>
    );
};

export default ElementBox;
