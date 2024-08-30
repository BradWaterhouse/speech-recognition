import { FC, ReactElement } from "react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition/useSpeechRecognition";

export const Main: FC = (): ReactElement => {
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    return (
        <div className="container">
            {hasRecognitionSupport ? (
                <>
                    <div>
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
                            disabled={!isListening}
                        >
                            Stop Listening
                        </button>
                    </div>

                    {isListening && (
                        <p className="listening">Your browser is currently listening</p>
                    )}
                    <div className="transcript">{text}</div>
                </>
            ) : (
                <h1>Browser does not support speech recognition</h1>
            )}
        </div>
    );
};
