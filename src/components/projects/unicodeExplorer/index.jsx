import React, { useEffect, useRef, useState } from "react";
import { Styled } from "./styled";
import { unicodeGroups } from "./unicode_list";
import { FaCopy, FaCheck } from "react-icons/fa";

const UnicodeExplorer = () => {
    const [ranges, setRanges] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [currentRangeIndex, setCurrentRangeIndex] = useState(0);
    const [charList, setCharList] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [copied, setCopied] = useState(null);
    const charListRef = useRef(null);

    useEffect(() => {
        const parsed = unicodeGroups.map((entry) => {
            const [range, name] = entry.split(" -- ");
            const [from, to] = range.split("-").map((hex) => parseInt(hex, 16));
            return { range, name, from, to };
        });
        setRanges(parsed);
        setStartIndex(parsed[0].from);
    }, []);

    const loadNextCharacters = () => {
        const current = ranges[currentRangeIndex];
        if (!current) return;
        const end = Math.min(startIndex + 16, current.to + 1);
        const newChars = [];

        for (let i = startIndex; i < end; i++) {
            newChars.push(i);
        }

        const userIsNearBottom =
            charListRef.current &&
            charListRef.current.scrollHeight -
                charListRef.current.scrollTop -
                charListRef.current.clientHeight <
                100;

        setCharList((prev) => [
            ...prev,
            { title: current.name, items: newChars },
        ]);
        setStartIndex(end);

        setTimeout(() => {
            if (userIsNearBottom && charListRef.current) {
                charListRef.current.scrollTo({
                    top: charListRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
        }, 0);
    };

    const handleRangeChange = (e) => {
        const index = e.target.value;
        const newStart = ranges[index].from;
        setCurrentRangeIndex(index);
        setStartIndex(newStart);
        setCharList([]);
        setModalData(null);
    };

    const handleCharClick = (code) => {
        const hex = code.toString(16).toUpperCase();
        const oct = code.toString(8);
        setModalData({
            char: `&#${code};`,
            html: String.fromCharCode(code),
            unicode: `U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
            oct: `\\${oct.padStart(3, "0")}`,
            hex: `0x${hex}`,
        });
        setCopied(null);
    };

    const handleCopy = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    };

    const closeModal = () => {
        setModalData(null);
        setCopied(null);
    };

    return (
        <Styled.Wrapper>
            <h3>Unicode Explorer</h3>
            <Styled.Controls>
                <Styled.RangeSelect onChange={handleRangeChange}>
                    {ranges.map((r, idx) => (
                        <option key={r.range} value={idx}>
                            [{r.range}] - {r.name} (Total {r.to - r.from + 1})
                        </option>
                    ))}
                </Styled.RangeSelect>

                <Styled.NextRowButton onClick={loadNextCharacters}>
                    Load Next Row Content
                </Styled.NextRowButton>
            </Styled.Controls>

            <Styled.CharListWrapper ref={charListRef}>
                {charList.map((group, idx) => (
                    <Styled.Char key={idx}>
                        <Styled.Title>{group.title}</Styled.Title>
                        <Styled.CharGrid>
                            {group.items.map((code) => (
                                <Styled.CharBox
                                    key={code}
                                    onClick={() => handleCharClick(code)}
                                >
                                    {String.fromCharCode(code)}
                                    <Styled.CharIndex>{code}</Styled.CharIndex>
                                </Styled.CharBox>
                            ))}
                        </Styled.CharGrid>
                        <hr />
                    </Styled.Char>
                ))}
            </Styled.CharListWrapper>

            {modalData && (
                <Styled.ModalOverlay onClick={closeModal}>
                    <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
                        <Styled.CloseButton onClick={closeModal}>
                            &times;
                        </Styled.CloseButton>

                        <div
                            style={{
                                fontSize: "40px",
                                marginBottom: "20px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            title="Click to copy character"
                            onClick={() => handleCopy(modalData.html, "char")}
                        >
                            {modalData.html}
                        </div>

                        <Styled.Deduction>
                            <span>
                                HTML Entity: <code>{modalData.char}</code>
                            </span>
                            <Styled.CopyButton
                                onClick={() =>
                                    handleCopy(modalData.char, "char")
                                }
                            >
                                {copied === "char" ? <FaCheck /> : <FaCopy />}
                            </Styled.CopyButton>
                        </Styled.Deduction>

                        <Styled.Deduction>
                            <span>
                                Unicode Codepoint:{" "}
                                <code>{modalData.unicode}</code>
                            </span>
                            <Styled.CopyButton
                                onClick={() =>
                                    handleCopy(modalData.unicode, "unicode")
                                }
                            >
                                {copied === "unicode" ? (
                                    <FaCheck />
                                ) : (
                                    <FaCopy />
                                )}
                            </Styled.CopyButton>
                        </Styled.Deduction>

                        <Styled.Deduction>
                            <span>
                                Octal: <code>{modalData.oct}</code>
                            </span>
                            <Styled.CopyButton
                                onClick={() => handleCopy(modalData.oct, "oct")}
                            >
                                {copied === "oct" ? <FaCheck /> : <FaCopy />}
                            </Styled.CopyButton>
                        </Styled.Deduction>

                        <Styled.Deduction>
                            <span>
                                Hexadecimal: <code>{modalData.hex}</code>
                            </span>
                            <Styled.CopyButton
                                onClick={() => handleCopy(modalData.hex, "hex")}
                            >
                                {copied === "hex" ? <FaCheck /> : <FaCopy />}
                            </Styled.CopyButton>
                        </Styled.Deduction>
                    </Styled.ModalContent>
                </Styled.ModalOverlay>
            )}
        </Styled.Wrapper>
    );
};

export default UnicodeExplorer;
