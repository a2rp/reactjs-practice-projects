import { Navigate, Route, Routes } from 'react-router-dom'
import styled from "styled-components";
import Header from './components/header'
import Footer from './components/footer'
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./pages/home'));
const Projects = lazy(() => import('./pages/projects'));
const NotFound = lazy(() => import('./pages/notFound'));

const App = () => {
    return (
        <>
            <Header />
            <Main>
                <Suspense fallback={<Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Navigate to="/" />} />
                        <Route path="/project/:uri" element={<Projects />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Main>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default App;

export const Main = styled.main`
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: none;
    max-width: 1440px;
    margin: auto;
    min-height: 100vh;
    padding: 60px 50px;
    /* color: #aaa; */
    /* background-color: rgb(24, 24, 24); */
    /* background-color: rgb(238, 232, 246); */

    @media (width<500px) {
        padding: 100px 15px;
    }
`;
