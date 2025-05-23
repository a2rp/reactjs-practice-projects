import React, { useRef } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    padding: 30px;
    height: 100vh;
    overflow-y: auto;
`;

const Main = styled.div`
    max-width: 800px;
    margin: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const ScrollButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 30px;
    justify-content: center;

    button {
        padding: 10px 15px;
        font-size: 14px;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background: #0d47a1;
        }
    }
`;

const Section = styled.div`
    height: 400px;
    background-color: #f0f0f0;
    margin: 20px 0;
    border-radius: 8px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ScrollTo = () => {
    const sectionARef = useRef(null);
    const sectionBRef = useRef(null);
    const sectionCRef = useRef(null);
    const sectionDRef = useRef(null);
    const sectionERef = useRef(null);
    const sectionFRef = useRef(null);

    return (
        <Container>
            <Main>
                <Heading>Scroll To</Heading>

                <ScrollButtonsContainer>
                    <button
                        onClick={() =>
                            sectionARef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section A
                    </button>
                    <button
                        onClick={() =>
                            sectionBRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section B
                    </button>
                    <button
                        onClick={() =>
                            sectionCRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section C
                    </button>
                    <button
                        onClick={() =>
                            sectionDRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section D
                    </button>
                    <button
                        onClick={() =>
                            sectionERef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section E
                    </button>
                    <button
                        onClick={() =>
                            sectionFRef.current.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Scroll to Section F
                    </button>
                </ScrollButtonsContainer>

                <Section ref={sectionARef}>Section A</Section>
                <Section ref={sectionBRef}>Section B</Section>
                <Section ref={sectionCRef}>Section C</Section>
                <Section ref={sectionDRef}>Section D</Section>
                <Section ref={sectionERef}>Section E</Section>
                <Section ref={sectionFRef}>Section F</Section>
            </Main>
        </Container>
    );
};

export default ScrollTo;
