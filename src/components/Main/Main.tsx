import {FC, ReactElement, useEffect, useState} from "react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition/useSpeechRecognition";

export const Main: FC = (): ReactElement => {
    const { text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();

    const [response, setResponse] = useState<string>("");
    const [generating, setGenerating] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false); // State to control TTS

    useEffect(() => {
        if (text !== "") {
            fetchChatGtpResponse();
        }
    }, [text]);

    useEffect(() => {
        if (response && !isMuted) { // Check if not muted before reading out
            readOutResponse(response);
        }
    }, [response, isMuted]);

    const fetchChatGtpResponse = () => {
        setGenerating(true);
        setError(false);
        setResponse("");

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: text + " keep the response concise and include any formatting as HTML with line breaks after bullet points (remove backticks and markdown)."
                    }
                ]
            })
        })
            .then((response: Response): any => {
                if (!response.ok) {
                    setGenerating(false);
                    setError(true);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((response: any): void => {
                setResponse(response.choices[0].message.content);
                setGenerating(false);
            })
            .catch((error: Error): void => {
                console.log(error.message);
                setGenerating(false);
                setError(true);
            });
    };

    const readOutResponse = (htmlText: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(htmlText.replace(/<[^>]*>/g, ''));

            const voices = window.speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => voice.voiceURI === "Samantha");

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            } else {
                console.warn(`Voice with URI Samantha not found.`);
            }

            utterance.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
            };

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech synthesis not supported in this browser.");
        }
    };

    return (
        <div className="container">
            {hasRecognitionSupport ? (
                <>
                    <div className="button-group">
                        <button
                            className="button start"
                            onClick={startListening}
                            disabled={isListening}
                        >
                            Start Listening
                        </button>
                        <button
                            className="button stop"
                            onClick={stopListening}
                        >
                            Stop Listening
                        </button>
                    </div>

                    {isListening && (
                        <p className="listening">Your browser is currently listening...</p>
                    )}
                    <div className="transcript">{text}</div>

                    <div className="mute-option">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isMuted}
                                onChange={() => setIsMuted(!isMuted)}
                            />
                            <span className="slider"></span>
                        </label>
                        <span className="mute-label">Mute Text-to-Speech</span>
                    </div>

                    <div className="response-section">
                        {generating && <p className="loading">Generating response...</p>}
                        {error && <p className="error">An error occurred while fetching the response.</p>}
                        {response && (<div className="response" dangerouslySetInnerHTML={{ __html: response }} />)}
                    </div>
                </>
            ) : (
                <h1 className="no-support">Browser does not support speech recognition</h1>
            )}
        </div>
    );
};
