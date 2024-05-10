import React, { useState } from "react";
import "../styles/translate.css";
import SinglishTranslate from "./singlishTranslate";
import { swapHorizontalOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import axios from "axios";
import { toast } from "react-toastify";
//--------------------------------------------
function Translate() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("si");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [singlishInput, setSinglishInput] = useState(""); // Singlish input
  const [translatedSinglishText, setTranslatedSinglishText] = useState(""); // Singlish translation
  const [inputCharsCount, setInputCharsCount] = useState(0); // Handle character input limit

  // Singlish Translation
  const handleSinglishInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length > 5000) {
      setSinglishInput(newValue.slice(0, 5000));
    } else {
      setSinglishInput(newValue);
    }

    // Perform translation and update translatedText state
    const newTranslatedText = SinglishTranslate(newValue);
    setInputCharsCount(newValue.length);
    setTranslatedSinglishText(newTranslatedText);
  };

  // Translation function
  const handleTranslation = () => {
    const inputLanguageCode = inputLang;
    const outputLanguageCode = outputLang;

    // API URL
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguageCode}&tl=${outputLanguageCode}&dt=t&q=${encodeURI(
      inputText
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const translatedText = json[0].map((item) => item[0]).join("");
        setTranslatedText(translatedText); // Update React state with translated text
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputLangChange = (event) => {
    const selectedLang = event.target.value;
    setInputLang(selectedLang);
  };

  const handleOutputLangChange = (event) => {
    setOutputLang(event.target.value);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length > 5000) {
      setInputText(newValue.slice(0, 5000));
    } else {
      setInputText(newValue);
    }

    handleTranslation();
    setInputCharsCount(newValue.length);
  };

  const handleSwapLanguages = () => {
    // Swap input and output languages
    setInputLang((prevInputLang) => (prevInputLang === "en" ? "si" : "en"));
    setOutputLang((prevOutputLang) => (prevOutputLang === "en" ? "si" : "en"));

    // Swap input and output text values using state variables
    const tempInputText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempInputText);
  };

  //-------------------------------------------------History post-------------------------------------------------------
  const handleTranslationHistoryPost = () => {
    if (inputText && translatedText) {
      // Make a POST request to save translation history
      axios
        .post("http://localhost:8090/api/translation/history", {
          originalText: inputText,
          translatedText: translatedText,
        })
        .then((response) => {
          console.log("Translation history saved:", response.data);
          toast.success("Translation history saved successfully!");
          // Optionally, you can update the translation history state here if needed
        })
        .catch((error) => {
          console.error("Error saving translation history:", error);
          toast.error("Error saving translation history");
        });
    } else {
      console.error(
        "Both input text and translated text are required to save translation history."
      );
    }
  };

  //-------------------------------------------------------------------------------------------------------------------

  return (
    <div className="translator-container">
      <div className="language-selector">
        <select
          className="language-dropdown"
          value={inputLang}
          onChange={handleInputLangChange}
        >
          <option value="en">English</option>
          <option value="si">සිංහල</option>
        </select>
        <div className="swap-position">
          <IonIcon icon={swapHorizontalOutline} onClick={handleSwapLanguages} />
        </div>
        <select
          className="language-dropdown"
          value={outputLang}
          onChange={handleOutputLangChange}
        >
          <option value="si" className="option">
            සිංහල
          </option>
          <option value="en" className="option">
            English
          </option>
        </select>
      </div>

      <div className="translation-boxes">
        {inputLang === "si" && (
          <div className="input-box">
            <div className="text-area">
              <textarea
                placeholder="Singlish වලින් ලියන්න..."
                autoFocus
                value={singlishInput}
                onChange={handleSinglishInputChange}
              />
              <div className="chars">
                <span id="input-chars">{inputCharsCount}</span> / 5000
              </div>
            </div>
          </div>
        )}

        <div className="input-box">
          <div className="text-area">
            <textarea
              id="translation-input"
              placeholder={`Enter text in ${
                inputLang === "si" ? "Sinhala..." : "English..."
              }`}
              value={inputLang === "si" ? translatedSinglishText : inputText}
              onChange={handleInputChange}
            />
            {/* if input language is Sinhala chars will be hidden in normal input box */}
            {inputLang === "si" ? (
              <div className="chars" style={{ display: "none" }}>
                <span id="input-chars">{inputCharsCount}</span> / 5000
              </div>
            ) : (
              <div className="chars">
                <span id="input-chars">{inputCharsCount}</span> / 5000
              </div>
            )}
          </div>
        </div>

        <div className="output-box">
          <textarea
            id="translation-output"
            placeholder={`Translated text in ${
              outputLang === "si" ? "Sinhala" : "English"
            }`}
            value={translatedText}
            readOnly
          />
        </div>
      </div>

      <div className="save-translation-item">
        <button onClick={handleTranslationHistoryPost}>Save Translate</button>
      </div>
    </div>
  );
}

export default Translate;
