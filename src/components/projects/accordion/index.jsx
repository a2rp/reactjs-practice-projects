import React, { useState, useRef, useEffect } from "react";
import qnaList from "./qna.json";
import { Styled } from "./styled";


const AccordionItem = ({ item, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        if (isOpen) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);


    return (
        <Styled.QnaItem>
            <Styled.QuestionButton
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`answer-${item.id}`}
            >
                {item.question}
                <Styled.PlusMinusIcon $isOpen={isOpen} aria-hidden="true" />
            </Styled.QuestionButton>


            <Styled.AnswerWrapper
                id={`answer-${item.id}`}
                role="region"
                style={{ height: `${height}px` }}
            >
                <Styled.AnswerContent ref={contentRef}>
                    {item.answer}
                </Styled.AnswerContent>
            </Styled.AnswerWrapper>
        </Styled.QnaItem>
    );
};


const Accordion = () => {
    const [allowMulti, setAllowMulti] = useState(false);
    const [activeItems, setActiveItems] = useState(new Set());


    const toggleItem = (id) => {
        setActiveItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                if (!allowMulti) newSet.clear();
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <Styled.Wrapper>
            <Styled.Main>
                <Styled.Title>Accordion</Styled.Title>

                <Styled.ToggleContainer>
                    <Styled.ToggleInput
                        type="checkbox"
                        id="multiToggle"
                        checked={allowMulti}
                        onChange={() => setAllowMulti((prev) => !prev)}
                        aria-label="Enable multiple open items"
                    />
                    <Styled.ToggleLabel htmlFor="multiToggle">
                        Enable multiple open items
                    </Styled.ToggleLabel>
                </Styled.ToggleContainer>

                <Styled.QnaList role="list">
                    {qnaList.map((item) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            isOpen={activeItems.has(item.id)}
                            onClick={() => toggleItem(item.id)}
                        />
                    ))}
                </Styled.QnaList>
            </Styled.Main>
        </Styled.Wrapper>
    );
};


export default Accordion;