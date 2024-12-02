import express from "express";
import cors from "cors";
import * as matchController from "./controllers/matchController";
import "./utils/cronResolver"; // Ensure cron job starts
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Match Routes
app.post("/matches", matchController.createMatch);
app.get("/matches", matchController.getMatches);
app.get("/matches/:id", matchController.getMatchById);
app.get("/matches/group/:group", matchController.getMatchesByGroup);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
