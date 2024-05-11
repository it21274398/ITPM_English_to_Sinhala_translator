import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/History.css";
import { toast } from "react-toastify";

const TranslationHistory = () => {
  const [translationHistory, setTranslationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTranslationHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/translation/history"
        );
        setTranslationHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTranslationHistory();
  }, []);

  const handleDeleteTranslation = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/translation/history/${id}`);
      setTranslationHistory((prevHistory) =>
        prevHistory.filter((translation) => translation._id !== id)
      );
      toast.success("Deleted Successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredHistory = translationHistory.filter((translation) => {
    const originalText = translation.originalText.toLowerCase();
    const translatedText = translation.translatedText.toLowerCase();
    const query = searchQuery.toLowerCase();
    return originalText.includes(query) || translatedText.includes(query);
  });

  return (
    <div className="container2" id="history-div">
      <h2 className="form-name-histor">
        <strong>Translation History</strong>
      </h2>
      <input
        type="text"
        placeholder="Search by Translated Text or Original Text"
        value={searchQuery}
        onChange={handleSearch}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="history-error">{error}</p>
      ) : filteredHistory.length === 0 ? (
        <p className="history-error">No translation history available.</p>
      ) : (
        <ul>
          {filteredHistory.map((translation, index) => (
            <li className="translation-item" key={index}>
              <div className="translate-name-histor">
                <strong>Original Text :</strong> {translation.originalText}
              </div>
              <div className="translate-name-histor">
                <strong>Translated Text :</strong> {translation.translatedText}
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
