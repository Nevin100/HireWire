import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectDb from "./Utils/db.js";

import authRoutes from "./Routes/Auth.routes.js";
// import sessinRoutes from "./Routes/"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

//Routes :
app.use("/api/auth", authRoutes);
// app.use("/api/sessions", authRoutes);
// app.use("/api/questions", authRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
