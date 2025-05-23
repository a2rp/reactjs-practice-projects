import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #f00; */
        /* padding: 2rem; */
        /* background-color: #000; */
    `,
    Main: styled.main`
        max-width: 800px;
        margin: 0 auto;
        border-radius: 12px;
        padding: 2rem;
    `,

    Title: styled.h1`
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        font-weight: 600;
    `,

    // toggle
    ToggleContainer: styled.div`
        /* border: 1px solid rgba(255, 255, 255, 0.1); */
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        padding: 0.75rem;
        /* background: #f1f5f9; */
        border-radius: 8px;
    `,

    ToggleLabel: styled.label`
        font-size: 0.875rem;
        cursor: pointer;
        user-select: none;
    `,

    ToggleInput: styled.input`
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
    `,

    QnaList: styled.ul`
        /* border: 1px solid rgba(255, 0, 0, 1); */

        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        list-style: none;
        padding: 0;
        margin: 0;
    `,

    QnaItem: styled.li`
        /* border: 1px solid #aaa; */
        border: 1px solid rgba(255, 255, 255, 0.2);

        border-radius: 8px;
        overflow: hidden;
        transition: all 0.2s ease;
    `,

    QuestionButton: styled.div`
        width: 100%;
        padding: 1rem 1.25rem;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
        transition: background-color 0.2s ease;
        background-color: #111;

        &:hover {
            background-color: #222;
            color: #aaa;
        }
    `,

    PlusMinusIcon: styled.span`
        position: relative;
        width: 1rem;
        height: 1rem;

        &::before,
        &::after {
            content: "";
            position: absolute;
            background-color: #64748b;
            transition: all 0.3s ease;
        }

        &::before {
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            transform: translateY(-50%);
        }

        &::after {
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            transform: translateX(-50%);
            opacity: ${(props) => (props.$isOpen ? "0" : "1")};
        }
    `,

    AnswerWrapper: styled.div`
        overflow: hidden;
        transition: height 0.3s ease;
    `,

    AnswerContent: styled.div`
        padding: 0 1.25rem 1rem;
        line-height: 1.6;
        animation: ${fadeIn} 0.3s ease forwards;
    `,
};
