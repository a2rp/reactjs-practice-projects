import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        padding: 1rem;
        max-width: 600px;
        margin: 0 auto;
    `,
    Heading: styled.div`
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    `,
    ImageContainer: styled.div`
        position: relative;
        padding: 1rem;
        border: 1px solid #ddd;
        margin-bottom: 2rem;
        border-radius: 8px;
        text-align: center;
    `,
    MainImageWrapper: styled.div`
        /* border: 1px solid #f00; */
        height: 300px;
    `,
    SvgWrapper: styled.div`
        width: 100%;
        height: 100%;

        svg {
            width: 100% !important;
            height: 100% !important;
        }
    `,

    // select next wrapper
    SelectNextWrapper: styled.div`
        display: flex;
        gap: 15px;
        align-items: flex-start;
        margin-bottom: 15px;

        @media (width<500px) {
            flex-wrap: wrap;
        }
    `,

    Select: styled.select`
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 100%;
        padding: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    `,
    Label: styled.label`
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    `,
    ButtonsContainer: styled.div`
        display: flex;
        gap: 1rem;

        @media (width<500px) {
            flex-wrap: wrap;
        }
    `,
    Button: styled.div`
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 100%;
        padding: 0.7rem;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        background-color: #000;
        color: white;
        text-align: center;

        &:hover {
            background-color: #444;
        }
    `,
};
