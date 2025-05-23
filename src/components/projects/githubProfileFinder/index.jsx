import React, { useEffect, useRef, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    color: #000;
`;

const Main = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: white;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    justify-content: center;
`;

const SubmitButton = styled(Button)`
    min-width: 120px !important;
    height: 56px !important;
`;

const UserTitle = styled.h1`
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const UserAvatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto;
`;

const BasicInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
`;

const InfoSpan = styled.span``;

const UserBlog = styled(InfoSpan)`
    word-break: break-all;
`;

const HtmlURL = styled(InfoSpan)`
    word-break: break-all;
`;

const GithubURL = styled(InfoSpan)`
    word-break: break-all;
`;

const UserBio = styled.div`
    font-size: 16px;
`;

const UserDate = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
`;

const GithubProfileFinder = () => {
    const submitButtonRef = useRef(null);
    const [username, setUsername] = useState("a2rp");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value =
            username.trim().length === 0
                ? toast.warn("username is empty")
                : username;

        try {
            const config = {
                url: `https://api.github.com/users/${value}`,
                method: "GET",
            };
            setIsLoading(true);
            setUser(null);
            const response = await axios(config);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        submitButtonRef.current.click();
    }, []);

    return (
        <Container>
            <Main>
                <Title>Github Profile Finder</Title>

                <Form onSubmit={handleSubmit}>
                    <TextField
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        label="Enter username here"
                        placeholder="Username"
                        fullWidth
                    />
                    <SubmitButton
                        ref={submitButtonRef}
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress sx={{ padding: "5px" }} />
                        ) : (
                            "Search"
                        )}
                    </SubmitButton>
                </Form>

                {user && (
                    <>
                        <UserTitle>User info</UserTitle>
                        <UserDetails>
                            <UserAvatar src={user.avatar_url} alt="" />
                            <BasicInfo>
                                <InfoSpan>
                                    <b>Id:</b> {user.id}
                                </InfoSpan>
                                <InfoSpan>
                                    <b>Name:</b> {user.name}
                                </InfoSpan>
                                <InfoSpan>
                                    <b>Location:</b> {user.location}
                                </InfoSpan>
                                <InfoSpan>
                                    <b>Login:</b> {user.login}
                                </InfoSpan>
                                <InfoSpan>
                                    <b>Public repos:</b> {user.public_repos}
                                </InfoSpan>
                                <UserBlog>
                                    <b>Blog:</b> {user.blog}
                                </UserBlog>
                                <HtmlURL>
                                    <b>HTML URL:</b> {user.html_url}
                                </HtmlURL>
                                <GithubURL>
                                    <b>GitHub URL:</b> {user.url}
                                </GithubURL>
                            </BasicInfo>
                            <UserBio>
                                <b>Bio:</b> {user.bio}
                            </UserBio>
                            <UserDate>
                                <span>
                                    <b>Created at:</b> {user.created_at}
                                </span>
                                <span>
                                    <b>Updated at:</b> {user.updated_at}
                                </span>
                            </UserDate>
                        </UserDetails>
                    </>
                )}
            </Main>
        </Container>
    );
};

export default GithubProfileFinder;
