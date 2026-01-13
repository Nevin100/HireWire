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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request origin:", origin);
      const allowedOrigins = [
        "http://localhost:5173",
        "https://hire-wire-three.vercel.app",
        "https://hirewire.nevinbali.me"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(" Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
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

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.1-8b-instant";

const callGroq = async (prompt) => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON. Do not include explanations, markdown, or extra text.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: "json_object" }, // 🔥 THIS FIXES IT
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Groq error:", err);
    throw new Error("Groq API failed");
  }

  const data = await response.json();
  return data.choices[0].message.content;
};


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

    const rawText = await callGroq(prompt);

    const cleanText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleanText);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Groq error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate interview questions" });
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

    const rawText = await callGroq(prompt);

    const cleanText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleanText);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "src", "Uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
