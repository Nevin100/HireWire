import {
  registerUser,
  loginUser,
  getProfile,
} from "../Controllers/Auth.Controller.js";
import verifyToken from "../Middlewares/Auth.Middleware.js";
import express from "express";
import upload from "../Middlewares/Upload.Middleware.js";

const router = express.Router();

//Register :
router.post("/register", registerUser);

//Login :
router.post("/login", loginUser);

//get Profile :
router.get("/profile", verifyToken, getProfile);

// upload Image :
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const ImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl: ImageUrl });
});

export default router;
