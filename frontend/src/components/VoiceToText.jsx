import React, { useState } from "react";
import "../styles/texttospeesh.css";
import { mic } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const SpeechToTextTranslator = () => {
  const [sinhalaText, setSinhalaText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [error, setError] = useState(null); // State variable to handle errors

  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "si-LK";

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSinhalaText(speechToText);

      // Validate Sinhala text before translating
      if (speechToText.trim() !== "") {
        translateText(speechToText);
        setError(null); // Clear any previous errors
      } else {
        setError("Please speak something."); // Set error if input is empty
      }
    };

    recognition.start();
  };

  const translateText = async (text) => {
    try {
      const inputLanguageCode = "si";
      const outputLanguageCode = "en";

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguageCode}&tl=${outputLanguageCode}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      const translatedText = data[0][0][0];
      setEnglishText(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setEnglishText("Translation Error");
    }
  };

  return (
    <div className="container1">
      <button onClick={handleSpeechRecognition}>
        <IonIcon icon={mic} className="icons" />
      </button>

      <div>
        <h3 className="Heder4">
          <p className="paregraph">Sinhala Text :</p> <p>{sinhalaText}</p>
        </h3>
        <h3 className="Heder5">
          <p className="paregraph">English Translation :</p>{" "}
          <p>{englishText}</p>
        </h3>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message if there's an error */}
      </div>
    </div>
  );
};

export default SpeechToTextTranslator;
