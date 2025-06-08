import express from "express";
import {
  createSession,
  getSession,
  getSessions,
  deleteSession,
} from "../Controllers/Session.Controller.js";

import verifyToken from "../Middlewares/Auth.Middleware.js";

const router = express.Router();

//Create Session :
router.post("/create-session", verifyToken, createSession);

//Get Session :
router.get("/get-session/:id", verifyToken, getSession);

// get All Sessions :
router.get("/get-all-sessions", verifyToken, getSessions);

//Delete Session :
router.delete("/delete-session/:id", verifyToken, deleteSession);

export default router;
