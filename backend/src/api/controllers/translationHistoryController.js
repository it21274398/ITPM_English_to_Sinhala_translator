import TranslationHistory from "../models/translationHistory.js";

export const getTranslationHistory = async (req, res, next) => {
  try {
    const translationHistory = await TranslationHistory.find();
    res.json(translationHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveTranslation = async (req, res, next) => {
  try {
    const { originalText, translatedText } = req.body;
    const translation = new TranslationHistory({
      originalText,
      translatedText,
      // Add more fields as needed
    });
    const savedTranslation = await translation.save();
    res.status(201).json(savedTranslation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
