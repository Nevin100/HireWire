import {
  registerUser,
  loginUser,
  getProfile,
} from "../Controllers/Auth.Controller.js";
import verifyToken from "../Middlewares/Auth.Middleware.js";
import express from "express";

const router = express.Router();

//Register :
router.post("/register", registerUser);

//Login :
router.post("/login", loginUser);

//get Profile :
router.get("/profile", verifyToken, getProfile);

export default router;
