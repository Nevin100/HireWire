/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input.jsx";
import { validateEmail } from "../../Util/helper.js";

const Login = ({ setcurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventdefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
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
