import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        padding: 15px;
        background-color: #fff;
        color: #000;
    `,
    Controls: styled.div`
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    `,
    RangeSelect: styled.select`
        padding: 10px;
        width: 100%;
        height: 100%;
    `,
    NextRowButton: styled.div`
        padding: 10px;
        text-align: center;
        cursor: pointer;
        margin-bottom: 20px;
        border: 1px solid #000;
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: block;

        &:hover {
            background: #aaa;
        }
    `,
    CharListWrapper: styled.div`
        border: 1px solid #000;
        height: 50vh;
        overflow: auto;
    `,
    Char: styled.div``,
    Title: styled.h3`
        padding: 15px;
    `,
    CharGrid: styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    `,
    CharBox: styled.div`
        /* border: 1px solid #000; */
        background-color: #eee;
        width: 80px;
        height: 80px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.2s ease;

        &:hover {
            box-shadow: 0 0 15px 5px #000;
        }
    `,
    CharIndex: styled.div`
        font-size: 13px;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #fff;
        color: #000;
        padding: 1px 4px;
    `,
    DetailBox: styled.div`
        border-bottom: 2px solid #0ff;
        margin-top: 20px;
        padding-bottom: 10px;
    `,
    Deduction: styled.div`
        /* border: 1px solid #f00; */
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
    `,

    // Add in `Styled` object inside styled.js

    ModalOverlay: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    `,

    ModalContent: styled.div`
        background: white;
        color: black;
        padding: 20px;
        width: 300px;
        max-width: 90vw;
        border-radius: 8px;
        position: relative;
    `,

    CloseButton: styled.button`
        position: absolute;
        top: 5px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
    `,
    CopyButton: styled.div`
        margin-left: 8px;
        border: none;
        padding: 2px 6px;
        font-size: 12px;
        cursor: pointer;
        border-radius: 4px;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.5);
        }
    `,
};
