import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import Accordion from "../../components/projects/accordion";
import Avataar from "../../components/projects/avataar";
import Calculator from "../../components/projects/calculator";
import Calendar from "../../components/projects/calendar";
import CanvasAnimation from "../../components/projects/canvasAnimation";
import ConvertMetrics from "../../components/projects/convertMetrics";
import Dictionary from "../../components/projects/dictionary";
import DigitalClock from "../../components/projects/digitalClock";
import DynamicTables from "../../components/projects/dynamicTables";
import GithubProfileFinder from "../../components/projects/githubProfileFinder";
import HtmlColors from "../../components/projects/htmlColors";
import ImageSlider from "../../components/projects/imageSlider";
import JokesGenerator from "../../components/projects/jokesGenerator";
import LanguageTranslator from "../../components/projects/languageTranslator";
import LeetSpeak from "../../components/projects/leetSpeak";
import LyricsFinder from "../../components/projects/lyricsFinder";
import MemesGenerator from "../../components/projects/memesGenerator";
import ModalComponent from "../../components/projects/modalComponent";
import MovieSearch from "../../components/projects/movieSearch";
import MovieTrailer from "../../components/projects/movieTrailer";
import MuiForm from "../../components/projects/muiForm";
import PaintApp from "../../components/projects/paintApp";
import PasswordGenerator from "../../components/projects/passwordGenerator";
import QrcodeGenerator from "../../components/projects/qrcodeGenerator";
import QuizApp from "../../components/projects/quizApp";
import RandomQuotes from "../../components/projects/randomQuotes";
import RockPaperScissor from "../../components/projects/rockPaperScissor";
import ScrollProgressIndicator from "../../components/projects/scrollProgressIndicator";
import ScrollTo from "../../components/projects/scrollTo";
import SearchAutoComplete from "../../components/projects/searchAutoComplete";
import Sorting from "../../components/projects/sorting";
import StarRating from "../../components/projects/starRating";
import Sudoku from "../../components/projects/sudoku";
import TaskScheduler from "../../components/projects/taskScheduler";
import TicTacToe from "../../components/projects/ticTacToe";
import ToDoList from "../../components/projects/toDoList";
import ToggleTheme from "../../components/projects/toggleTheme";
import UnicodeExplorer from "../../components/projects/unicodeExplorer";
import Validators from "../../components/projects/validators";
import WeatherApp from "../../components/projects/weatherApp";
import WorldTimeZones from "../../components/projects/worldTimeZones";

const Projects = () => {
    const { uri } = useParams();

    const componentsMap = {
        "accordion": <Accordion />,
        "avataar": <Avataar />,
        "calculator": <Calculator />,
        "calendar": <Calendar />,
        "canvas-animation": <CanvasAnimation />,
        "convert-metrics": <ConvertMetrics />,
        "dictionary": <Dictionary />,
        "digital-clock": <DigitalClock />,
        "dynamic-tables": <DynamicTables />,
        "github-profile-finder": <GithubProfileFinder />,
        "html-colors": <HtmlColors />,
        "image-slider": <ImageSlider />,
        "jokes-generator": <JokesGenerator />,
        "language-translator": <LanguageTranslator />,
        "leet-speak": <LeetSpeak />,
        "lyrics-finder": <LyricsFinder />,
        "memes-generator": <MemesGenerator />,
        "modal-component": <ModalComponent />,
        "movie-search": <MovieSearch />,
        "movie-trailer": <MovieTrailer />,
        "mui-form": <MuiForm />,
        "paint-app": <PaintApp />,
        "password-generator": <PasswordGenerator />,
        "qr-code-generator": <QrcodeGenerator />,
        "quiz-app": <QuizApp />,
        "random-quotes": <RandomQuotes />,
        "rock-paper-scissor": <RockPaperScissor />,
        "scroll-progress-indicator": <ScrollProgressIndicator />,
        "scroll-to": <ScrollTo />,
        "search-auto-complete": <SearchAutoComplete />,
        "sorting": <Sorting />,
        "star-rating": <StarRating />,
        "sudoku": <Sudoku />,
        "task-scheduler": <TaskScheduler />,
        "tic-tac-toe": <TicTacToe />,
        "to-do-list": <ToDoList />,
        "toggle-theme": <ToggleTheme />,
        "unicode-explorer": <UnicodeExplorer />,
        "validators": <Validators />,
        "weather-app": <WeatherApp />,
        "world-time-zones": <WorldTimeZones />,
    };

    const ComponentToRender = componentsMap[uri];

    return (
        <Suspense fallback={
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        }>
            {ComponentToRender || <h2 style={{ color: "red", textAlign: "center" }}>Project "{uri}" Not Found</h2>}
        </Suspense>
    );
};

export default Projects;
