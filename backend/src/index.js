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
        "https://hirewire.nevinbali.me",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by cors", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From the backend");
});

// Safe JSON parser — handles truncated Groq responses
const safeParseJSON = (rawText) => {
  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  // First try: direct parse
  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  // Second try: extract outermost array
  const arrStart = cleaned.indexOf("[");
  const arrEnd = cleaned.lastIndexOf("]");
  if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
    try {
      return JSON.parse(cleaned.slice(arrStart, arrEnd + 1));
    } catch (_) {}
  }

  // Third try: extract outermost object
  const objStart = cleaned.indexOf("{");
  const objEnd = cleaned.lastIndexOf("}");
  if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
    try {
      return JSON.parse(cleaned.slice(objStart, objEnd + 1));
    } catch (_) {}
  }

  throw new SyntaxError("Could not parse Groq response as JSON");
};

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
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid, complete JSON. Do not truncate. Do not include explanations, markdown, or extra text.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 4096, // increased from 1200 to prevent truncation
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Groq API error response:", err);
    throw new Error("Groq API failed");
  }

  const data = await response.json();

  // Log finish_reason so we know if it still truncates
  const finishReason = data.choices?.[0]?.finish_reason;
  if (finishReason && finishReason !== "stop") {
    console.warn(`Groq finish_reason: ${finishReason} — response may be incomplete`);
  }

  return data.choices[0].message.content;
};

// AI: Generate interview questions
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
    const data = safeParseJSON(rawText);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error from generate-questions:", error.message);
    res.status(500).json({ error: "Failed to generate interview questions" });
  }
});

// AI: Generate concept explanation
app.use("/api/ai/generate-explanations", verifyToken, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = conceptExplainPrompt(question);

    const rawText = await callGroq(prompt);
    const data = safeParseJSON(rawText);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error from generate-explanations:", error.message);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "src", "Uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});