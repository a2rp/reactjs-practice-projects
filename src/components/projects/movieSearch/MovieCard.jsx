import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    display: flex;
    gap: 20px;
    border-radius: 10px;
    background: #fafafa;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const ImageContainer = styled.div`
    width: 120px;
    flex-shrink: 0;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 8px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
`;

const InfoRow = styled.div`
    margin: 4px 0;
    display: flex;
`;

const Key = styled.span`
    font-weight: bold;
    margin-right: 5px;
    min-width: 80px;
`;

const Value = styled.span`
    color: #555;
`;

const Summary = styled.div`
    margin-top: 10px;
    color: #666;
    font-size: 14px;
    line-height: 1.4;
`;

const MovieCard = (props) => {
    // Remove HTML tags from summary
    const cleanSummary = props.Summary?.replace(/<[^>]*>?/gm, '') || 'No description available';

    return (
        <Container>
            <ImageContainer>
                <Image src={props.Poster} alt={props.Title} />
            </ImageContainer>
            <TextContainer>
                <InfoRow>
                    <Key>Title:</Key>
                    <Value>{props.Title}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>Year:</Key>
                    <Value>{props.Year}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>Type:</Key>
                    <Value>{props.Type}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>Status:</Key>
                    <Value>{props.Status}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>Rating:</Key>
                    <Value>{props.Rating || 'N/A'}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>Genres:</Key>
                    <Value>{props.Genres?.join(', ') || 'N/A'}</Value>
                </InfoRow>
                <InfoRow>
                    <Key>IMDb ID:</Key>
                    <Value>{props.imdbID}</Value>
                </InfoRow>
                <Summary>{cleanSummary}</Summary>
            </TextContainer>
        </Container>
    );
};

export default MovieCard;