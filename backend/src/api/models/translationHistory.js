import mongoose from "mongoose";

const translationHistorySchema = new mongoose.Schema({
  originalText: {
    type: String,
    required: true,
  },
  translatedText: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const TranslationHistory = mongoose.model(
  "TranslationHistory",
  translationHistorySchema
);

export default TranslationHistory;
