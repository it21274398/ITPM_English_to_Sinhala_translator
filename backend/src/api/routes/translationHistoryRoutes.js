import express from "express";
import {
  getTranslationHistory,
  saveTranslation,
} from "../controllers/translationHistoryController.js";

const translationHistoryRouter = express.Router();

translationHistoryRouter.get("/translation/history", getTranslationHistory);
translationHistoryRouter.post("/translation/history", saveTranslation);

export default translationHistoryRouter;
