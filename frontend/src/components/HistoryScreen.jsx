import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/History.css";

const TranslationHistory = () => {
  const [translationHistory, setTranslationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //----------------------------------------------Fetch function-----------------------------------------------------
    const fetchTranslationHistory = async () => {
      try {
        const response = await axios.get("/api/translation/history");
        setTranslationHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTranslationHistory();
  }, []);

  //----------------------------------------------delete function-----------------------------------------------------
  const handleDeleteTranslation = async (id) => {
    try {
      await axios.delete(`/api/translation/history/${id}`);
      setTranslationHistory((prevHistory) =>
        prevHistory.filter((translation) => translation._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container1" id="histry-div">
      <h2 className="form-name-histor">Translation History</h2>
      {translationHistory && translationHistory.length === 0 ? (
        <p className="histry-error">No translation history available.</p>
      ) : (
        <ul>
          {translationHistory.map((translation, index) => (
            <li key={index}>
              <div>
                <strong>Original Text:</strong> {translation.originalText}
              </div>
              <div>
                <strong>Translated Text:</strong> {translation.translatedText}
              </div>
              <button onClick={() => handleDeleteTranslation(translation._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslationHistory;
