import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        display: flex;
        justify-content: center;
        align-items: start;
        padding: 30px 15px;
        background-color: #000;
    `,

    Main: styled.div`
        /* border: 1px solid #fff; */
        width: 100%;
        max-width: 400px;
    `,

    Heading: styled.div`
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
    `,

    ControlsSection: styled.div`
        /* border: 1px solid #fff; */
        border-radius: 10px;
        box-shadow: 0 0 15px 1px #aaa;
        overflow: hidden;
    `,

    Display: styled.div`
        background: #000;
        color: #fff;
        padding: 20px;
        text-align: right;
        min-height: 80px;
        word-wrap: break-word;
        border-bottom: 2px solid #222;
    `,

    ButtonGrid: styled.div`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        background: #111;
    `,

    CalcButton: styled.button`
        background: rgb(58, 63, 80);
        color: #fff;
        padding: 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
            background: #444;
        }

        &:active {
            background: #666;
        }

        &[data-func="true"] {
            background-color: #004d4d;

            &:hover {
                background: #444;
            }
        }

        &[data-op="true"] {
            background-color: #333;

            &:hover {
                background: #444;
            }
        }

        &[data-eq="true"] {
            background-color: #004488;

            &:hover {
                background: #444;
            }
        }
    `,
};
