import React from "react";
import styled from "styled-components";
import Generator from "./Generator";
import ImageScanner from "./ImageScanner";

const Container = styled.div`
    padding: 30px;
`;

const Main = styled.div`
    max-width: 900px;
    margin: auto;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`;

const GeneratorScannerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const QrCode = () => {
    return (
        <Container>
            <Main>
                <Title>QR Code</Title>
                <GeneratorScannerContainer>
                    <Generator />
                    <ImageScanner />
                </GeneratorScannerContainer>
            </Main>
        </Container>
    );
};

export default QrCode;
