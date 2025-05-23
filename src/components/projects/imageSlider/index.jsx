import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";

// Styled Components
const Container = styled.div`
  padding: 40px;
`;

const Main = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const AutoPlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;

const SliderContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  transform: translateX(${(props) => props.$translate}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
`;

const NextButton = styled(NavButton)`
  right: 20px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 8px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#333" : "#ccc")};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999;
  }
`;

// Component
const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);

    // Sample images
    const slides = [
        { id: 1018, text: "1" },
        { id: 1015, text: "2" },
        { id: 1019, text: "3" },
        { id: 1016, text: "4" },
        { id: 1020, text: "5" },
    ];

    const totalSlides = slides.length;

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        let intervalId;
        if (autoPlay) {
            intervalId = setInterval(goToNextSlide, 3000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [autoPlay, currentSlide]);

    return (
        <Container>
            <Main>
                <Title>Image Slider</Title>

                <AutoPlayContainer>
                    <input
                        id="imageSliderAutoPlay"
                        type="checkbox"
                        checked={autoPlay}
                        onChange={() => setAutoPlay(!autoPlay)}
                    />
                    <label htmlFor="imageSliderAutoPlay">Auto play</label>
                </AutoPlayContainer>

                <SliderContainer>
                    <SliderWrapper>
                        <Slider $translate={-100 * currentSlide}>
                            {slides.map((slide, index) => (
                                <Slide
                                    key={slide.id}
                                    style={{
                                        backgroundImage: `url(https://picsum.photos/500/450?random=${slide.id})`,
                                    }}
                                >
                                    <span>{slide.text}</span>
                                </Slide>
                            ))}
                        </Slider>

                        <PrevButton onClick={goToPrevSlide} disabled={autoPlay}>
                            <GrPrevious />
                        </PrevButton>
                        <NextButton onClick={goToNextSlide} disabled={autoPlay}>
                            <GrNext />
                        </NextButton>
                    </SliderWrapper>

                    <DotsContainer>
                        {slides.map((_, index) => (
                            <Dot
                                key={index}
                                $active={index === currentSlide}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </DotsContainer>
                </SliderContainer>
            </Main>
        </Container>
    );
};

export default ImageSlider;