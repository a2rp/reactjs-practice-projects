import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import styled from "styled-components";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

// Styled Components
const Container = styled.div`
    padding: 30px;
    max-width: 1000px;
    margin: auto;
    background-color: #fff;
`;

const Heading = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TextFieldWrapper = styled(TextField)`
    width: 100%;
`;

const SelectResumeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ResumeInput = styled(TextField)`
    margin-top: 5px;
`;

const StyledSelect = styled(Select)`
    margin-top: 20px;
`;

const SubmitButton = styled(Button)`
    align-self: center;
`;

const DialogContentStyled = styled(DialogContent)`
    padding: 20px;
`;

const DetailRow = styled.span`
    display: block;
    margin-top: 10px;
`;

const DetailTitle = styled.span`
    font-weight: bold;
    display: block;
`;

const LanguageTypography = styled(Typography)`
    font-weight: 700;
    padding-left: 15px;
`;

const MuiForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [url, setUrl] = useState("");
    const [urlError, setUrlError] = useState("");

    const [resume, setResume] = useState("");
    const resumeInputFileRef = useRef(null);

    const [gender, setGender] = useState("male");

    const [subject, setSubject] = useState({
        english: true,
        maths: false,
        physics: false,
    });

    const [programmingLanguage, setProgrammingLanguage] = useState("react");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubjectChange = (event) => {
        setSubject({ ...subject, [event.target.name]: event.target.checked });
    };

    const handlleFullNameChange = (event) => {
        const value = event.target.value
            .replace(/[^a-zA-Z ]/gi, "")
            .slice(0, 20);
        setFullName(value);
        setFullNameError(
            value.length < 3 ? "Min: 3 Char, Max: 20  Char, A-Za-z" : ""
        );
    };

    const handlleEmailChange = (event) => {
        const value = event.target.value.substring(0, 40);
        setEmail(value);
        const isValid = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(
            value
        );
        setEmailError(isValid ? "" : "Invalid email address");
    };

    const handleUserNameChange = (event) => {
        const value = event.target.value
            .replace(/[^a-zA-Z0-9]/gi, "")
            .slice(0, 20);
        setUserName(value);
        setUserNameError(
            value.length < 3 ? "Min: 3 Char, Max: 20  Char, A-Za-z0-9" : ""
        );
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value.substring(0, 15);
        setPassword(value);
        const isValid =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);
        setPasswordError(
            isValid
                ? ""
                : "8-15 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"
        );
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 10);
        setPhoneNumber(value);
        setPhoneNumberError(value.length !== 10 ? "Size: 10 Chars, 0-9" : "");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const inputData = {
            fullName,
            email,
            userName,
            password,
            phoneNumber,
            url,
            resume,
            gender,
            subject,
            programmingLanguage,
        };
        if (
            fullNameError ||
            emailError ||
            passwordError ||
            phoneNumberError ||
            urlError
        ) {
            return toast.error("Form contains error");
        }

        if (!resume) return toast.error("Please add your resume");

        // console.log(inputData);
        handleClickOpen();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <Container>
            <Heading>Material UI Form</Heading>
            <FormWrapper onSubmit={handleSubmit}>
                <Section>
                    <TextFieldWrapper
                        label="Fullname"
                        value={fullName}
                        onChange={handlleFullNameChange}
                        error={!!fullNameError}
                        helperText={fullNameError}
                        required
                    />
                    <TextFieldWrapper
                        label="Email"
                        value={email}
                        onChange={handlleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                        required
                        type="email"
                    />
                    <TextFieldWrapper
                        label="User Name"
                        value={userName}
                        onChange={handleUserNameChange}
                        error={!!userNameError}
                        helperText={userNameError}
                        required
                    />
                    <TextFieldWrapper
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!passwordError}
                        helperText={passwordError}
                        required
                        type="password"
                    />
                    <TextFieldWrapper
                        label="Phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        error={!!phoneNumberError}
                        helperText={phoneNumberError}
                        required
                    />
                    <TextFieldWrapper
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        error={!!urlError}
                        helperText={urlError}
                        required
                        type="url"
                    />
                </Section>

                <Section>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Pick subject</FormLabel>
                        <FormGroup row>
                            {["english", "maths", "physics"].map((subj) => (
                                <FormControlLabel
                                    key={subj}
                                    control={
                                        <Checkbox
                                            checked={subject[subj]}
                                            onChange={handleSubjectChange}
                                            name={subj}
                                        />
                                    }
                                    label={
                                        subj[0].toUpperCase() + subj.slice(1)
                                    }
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </Section>

                <Section>
                    <SelectResumeContainer>
                        <Typography>Select resume</Typography>
                        <ResumeInput
                            type="file"
                            value={resume}
                            onChange={(e) => setResume(e.target.value)}
                            inputRef={resumeInputFileRef}
                        />
                    </SelectResumeContainer>

                    <StyledSelect
                        value={programmingLanguage}
                        onChange={(e) => setProgrammingLanguage(e.target.value)}
                    >
                        <LanguageTypography>Language set 1</LanguageTypography>
                        <MenuItem value="react">React.js</MenuItem>
                        <MenuItem value="node">Node.js</MenuItem>
                        <LanguageTypography>Language set 2</LanguageTypography>
                        <MenuItem value="express">Express.js</MenuItem>
                        <MenuItem value="mongodb">MongoDB</MenuItem>
                    </StyledSelect>
                </Section>

                <SubmitButton
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress sx={{ padding: "10px" }} />
                    ) : (
                        "Submit"
                    )}
                </SubmitButton>
            </FormWrapper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Form inputs
                    <span style={{ float: "right" }}>
                        <CloseIcon onClick={handleClose} />
                    </span>
                </DialogTitle>
                <DialogContentStyled>
                    <DialogContentText style={{ height: "300px", width: "300px", overflow: "auto" }}>
                        <DetailRow>
                            <DetailTitle>Fullname:</DetailTitle>
                            {fullName}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Email:</DetailTitle>
                            {email}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Username:</DetailTitle>
                            {userName}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Password:</DetailTitle>
                            {password}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Phone Number:</DetailTitle>
                            {phoneNumber}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>URL:</DetailTitle>
                            {url}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Resume:</DetailTitle>
                            {resume}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Gender:</DetailTitle>
                            {gender}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Subjects:</DetailTitle>
                            {subject.english && "English "}{" "}
                            {subject.maths && "Maths "}{" "}
                            {subject.physics && "Physics"}
                        </DetailRow>
                        <DetailRow>
                            <DetailTitle>Programming Language:</DetailTitle>
                            {programmingLanguage}
                        </DetailRow>
                    </DialogContentText>
                </DialogContentStyled>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MuiForm;
