import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    if (!isLogin && !name.trim()) {
      return setError("Name is required for registration");
    }

    if (!email.trim() || !password.trim()) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const url = isLogin
        ? "/auth/login"
        : "/auth/register";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await API.post(url, payload);

      localStorage.setItem("token", res.data.token);

      const displayName =
        res.data.user?.name || name;

      localStorage.setItem(
        "adminName",
        displayName
      );

      navigate("/dashboard");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 border border-red-200 p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded-lg mb-4 text-sm">
            ⏳ Server is starting for the first time. This may take 1–2 minutes. Please wait...
          </div>
        )}

        {!isLogin && (
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        )}

        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <div className="relative mb-4">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3 text-xs font-semibold text-gray-500 hover:text-blue-600 uppercase"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-200 ${
            isLogin
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          } ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
        >
          {loading
            ? "Starting Server..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>

        <p
          className="mt-5 text-sm text-blue-600 cursor-pointer text-center hover:underline"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "Create account"
            : "Already have an account?"}
        </p>

      </div>
    </div>
  );
}

export default Login;