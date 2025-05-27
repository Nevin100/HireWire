import express from "express";
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from "../Controllers/Question.Controller.js";
import verifyToken from "../Middlewares/Auth.Middleware.js";

const router = express.Router();

// Add Question to session :
router.post("/add", verifyToken, addQuestionsToSession);

// Toggle Pin and Note for Question:
router.post("/:id/pin", verifyToken, togglePinQuestion);

// Update Question Note:
router.post("/:id/note", verifyToken, updateQuestionNote);

export default router;
