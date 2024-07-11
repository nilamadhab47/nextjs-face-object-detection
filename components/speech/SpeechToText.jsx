"use client";

import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";


export const PulsatingCircle = ({ listening }) => {
  return (
    <div className={`circle ${listening ? "pulse" : ""}`}>
      {/* You can add any content inside the circle here */}
    </div>
  );
};


const Dictaphone = ({ onTranscribedText, isListening }) => {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
    startListening,
    stopListening
  } = useSpeechRecognition();
  console.log(isListening)
  // useEffect(() => {
  //   // Automatically start listening when the component mounts
  //   SpeechRecognition.startListening({ continuous: true }); // Ensure it listens continuously until stopped
  // }, [startListening]);

  useEffect(() => {
    if (!listening && transcript.trim() !== "") {
      onTranscribedText(transcript);
      resetTranscript();
    }
  }, [listening, transcript, onTranscribedText, resetTranscript]);

  // if (!browserSupportsSpeechRecognition) {
  //   return (
  //     <div>
  //       Browser doesn't support speech recognition.
  //     </div>
  //   );
  // }
  

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  // useEffect(() => {
  //   if (isListening) {
  //     SpeechRecognition.startListening();
  //   }else {
  //     SpeechRecognition.startListening();
  //   }
  // }, []);

  return (
    
      <div className="flex flex-col justify-center items-center gap-4">
        {listening ? (
          <p
            className=" text-center text-black bg-slate-100 rounded-md w-[15rem] h-[3rem] mt-3 "
            style={{ border: "2px solid white" }}
          >
            {transcript}
          </p>
        ) : (
          ""
        )}

        <button
          onClick={handleToggleListening}
          className="text-[3rem] text-green-700"
        >
          {listening ? <PulsatingCircle listening={true} /> : <FaMicrophone />}
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
    
  );
};

export default Dictaphone;
