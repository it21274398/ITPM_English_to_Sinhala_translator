import React, { useState } from "react";
import "../styles/texttospeesh.css";
import { mic } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
const SpeechToTextTranslator = () => {
  const [sinhalaText, setSinhalaText] = useState("");

  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "si-LK";

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSinhalaText(speechToText);
    };

    recognition.start();
  };

  return (
    <div className="container1">
      <button onClick={handleSpeechRecognition}>
        <IonIcon icon={mic} className="icons" />
      </button>

      <div>
        <h3 className="Heder3">
          <p className="paregraph">Sinhala Text :</p> <p>{sinhalaText}</p>
        </h3>
      </div>
    </div>
  );
};

export default SpeechToTextTranslator;
