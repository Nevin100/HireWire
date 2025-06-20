import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectDb from "./Utils/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/Auth.routes.js";
import sessionRoutes from "./Routes/Session.routes.js";
import questionRoutes from "./Routes/Question.Routes.js";
import verifyToken from "./Middlewares/Auth.Middleware.js";
import { conceptExplainPrompt, questionAnswerPrompt } from "./Utils/prompt.js";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://hire-wire.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

//Routes :
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From the backend");
});

//ai-generated routes:
app.use("/api/ai/generate-questions", verifyToken, async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = result.candidates[0].content.parts[0].text;
    if (!rawText) {
      return res.status(500).json({ error: "No response from AI" });
    }

    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanText);
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Gemini error:", error?.response || error);
    res.status(500).json({ error: "Failed to generate interview questions" });
  }
});

//ai- explanations
app.use("/api/ai/generate-explanations", verifyToken, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response.candidates[0].content.parts[0].text;
    if (!rawText) {
      return res.status(500).json({ error: "No response from AI" });
    }

    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanText);
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Gemini error:", error?.response || error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
