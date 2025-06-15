import React, { useState } from 'react';

const VoiceMessage = ({ onSend }) => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    let mediaRecorder;

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
            setAudioBlob(event.data);
        };

        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
    };

    const sendVoiceMessage = () => {
        if (audioBlob) {
            onSend(audioBlob);
            setAudioBlob(null);
        }
    };

    return (
        <div>
            <button onClick={recording ? stopRecording : startRecording}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {audioBlob && (
                <div>
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                    <button onClick={sendVoiceMessage}>Send Voice Message</button>
                </div>
            )}
        </div>
    );
};

export default VoiceMessage;