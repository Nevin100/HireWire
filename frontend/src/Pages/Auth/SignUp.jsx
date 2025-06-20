import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input.jsx";
import ProfileSelector from "../../Components/Inputs/ProfileSelector.jsx";
import { validateEmail } from "../../Util/helper.js";
import { UserContext } from "../../Context/UserContext.jsx";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import uploadImage from "../../Util/uploadImage.js";

const SignUp = ({ setcurrentPage }) => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
    let profileImageUrl = "";

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      console.log("Signup response:", response.data);

      // ✅ Server sets cookie, so just set user context
      updateUser(response.data.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        setError(err.response.data.message || "Signup failed.");
      } else {
        setError("Network error. Check console.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold text-black mb-4">
        Create An Account
      </h3>
      <p className="text-lg mb-6">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        <ProfileSelector image={profilePic} setImage={setProfilePic} />
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="John Doe"
          label="Full Name"
        />

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="johndoe@gmail.com"
          label="Email"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          label="Password"
        />

        {error && <span className="text-md text-red-500 pb-2.5n">{error}</span>}

        <button type="submit" className="btn-primary">
          Signup
        </button>

        <p className="text-[15px] text-slate-800 mt-4">
          Already have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setcurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
