import express from "express";
import {
  getTranslationHistory,
  saveTranslation,
  deleteTranslationById, // Import the new function for deletion
} from "../controllers/translationHistoryController.js";

const translationHistoryRouter = express.Router();

// Route for fetching translation history
translationHistoryRouter.get("/translation/history", getTranslationHistory);

// Route for saving translations
translationHistoryRouter.post("/translation/history", saveTranslation);

// Route for deleting translations by ID
translationHistoryRouter.delete("/translation/history/:id", deleteTranslationById);

export default translationHistoryRouter;
