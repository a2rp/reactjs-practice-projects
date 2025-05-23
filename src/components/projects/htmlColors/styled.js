import styled from "styled-components";

export const Wrapper = styled.div`
    /* border: 10px solid #00f; */
    display: flex;
    justify-content: center;
    /* height: 100vh; */
`;

export const Main = styled.div`
    width: 100%;
    max-width: 1440px;
    height: 100vh;
`;

export const Heading = styled.h1`
    text-align: center;
    margin: 15px;
`;

export const ControlsSection = styled.div`
    /* border: 1px solid #f00000; */
    /* padding: 15px; */
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 15px;

    @media (width<800px) {
        grid-template-columns: 1fr;
    }
`;

export const ColorsList = styled.div`
    border: 1px solid #aaa;
    height: calc(100vh - 200px);
    background-color: #000;
    overflow-y: scroll;

    @media (width<800px) {
        height: 200px;
    }

    ul {
        list-style: none;

        li {
            display: flex;
            align-items: center;
            height: 30px;
            position: relative;
            color: #fff;
            cursor: pointer;
            padding: 15px;

            &:hover {
                background-color: #222;
            }

            span.color {
                border: 1px solid #fff;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                right: 15px;
                width: 20px;
                height: 20px;
            }
        }
    }
`;

export const DisplaySection = styled.div`
    /* border: 10px solid #f00; */
    padding: 15px;

    @media (width<800px) {
        /* height: 200px; */
    }

    .icon {
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(2);
        }
    }

    input[type="range"] {
        width: 100%;
        margin-bottom: 10px;

        transition: transform 0.2s ease;
        &:hover {
            transform: scale(1.1);
        }
    }

    .color_name {
    }
    .hex_code {
        display: flex;
        gap: 30px;
        align-items: center;
        height: 30px;
    }
    .rgb_color {
        display: flex;
        gap: 30px;
        align-items: center;
        height: 30px;
    }
    .selected_color {
        margin-top: 10px;
        height: 100px;
        border-radius: 8px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.2s ease;

        &:hover {
            box-shadow: 0 0 15px 5px #000;
        }

        span {
            background-color: #000;
            color: #fff;
            padding: 10px 20px;
            border-radius: inherit;
        }
    }
    .slider_wrapper {
        display: flex;
        gap: 15px;
        margin: 30px 0;
    }

    .opaque_color {
        margin-top: 10px;
        height: 100px;
        border-radius: 8px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.2s ease;

        &:hover {
            box-shadow: 0 0 15px 5px #000;
        }

        span {
            background-color: #000;
            color: #fff;
            padding: 10px 20px;
            border-radius: inherit;
        }
    }

    .recent_colors {
        margin-top: 15px;
    }

    .color_history {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        align-items: center;

        .color {
            width: 30px;
            height: 30px;
            border: 1px solid #ccc;
            cursor: pointer;
            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .color_input_wrapper {
        margin-top: 15px;
        display: inline-flex;
        align-items: center;
        gap: 15px;

        span {
        }

        input {
            border: none;
            border: 1px solid #000;
            height: 40px;
            outline: none;
            border-radius: 5px;
            width: 100px;
            padding: 0 15px;

            transition: box-shadow 0.2s ease;

            &:hover {
                box-shadow: 0 0 10px 3px #000;
            }
        }
    }
`;
