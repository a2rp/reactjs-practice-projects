import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const WordList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
`;

const WordButton = styled.button`
    background: #e9ecef;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        background: #dee2e6;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const MeaningBox = styled.div`
    border: 1px solid #e9ecef;
    padding: 20px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
`;

const LanguageItem = styled.li`
    padding: 8px 0;
    border-bottom: 1px solid #f1f3f5;

    &:last-child {
        border-bottom: none;
    }
`;

const LoadingSkeleton = styled.div`
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    height: 20px;
    border-radius: 4px;
    margin-bottom: 10px;

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;

const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "hi", name: "Hindi" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
];

// Local fallback translations for common words
const localTranslations = {
    hello: {
        es: "hola",
        fr: "bonjour",
        de: "hallo",
        it: "ciao",
        pt: "olá",
        hi: "नमस्ते",
        ja: "こんにちは",
        zh: "你好",
    },
    goodbye: {
        es: "adiós",
        fr: "au revoir",
        de: "auf wiedersehen",
        it: "arrivederci",
        pt: "adeus",
        hi: "अलविदा",
        ja: "さようなら",
        zh: "再见",
    },
    // Add more words as needed
};

const WordMeaning = ({
    words = ["hello", "goodbye", "thank you", "please", "yes", "no"],
}) => {
    const [selectedWord, setSelectedWord] = useState("");
    const [translations, setTranslations] = useState({});
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // List of available translation API endpoints
    const TRANSLATION_ENDPOINTS = [
        "https://translate.argosopentech.com/translate",
        "https://libretranslate.de/translate",
        "https://libretranslate.org/translate",
    ];

    // Function to try multiple endpoints with retries
    const tryTranslationEndpoints = async (word, targetLang) => {
        let lastError = null;

        for (const endpoint of TRANSLATION_ENDPOINTS) {
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        q: word,
                        source: "en",
                        target: targetLang,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.translatedText;
                }
            } catch (err) {
                lastError = err;
                await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between retries
            }
        }

        // If all endpoints fail, check local fallback
        return (
            localTranslations[word.toLowerCase()]?.[targetLang] ||
            "Translation unavailable"
        );
    };

    const fetchWordData = async (word) => {
        setSelectedWord(word);
        setLoading(true);
        setError(null);
        setTranslations({});
        setDefinitions([]);

        try {
            // 1. Fetch definitions from DictionaryAPI
            try {
                const defResponse = await fetch(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
                );

                if (defResponse.ok) {
                    const defData = await defResponse.json();
                    setDefinitions(defData[0]?.meanings || []);
                }
            } catch (defError) {
                console.warn("Dictionary API error:", defError);
            }

            // 2. Fetch translations with fallback handling
            const translationResults = {};

            // Process languages in parallel with rate limiting
            await Promise.all(
                languages.map(async (lang) => {
                    translationResults[lang.name] =
                        await tryTranslationEndpoints(word, lang.code);
                })
            );

            setTranslations(translationResults);
        } catch (err) {
            setError(err.message);
            console.error("Translation error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <h2>Multilingual Word Explorer</h2>
            <p>Click any word to see its meaning and translations</p>

            <WordList>
                {words.map((word, index) => (
                    <WordButton
                        key={index}
                        onClick={() => fetchWordData(word)}
                        disabled={loading}
                    >
                        {word}
                    </WordButton>
                ))}
            </WordList>

            {selectedWord && (
                <MeaningBox>
                    <h3>"{selectedWord}"</h3>

                    {error && (
                        <p style={{ color: "#e63946" }}>Error: {error}</p>
                    )}

                    {loading ? (
                        <div>
                            <LoadingSkeleton style={{ width: "80%" }} />
                            <LoadingSkeleton style={{ width: "60%" }} />
                            <LoadingSkeleton style={{ width: "70%" }} />
                        </div>
                    ) : (
                        <>
                            {definitions.length > 0 && (
                                <div style={{ marginBottom: "20px" }}>
                                    <h4>Definitions:</h4>
                                    <ul>
                                        {definitions.map((meaning, idx) => (
                                            <LanguageItem key={idx}>
                                                <strong>
                                                    {meaning.partOfSpeech}:
                                                </strong>{" "}
                                                {
                                                    meaning.definitions[0]
                                                        ?.definition
                                                }
                                            </LanguageItem>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <h4>Translations:</h4>
                            <ul>
                                {Object.entries(translations).map(
                                    ([lang, meaning]) => (
                                        <LanguageItem key={lang}>
                                            <strong>{lang}:</strong> {meaning}
                                        </LanguageItem>
                                    )
                                )}
                            </ul>
                        </>
                    )}
                </MeaningBox>
            )}
        </Wrapper>
    );
};

export default WordMeaning;
