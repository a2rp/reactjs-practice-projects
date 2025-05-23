import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

// Styled Components
const Container = styled.div`
    padding: 30px;
`;

const Main = styled.div`
    max-width: 500px;
    margin: auto;
    text-align: center;
`;

const Heading = styled.h2`
    margin-bottom: 20px;
`;

const StarsContainer = styled.div`
    margin: 20px 0;
`;

const StarsList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 0;
`;

const StarItem = styled.li`
    font-size: 32px;
    cursor: pointer;
    transition: color 0.2s ease;
    color: ${({ $filled }) => ($filled ? "gold" : "#ccc")};
    
    &:hover {
        transform: scale(1.1);
    }
`;

const RatingValue = styled.div`
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
`;

const StarRating = () => {
    const [hoverValue, setHoverValue] = useState(0);
    const [clickedRatingValue, setClickedRatingValue] = useState(0);

    const handleMouseOver = (index) => setHoverValue(index);
    const handleMouseOut = () => setHoverValue(0);
    const handleClick = (index) => setClickedRatingValue(index);

    const getFill = (index) => {
        if (hoverValue >= index) return true;
        if (!hoverValue && clickedRatingValue >= index) return true;
        return false;
    };

    return (
        <Container>
            <Main>
                <Heading>Star Rating System</Heading>
                <StarsContainer>
                    <StarsList onMouseLeave={handleMouseOut}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <StarItem
                                key={index}
                                $filled={getFill(index)}
                                onMouseOver={() => handleMouseOver(index)}
                                onClick={() => handleClick(index)}
                                role="button"
                                aria-label={`Rate ${index} out of 5`}
                                tabIndex="0"
                            >
                                <FaStar />
                            </StarItem>
                        ))}
                    </StarsList>
                    <RatingValue>Rating: {clickedRatingValue}/5</RatingValue>
                </StarsContainer>
            </Main>
        </Container>
    );
};

export default StarRating;