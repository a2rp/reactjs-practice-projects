import styled from "styled-components";

export const Wrapper = styled.div`
    /* border: 1px solid #f00; */
    max-width: 1440px;
    margin: auto;
    padding: 50px;

    .heading {
        text-align: center;
    }

    .subheading {
        margin-top: 50px;
        margin-bottom: 5px;
        text-decoration: underline;
    }

    .animation {
        border: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
    }

    @media (width<500px) {
        padding: 15px;
    }
`;

export const AnimationNameWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    .name {
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
            background-color: #222;
        }
    }
`;
