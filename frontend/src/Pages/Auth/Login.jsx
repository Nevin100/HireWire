import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input.jsx";
import { validateEmail } from "../../Util/helper.js";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import { UserContext } from "../../Context/UserContext.jsx";

const Login = ({ setcurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      console.log("Login response:", response.data);
      const accessToken = response.data.accessToken;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold text-black mb-4 ">Welcome Back</h3>
      <p className="text-lg mb-6">Please Enter your details to log in </p>

      <form onSubmit={handleLogin}>
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
          label="Password :"
        />

        {error && <span className="text-md text-red-500 pb-2.5n">{error}</span>}

        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="text-[15px] text-slate-800 mt-4">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setcurrentPage("signup");
            }}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
