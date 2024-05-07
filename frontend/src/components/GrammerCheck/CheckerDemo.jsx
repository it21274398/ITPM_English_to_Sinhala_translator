import React, { useState } from "react";
import Styles from "./checkerDemo.module.css";
import nouns from "./database/nouns";
import firstPersonVerbs from "./database/firstPersonVerbs";
import secondPersonVerbs from "./database/secondPersonVerbs";
import spokenVerbs from "./database/spokenVerbs";
import singlishToUnicode from "./singlishToUnicode";

function CheckerDemo() {
  const [singlishText, setSinglishText] = useState(""); // Singlish text
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  // Singlish conversion
  const handleSinglishInputChange = (event) => {
    const newValue = event.target.value;
    const newConvertedText = singlishToUnicode(newValue);

    setSinglishText(newConvertedText);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGrammarCheck = () => {
    if (!inputText.trim() && !singlishText.trim()) {
      setError("Please enter a Sinhala paragraph or Singlish text!");
      setOutputText("");
      return;
    } else {
      setError(""); // Clear any previous errors
    }

    const sentences = inputText.split(/[.?,]/);
    let correctedParagraph = "";

    sentences.forEach((sentence, index, array) => {
      // Your existing logic for grammar check...
    });

    setOutputText(correctedParagraph);
  };

  return (
    <div className={Styles.gcContainer}>
      <br />
      <br />
      <div className={Styles.sinInputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Singlish වලින් ලියන්න..."
          onChange={handleSinglishInputChange}
        />
      </div>
      <div className={Styles.inputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter Sinhala paragraph here..."
          value={singlishText}
          onChange={handleInputChange}
        />
      </div>
      <button className={Styles.checkBtn} onClick={handleGrammarCheck}>
        Check Grammar
      </button>
      {error && <div className={Styles.error}>{error}</div>}
      <div className={Styles.outputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Corrected Paragraph"
          value={outputText}
        />
      </div>
    </div>
  );
}

export default CheckerDemo;
