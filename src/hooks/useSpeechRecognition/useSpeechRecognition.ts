import { useEffect, useState, useCallback } from "react";

const useSpeechRecognition = () => {
    const [text, setText] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect((): void => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = false;
            recognitionInstance.lang = "en-US";

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                setText(event.results[0][0].transcript);
                recognitionInstance.stop();
                setIsListening(false);
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Speech recognition error detected: " + event.error);
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const startListening = useCallback((): void => {
        if (recognition) {
            setText("");
            setIsListening(true);
            recognition.start();
        }
    }, [recognition]);

    const stopListening = useCallback((): void => {
        if (recognition) {
            setIsListening(false);
            recognition.stop();
        }
    }, [recognition]);

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: recognition !== null,
    };
};

export default useSpeechRecognition;
