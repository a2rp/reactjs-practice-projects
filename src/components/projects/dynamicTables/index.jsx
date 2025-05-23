import React, { useState } from "react";
import styled from "styled-components";
import tabsContent from "./tabs-content.json";
import parse from "html-react-parser";

const Container = styled.div`
        padding: 30px;
        font-family: sans-serif;
        background-color: #111;
        color: white;
        min-height: 100vh;
    `;

const Main = styled.div`
        max-width: 1000px;
        margin: 0 auto;
    `;

const Heading = styled.h2`
        font-size: 24px;
        margin-bottom: 20px;
        color: #0ff;
    `;

const TabHeaderContainer = styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    `;

const Tab = styled.div`
    background-color: ${({ $active }) => ($active ? "#00f" : "#000")};
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0044ff;
    }
`;


const TabContentContainer = styled.div`
        font-size: 16px;
        line-height: 1.6;

        ul {
            margin-top: 10px;
            padding-left: 20px;
        }

        li {
            margin-bottom: 5px;
        }
    `;

const DynamicTabs = () => {
    const [tabId, setTabId] = useState(0);
    const [tabContent, setTabContent] = useState("");

    const handleTabClick = (id) => {
        setTabId(id);
        const value = tabsContent.find((obj) => obj.id === id);
        setTabContent(value?.content || "");
    };

    return (
        <Container>
            <Main>
                <Heading>Dynamic Tabs: types of programming language</Heading>

                <TabHeaderContainer>
                    {tabsContent.map((item) => (
                        <Tab
                            key={item.id}
                            $active={tabId === item.id} // ✅ use $active here
                            onClick={() => handleTabClick(item.id)}
                        >
                            {item.tab}
                        </Tab>

                    ))}
                </TabHeaderContainer>

                <TabContentContainer>{parse(tabContent)}</TabContentContainer>
            </Main>
        </Container>
    );
};

export default DynamicTabs;
