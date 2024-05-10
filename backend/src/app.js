import express from "express";
import cors from "cors"; //cross-origin resource sharing : access control
import logger from "./utils/logger"; //UTILS
import "dotenv/config";

import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2> Recipe App</h2>");
  next();
});

import translationHistoryRoutes from "./api/routes/translationHistoryRoutes";
import userRouter from "./api/routes/userRoutes";

app.use("/user", userRouter);
app.use("/api", translationHistoryRoutes);
app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect();
});
