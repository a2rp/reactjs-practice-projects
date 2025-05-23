import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";

// Global styles for theming
const GlobalStyle = createGlobalStyle`
  body[data-theme="dark"] {
    background-color: #121212;
    color: #f5f5f5;
  }
  body[data-theme="light"] {
    background-color: #ffffff;
    color: #333;
  }
`;

const Container = styled.div`
    padding: 30px;
    transition: all 0.3s ease;
`;

const Main = styled.div`
    max-width: 600px;
    margin: auto;
    text-align: center;
`;

const Heading = styled.h2`
    margin-bottom: 20px;
`;

const ThemeLabel = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    color: ${({ theme }) => (theme === "dark" ? "#f1c40f" : "#2980b9")};
`;

const ToggleButton = styled.input`
    margin: 20px auto;
    display: block;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
`;

const ThemeIconContainer = styled.div`
    font-size: 50px;
    margin-top: 20px;
    color: ${({ theme }) => (theme === "dark" ? "#f1c40f" : "#2980b9")};
`;

const ToggleTheme = () => {
    const [theme, setTheme] = useState(
        () => window.localStorage.getItem("toggle-theme") || "light"
    );

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        window.localStorage.setItem("toggle-theme", newTheme);
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <Main>
                    <Heading>
                        Toggle theme using <code>data-theme</code>
                        <ThemeLabel theme={theme}>{theme}</ThemeLabel>
                    </Heading>

                    <ToggleButton
                        type="button"
                        value="Toggle theme"
                        onClick={handleToggleTheme}
                    />

                    <ThemeIconContainer theme={theme}>
                        {theme === "dark" ? <FaMoon /> : <CiSun />}
                    </ThemeIconContainer>
                </Main>
            </Container>
        </>
    );
};

export default ToggleTheme;
