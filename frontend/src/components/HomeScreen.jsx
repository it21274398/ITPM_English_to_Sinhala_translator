import React, { useState } from "react";
import axios from "axios"; // for making HTTP requests

const Home = () => {
  const [englishText, setEnglishText] = useState("");
  const [sinhalaText, setSinhalaText] = useState("");

  const translateText = async () => {
    try {
      const response = await axios.post("/api/translate", {
        text: englishText,
      });
      setSinhalaText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div>
      <h1>English to Sinhala Translator</h1>
      <div>
        <textarea
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Enter English text here"
          rows={5}
          cols={50}
        />
      </div>
      <button onClick={translateText}>Translate</button>
      <div>
        <h2>Sinhala Translation:</h2>
        <p>{sinhalaText}</p>
      </div>
    </div>
  );
};

export default Home;
