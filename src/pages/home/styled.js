import styled from "styled-components";

export const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px;

    .header {
        text-align: center;
        margin-bottom: 30px;
    }

    .wrapper {
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        padding: 15px;
        width: 100%;
        max-width: 1440px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;

        .project {
            display: flex;
            padding: 5px 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            text-decoration: none;

            &:hover {
                background-color: #222;
            }
        }
    }
`;
