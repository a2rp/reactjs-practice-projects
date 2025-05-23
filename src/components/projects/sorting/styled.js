import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
`;

export const Heading = styled.h1`
    padding: 15px;
    text-align: center;
`;

export const Info = styled.div`
    padding: 15px;
    text-align: center;
`;

export const Main = styled.div`
    /* border: 1px solid #f00; */
    width: 100%;
    max-width: 1440px;
    margin: auto;
    margin-top: 30px;
    /* display: grid;
    grid-template-columns: 200px 1fr; */
`;

export const ListWrapper = styled.div`
    border: 1px solid #000;
    margin-bottom: 30px;

    ul {
        padding: 0;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;

        li {
            height: 30px;
            padding: 0 15px;
            border: 1px solid #fff;
            background-color: #000;
            color: #fff;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                background-color: #333;
                color: #fff;
            }
        }
    }
`;

export const DetailsWrapper = styled.div`
    border: 1px solid #000;
`;
