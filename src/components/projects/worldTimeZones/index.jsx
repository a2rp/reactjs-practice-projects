import React, { useEffect, useState } from "react";
import styled from "styled-components";
import timezones from "./timezones.json";

const WorldTimeZones = () => {
    const [search, setSearch] = useState("");
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [datetimeStr, setDatetimeStr] = useState("");
    const [analogTime, setAnalogTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: timezone,
                timeZoneName: "short",
            };
            const formatter = new Intl.DateTimeFormat("en-US", options);
            setDatetimeStr(formatter.format(now));
            setAnalogTime(
                new Date(now.toLocaleString("en-US", { timeZone: timezone }))
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    const hrDeg = 30 * analogTime.getHours() + analogTime.getMinutes() / 2;
    const minDeg = 6 * analogTime.getMinutes();
    const secDeg = 6 * analogTime.getSeconds();

    const filteredTimezones = timezones
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    const displayedTimezones = filteredTimezones;

    return (
        <Container>
            <Header>
                <Heading>World Time Zones</Heading>
                <Subtitle>Select a location to see its current time</Subtitle>
            </Header>

            <MainContent>
                <SearchContainer>
                    <SearchBox
                        placeholder="Search timezone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchContainer>
                <ListWrapper>
                    <TimezoneList>
                        {displayedTimezones.length > 0 ? (
                            <ol>
                                {displayedTimezones.map((c) => (
                                    <TimezoneItem
                                        key={c.timezone}
                                        className={timezone === c.timezone ? 'active' : ''}
                                    >
                                        <TimezoneName onClick={() => setTimezone(c.timezone)}>
                                            {c.name}
                                        </TimezoneName>
                                    </TimezoneItem>
                                ))}
                            </ol>
                        ) : (
                            <NoResults>
                                No timezones match your search
                            </NoResults>
                        )}
                    </TimezoneList>
                </ListWrapper>

                <ClockDisplay>
                    <TimezoneInfo>
                        <TimezoneNameLarge>{timezone}</TimezoneNameLarge>
                        <DateTime>{datetimeStr}</DateTime>
                    </TimezoneInfo>

                    <ClockContainer>
                        <ClockFace>
                            {[...Array(12)].map((_, i) => (
                                <ClockNumber key={i} data-position={i}>
                                    {i === 0 ? 12 : i}
                                </ClockNumber>
                            ))}
                            <HourHand style={{ transform: `rotate(${hrDeg}deg)` }} />
                            <MinuteHand style={{ transform: `rotate(${minDeg}deg)` }} />
                            <SecondHand style={{ transform: `rotate(${secDeg}deg)` }} />
                            <ClockCenter />
                        </ClockFace>
                    </ClockContainer>
                </ClockDisplay>
            </MainContent>
        </Container>
    );
};

export default WorldTimeZones;

// Styled Components
const Container = styled.div`
    min-height: 100vh;
    background-color: #f5f7fa;
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
    padding: 20px 30px;
    background-color: #2c3e50;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
    margin: 0;
    font-size: 2rem;
`;

const Subtitle = styled.p`
    margin: 5px 0 0;
    font-size: 1rem;
    opacity: 0.8;
`;

const MainContent = styled.div`
    /* border: 1px solid #f00; */
    /* display: flex; */
    flex: 1;
    overflow: hidden;
`;

const SearchContainer = styled.div`
    padding: 5px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
`;

const SearchBox = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 10px;
    
    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const ListWrapper = styled.div`
    height: auto;
    max-height: 200px;
    overflow: auto;
    display: flex;
    background-color: white;
    border-right: 1px solid #e0e0e0;
`;

const TimezoneList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 5px;

    ol {
        display: flex;
        flex-wrap: wrap;
    }
`;

const TimezoneItem = styled.li`
    list-style: none;
    /* padding: 5px 15px; */
    margin: 5px 0;
    background-color: white;
    border-left: 3px solid transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    &.active {
        background-color: #e3f2fd;
        border-left: 3px solid #3498db;
        
        &:hover {
            background-color: #e3f2fd;
        }
    }
`;

const TimezoneName = styled.span`
    /* border: 1px solid #f00; */
    padding: 5px 15px;
    flex: 1;
`;

const NoResults = styled.div`
    padding: 20px;
    text-align: center;
    color: #777;
`;

const ClockDisplay = styled.div`
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
`;

const TimezoneInfo = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

const TimezoneNameLarge = styled.h2`
    margin: 0 0 10px;
    color: #2c3e50;
    font-size: 1.8rem;
`;

const DateTime = styled.div`
    font-size: 1.2rem;
    color: #7f8c8d;
`;

const ClockContainer = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
`;

const ClockFace = styled.div`
    /* border: 10px solid #ff0; */
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    border: 8px solid #2c3e50;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ClockNumber = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #2c3e50;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -15px;
    transform-origin: center;

    &[data-position="0"] { transform: rotate(0deg) translateY(-130px) rotate(-0deg); }
    &[data-position="1"] { transform: rotate(30deg) translateY(-130px) rotate(-30deg); }
    &[data-position="2"] { transform: rotate(60deg) translateY(-130px) rotate(-60deg); }
    &[data-position="3"] { transform: rotate(90deg) translateY(-130px) rotate(-90deg); }
    &[data-position="4"] { transform: rotate(120deg) translateY(-130px) rotate(-120deg); }
    &[data-position="5"] { transform: rotate(150deg) translateY(-130px) rotate(-150deg); }
    &[data-position="6"] { transform: rotate(180deg) translateY(-130px) rotate(-180deg); }
    &[data-position="7"] { transform: rotate(210deg) translateY(-130px) rotate(-210deg); }
    &[data-position="8"] { transform: rotate(240deg) translateY(-130px) rotate(-240deg); }
    &[data-position="9"] { transform: rotate(270deg) translateY(-130px) rotate(-270deg); }
    &[data-position="10"] { transform: rotate(300deg) translateY(-130px) rotate(-300deg); }
    &[data-position="11"] { transform: rotate(330deg) translateY(-130px) rotate(-330deg); }
`;


const Hand = styled.div`
    position: absolute;
    border-radius: 10px;
    transform-origin: bottom;
    left: calc(50% - 3px);
`;

const HourHand = styled(Hand)`
    width: 6px;
    height: 25%;
    top: 25%;
    background-color: #2c3e50;
    z-index: 3;
`;

const MinuteHand = styled(Hand)`
    width: 4px;
    height: 35%;
    top: 15%;
    background-color: #7f8c8d;
    z-index: 2;
`;

const SecondHand = styled(Hand)`
    width: 2px;
    height: 40%;
    top: 10%;
    background-color: #e74c3c;
    z-index: 1;
`;

const ClockCenter = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #e74c3c;
    border-radius: 50%;
    top: calc(50% - 6px);
    left: calc(50% - 6px);
    z-index: 4;
`;