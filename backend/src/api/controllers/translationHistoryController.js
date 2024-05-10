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
    });
    const savedTranslation = await translation.save();
    res.status(201).json(savedTranslation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New function to delete translation by ID
export const deleteTranslationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await TranslationHistory.findByIdAndDelete(id);
    res.status(204).end(); // Successfully deleted
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
