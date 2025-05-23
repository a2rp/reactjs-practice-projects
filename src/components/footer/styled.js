import styled from "styled-components";

export const Wrapper = styled.footer`
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    /* height: 30px; */
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    background-color: #000;
    color: #fff;

    .copyright {
    }
    .coder {
        text-align: right;
    }

    a {
        color: aqua;

        &:hover {
            text-decoration: none;
        }
    }

    @media (width<500px) {
        grid-template-columns: 1fr;
        gap: 15px;

        .copyright {
            text-align: center;
        }
        .coder {
            text-align: center;
        }
    }
`;
