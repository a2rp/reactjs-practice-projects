import React, { useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import classNames from "classnames";

// Styled Components
const Container = styled.div`
    padding: 30px;
    background-color: #fff;
    color: #000;
    max-width: 1200px;
    margin: 0 auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 15px;
`;

const ValidatorsBox = styled.div`
    border: 1px solid #000;
    padding: 15px;
    /* margin-bottom: 30px; */
    height: 400px;
    overflow: auto;
`;

const InputWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto 15px;
`;

const InfoText = styled.div`
    margin-top: 10px;
    font-weight: bold;
    font-size: 0.9rem;
    
    &.valid {
        color: #4caf50;
    }
    
    &.invalid {
        color: #f44336;
    }
`;

const ValidatorsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* gap: 15px; */
    margin-top: 20px;
`;

const CategoryHeader = styled.h3`
    /* border: 6px solid #ff0; */
    grid-column: 1 / -1;
    /* margin: 20px 0 10px; */
    /* padding-bottom: 5px; */
    border-bottom: 2px solid #eee;
`;

const Category = styled(FormControlLabel)`
    /* display: flex;
    align-items: flex-start; */
    /* gap: 5px; */
    /* white-space: nowrap; */
`;

const validationExamples = {
    // String Validation
    isAlpha: "Letters only (e.g. abcXYZ)",
    isAlphanumeric: "Letters and numbers (e.g. abc123)",
    isAscii: "ASCII characters (e.g. Hello!)",

    // Identification
    isEmail: "Email (e.g. user@example.com)",
    isURL: "URL (e.g. https://example.com)",
    isIP: "IP address (e.g. 192.168.1.1)",
    isFQDN: "Domain name (e.g. example.com)",
    isMACAddress: "MAC address (e.g. 01:23:45:67:89:ab)",

    // Financial
    isCreditCard: "Credit card (e.g. 4111111111111111)",
    isIBAN: "IBAN (e.g. GB82WEST12345698765432)",

    // Numbers/Dates
    isInt: "Integer (e.g. 42)",
    isFloat: "Float number (e.g. 3.14)",
    isNumeric: "Numbers only (e.g. 12345)",
    isDate: "Date (e.g. 2023-12-31)",
    isTime: "Time (e.g. 23:59:59)",

    // Security
    isStrongPassword: "Min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol",
    isHash: "Hash (e.g. md5, sha1)",

    // Technical Formats
    isJSON: "JSON (e.g. {\"key\":\"value\"})",
    isBase64: "Base64 (e.g. SGVsbG8h)",
    isHexadecimal: "Hexadecimal (e.g. ff00ff)",
    isUUID: "UUID (e.g. 123e4567-e89b-12d3-a456-426614174000)",
    isJWT: "JWT token (e.g. eyJhbGciOiJIUzI1NiIs...)",

    // Location/Phone
    isLatLong: "Coordinates (e.g. 40.7128,-74.0060)",
    isPostalCode: "Postal code (e.g. 90210 for US)",
    isMobilePhone: "Phone number (locale specific)",

    // Text Formats
    isSlug: "URL slug (e.g. this-is-a-slug)",
    isMimeType: "MIME type (e.g. application/json)"
};

const Validators = () => {
    const [selectedValue, setSelectedValue] = useState("isEmail");
    const [inputValue, setInputValue] = useState("");
    const [validationResult, setValidationResult] = useState({ valid: false, message: "" });
    const [placeholder, setPlaceholder] = useState(validationExamples["isEmail"]);

    useEffect(() => {
        setPlaceholder(validationExamples[selectedValue] || "Enter value to validate");
    }, [selectedValue]);

    useEffect(() => {
        const val = inputValue.trim();

        const validations = {
            // String Validation
            isAlpha: {
                check: validator.isAlpha,
                success: "Valid alphabetic characters",
                fail: "Must contain only letters (a-zA-Z)"
            },
            isAlphanumeric: {
                check: validator.isAlphanumeric,
                success: "Valid alphanumeric characters",
                fail: "Must contain only letters and numbers"
            },
            isAscii: {
                check: validator.isAscii,
                success: "Valid ASCII characters",
                fail: "Contains non-ASCII characters"
            },

            // Identification
            isEmail: {
                check: validator.isEmail,
                success: "Valid email address",
                fail: "Invalid email format"
            },
            isURL: {
                check: (val) => validator.isURL(val, { require_protocol: true }),
                success: "Valid URL",
                fail: "Invalid URL (must include http:// or https://)"
            },
            isIP: {
                check: validator.isIP,
                success: "Valid IP address",
                fail: "Invalid IP address"
            },
            isFQDN: {
                check: validator.isFQDN,
                success: "Valid domain name",
                fail: "Invalid domain name"
            },
            isMACAddress: {
                check: validator.isMACAddress,
                success: "Valid MAC address",
                fail: "Invalid MAC address format"
            },

            // Financial
            isCreditCard: {
                check: validator.isCreditCard,
                success: "Valid credit card number",
                fail: "Invalid credit card number"
            },
            isIBAN: {
                check: validator.isIBAN,
                success: "Valid IBAN number",
                fail: "Invalid IBAN format"
            },

            // Numbers/Dates
            isInt: {
                check: validator.isInt,
                success: "Valid integer",
                fail: "Not a valid integer"
            },
            isFloat: {
                check: validator.isFloat,
                success: "Valid floating point number",
                fail: "Not a valid decimal number"
            },
            isNumeric: {
                check: validator.isNumeric,
                success: "Valid number",
                fail: "Not a valid number"
            },
            isDate: {
                check: validator.isDate,
                success: "Valid date",
                fail: "Invalid date format"
            },
            isTime: {
                check: (val) => validator.matches(val, /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
                success: "Valid time",
                fail: "Invalid time format (HH:MM or HH:MM:SS)"
            },

            // Security
            isStrongPassword: {
                check: (val) => validator.isStrongPassword(val, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }),
                success: "Strong password",
                fail: "Password too weak (needs 8+ chars with mix of cases, numbers & symbols)"
            },
            isHash: {
                check: (val) => validator.isHash(val, ['md5', 'sha1', 'sha256', 'sha512']),
                success: "Valid hash",
                fail: "Not a recognized hash format"
            },

            // Technical Formats
            isJSON: {
                check: validator.isJSON,
                success: "Valid JSON",
                fail: "Invalid JSON format"
            },
            isBase64: {
                check: validator.isBase64,
                success: "Valid Base64",
                fail: "Invalid Base64 encoding"
            },
            isHexadecimal: {
                check: validator.isHexadecimal,
                success: "Valid hexadecimal",
                fail: "Invalid hex format"
            },
            isUUID: {
                check: validator.isUUID,
                success: "Valid UUID",
                fail: "Invalid UUID format"
            },
            isJWT: {
                check: validator.isJWT,
                success: "Valid JWT",
                fail: "Invalid JWT format"
            },

            // Location/Phone
            isLatLong: {
                check: validator.isLatLong,
                success: "Valid coordinates",
                fail: "Invalid latitude/longitude format"
            },
            isPostalCode: {
                check: (val) => validator.isPostalCode(val, 'any'),
                success: "Valid postal code",
                fail: "Invalid postal code format"
            },
            isMobilePhone: {
                check: (val) => validator.isMobilePhone(val, 'any'),
                success: "Valid phone number",
                fail: "Invalid phone number format"
            },

            // Text Formats
            isSlug: {
                check: validator.isSlug,
                success: "Valid URL slug",
                fail: "Invalid slug format (use letters, numbers, hyphens)"
            },
            isMimeType: {
                check: validator.isMimeType,
                success: "Valid MIME type",
                fail: "Invalid MIME type format"
            }
        };

        if (validations[selectedValue]) {
            const { check, success, fail } = validations[selectedValue];
            const isValid = val ? check(val) : false;
            setValidationResult({
                valid: isValid,
                message: isValid ? success : (val ? fail : "Please enter a value to validate")
            });
        }
    }, [selectedValue, inputValue]);

    const validatorCategories = [
        {
            name: "String Validation",
            validators: ['isAlpha', 'isAlphanumeric', 'isAscii']
        },
        {
            name: "Identification",
            validators: ['isEmail', 'isURL', 'isIP', 'isFQDN', 'isMACAddress']
        },
        {
            name: "Financial",
            validators: ['isCreditCard', 'isIBAN']
        },
        {
            name: "Numbers/Dates",
            validators: ['isInt', 'isFloat', 'isNumeric', 'isDate', 'isTime']
        },
        {
            name: "Security",
            validators: ['isStrongPassword', 'isHash']
        },
        {
            name: "Technical Formats",
            validators: ['isJSON', 'isBase64', 'isHexadecimal', 'isUUID', 'isJWT']
        },
        {
            name: "Location/Phone",
            validators: ['isLatLong', 'isPostalCode', 'isMobilePhone']
        },
        {
            name: "Text Formats",
            validators: ['isSlug', 'isMimeType']
        }
    ];

    return (
        <Container>
            <Heading>Validators</Heading>

            <InputWrapper>
                <TextField
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="medium"
                    error={!validationResult.valid && inputValue.length > 0}
                    helperText={inputValue.length > 0 ? validationResult.message : ""}
                    label={`Validate: ${selectedValue}`}
                    placeholder={placeholder}
                    InputProps={{
                        style: {
                            fontSize: '1.1rem'
                        }
                    }}
                />
                {inputValue.length > 0 && (
                    <InfoText className={classNames({
                        valid: validationResult.valid,
                        invalid: !validationResult.valid
                    })}>
                        {validationResult.valid ? "✓ Valid" : "✗ Invalid"}
                        {validationResult.message && `: ${validationResult.message}`}
                    </InfoText>
                )}
            </InputWrapper>

            <ValidatorsBox>
                <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                    >
                        <ValidatorsList>
                            {validatorCategories.map((category) => (
                                <React.Fragment key={category.name}>
                                    <CategoryHeader>{category.name}</CategoryHeader>
                                    {category.validators.map((validatorKey) => (
                                        <Category
                                            key={validatorKey}
                                            value={validatorKey}
                                            control={<Radio color="primary" />}
                                            label={`${validatorKey} - ${validationExamples[validatorKey]}`}
                                            style={{ marginLeft: '8px' }}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </ValidatorsList>
                    </RadioGroup>
                </FormControl>
            </ValidatorsBox>
        </Container>
    );
};

export default Validators;