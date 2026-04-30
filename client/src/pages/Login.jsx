import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submit = async () => {
    try {
      const url = isLogin
        ? "/auth/login"
        : "/auth/register";

      const res = await API.post(
        url,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");
    } catch  (error) {
  console.log(error.response.data);
  alert(error.response.data.message);
}
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-6">

          {isLogin
            ? "Login"
            : "Register"}

        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {isLogin
            ? "Login"
            : "Register"}
        </button>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
        >
          {isLogin
            ? "Create account"
            : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Login;