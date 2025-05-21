import React, { Suspense, useEffect, useState } from 'react'
import { Footer, Header, Main, Nav, Wrapper } from './App.styled'
import { IoMenu } from "react-icons/io5";
import { lazyComponentMap } from './components/lazyComponents';
import LenisProvider from './components/LenisProvider';

const projectList = [
    { name: "accordion", displayName: "Accordion" },
    { name: "avataar", displayName: "Avataar" },
    { name: "calculator", displayName: "Calculator" },
    { name: "calendar", displayName: "Calendar" },
    { name: "canvas-animation", displayName: "Canvas Animation" },
    { name: "convert-metrics", displayName: "Convert Metrics" },
    { name: "dictionary", displayName: "Dictionary" },
    { name: "digital-clock", displayName: "Digital Clock" },
    { name: "dynamic-tables", displayName: "Dynamic Tables" },
    { name: "github-profile-finder", displayName: "GitHub Profile Finder" },
    { name: "html-colors", displayName: "HTML Colors" },
    { name: "image-slider", displayName: "Image Slider" },
    { name: "jokes-generator", displayName: "Jokes Generator" },
    { name: "language-translator", displayName: "Language Translator" },
    { name: "leet-speak", displayName: "Leet Speak" },
    { name: "lyrics-finder", displayName: "Lyrics Finder" },
    { name: "memes-generator", displayName: "Memes Generator" },
    { name: "modal-component", displayName: "Modal Component" },
    { name: "movie-search", displayName: "Movie Search" },
    { name: "movie-trailer", displayName: "Movie Trailer" },
    { name: "mui-form", displayName: "MUI Form" },
    { name: "paint-app", displayName: "Paint App" },
    { name: "password-generator", displayName: "Password Generator" },
    { name: "periodic-table", displayName: "Periodic Table" },
    { name: "qrcode-generator", displayName: "QR Code Generator" },
    { name: "quiz-app", displayName: "Quiz App" },
    { name: "random-quotes", displayName: "Random Quotes" },
    { name: "rock-paper-scissor", displayName: "Rock Paper Scissor" },
    { name: "scroll-progress-indicator", displayName: "Scroll Progress Indicator" },
    { name: "scroll-to", displayName: "Scroll To" },
    { name: "search-auto-complete", displayName: "Search Auto Complete" },
    { name: "sorting", displayName: "Sorting" },
    { name: "star-rating", displayName: "Star Rating" },
    { name: "sudoku", displayName: "Sudoku" },
    { name: "task-scheduler", displayName: "Task Scheduler" },
    { name: "tic-tac-toe", displayName: "Tic Tac Toe" },
    { name: "to-do-list", displayName: "To Do List" },
    { name: "toggle-theme", displayName: "Toggle Theme" },
    { name: "typing-keyboard", displayName: "Typing Keyboard" },
    { name: "unicode-explorer", displayName: "Unicode Explorer" },
    { name: "validators", displayName: "Validators" },
    { name: "weather-app", displayName: "Weather App" },
    { name: "word-meaning", displayName: "Word Meaning" },
    { name: "world-map", displayName: "World Map" },
    { name: "world-time-zones", displayName: "World Time Zones" }
];

const App = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(toggleMenu => !toggleMenu);
    };


    useEffect(() => {
        if (toggleMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            const timeout = setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [toggleMenu]);

    const SelectedComponent = selectedProject ? lazyComponentMap[selectedProject] : null;

    return (
        <Wrapper>
            <LenisProvider />
            <Header>
                <div className='name'>ReactJS Practice Projects</div>
                <div className='menu_link' onClick={handleToggleMenu}>
                    <IoMenu color={"white"} size={32} />
                </div>
            </Header>

            <Nav className={`${toggleMenu ? "active" : ""}`}>
                <div className='emptySection' onClick={handleToggleMenu}>click here to close</div>
                <div className='menuWrapper'>
                    {projectList.map((item, index) => (<div className='item' key={index}
                        onClick={() => {
                            setSelectedProject(item.name);
                            setToggleMenu(false);
                        }}
                    >
                        {item.displayName}
                    </div>))}
                </div>
            </Nav>

            <Main>
                <Suspense fallback={<div style={{ color: "gray" }}>Loading...</div>}>
                    {SelectedComponent ? <SelectedComponent /> : <div style={{ color: 'gray' }}>Please select a project.</div>}
                </Suspense>
            </Main>


            <Footer>
                <div>
                    &copy; {new Date().getFullYear()}. All rights reserved.
                </div>
                <div>Coded by <a href="https://www.ashishranjan.net">Ashish Ranjan</a></div>
            </Footer>
        </Wrapper>
    )
}

export default App
