import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/History.css";

const TranslationHistory = () => {
  const [translationHistory, setTranslationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranslationHistory = async () => {
      try {
        // Make a request to your backend API to fetch the user's translation history
        const response = await axios.get("/api/translation/history");

        // Assuming the response data is an array of translation objects
        setTranslationHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTranslationHistory();
  }, []);

  return (
    <div className="container">
      <h2 className="form-name">Translation History</h2>
      {translationHistory && translationHistory.length === 0 ? (
        <p>No translation history available.</p>
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
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslationHistory;
