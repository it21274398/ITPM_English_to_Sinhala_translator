import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/History.css";
import { toast } from "react-toastify";

import jsPDF from "jspdf";

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

  const filteredHistory = translationHistory.filter((translation) =>
    translation.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadPdf = () => {
    const doc = new jsPDF();
    let yOffset = 10;
    filteredHistory.forEach((translation) => {
      doc.text(`Original Text: ${translation.originalText}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Translated Text: ${translation.translatedText}`, 10, yOffset);
      yOffset += 20;
    });
    doc.save("Translation_history.pdf");
  };

  return (
    <div className="container2" id="histry-div">
      <h2 className="form-name-histor">
        <strong>Translation History</strong>
      </h2>
      <div>
        <input
          type="text"
          placeholder="Search by Translated Text"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={downloadPdf}>Download PDF</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="histry-error">{error}</p>
      ) : filteredHistory.length === 0 ? (
        <p className="histry-error">No translation history available.</p>
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
