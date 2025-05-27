import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";

//Rergister User :
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password || !profileImageUrl) {
      return res
        .status(401)
        .json({ message: "Fields cant be Empty", error: true });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ message: "User already Exists", error: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      profileImageUrl,
    });

    if (newUser) {
      const accessToken = generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        message: "User Created Successfully",
        error: false,
        data: newUser,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    console.log("Internal Server Issue");
    res.status(500).json({ message: "Errror", error: error });
  }
};

//Login user :
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ message: "User doesnt Exists", error: true });
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials", error: true });
  }

  const accessToken = generateToken(user._id, res);
  res.status(200).json({
    message: "User Loggedin Successfull",
    error: false,
    data: user,
    accessToken: accessToken,
  });

  try {
  } catch (error) {
    console.log("Internal Server Issue");
    res.status(500).json({ message: "Errror", error: error });
  }
};

//Profile :
export const getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    res.status(200).json({
      message: "User Profile retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    console.log("Internal Server Issue");
    res.status(500).json({ message: "Errror", error: error });
  }
};
