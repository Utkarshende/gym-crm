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

    if (!isLogin && !name) {
      return setError("Name is required for registration");
    }
    if (!email || !password) {
      return setError("All fields required");
    }

    try {
      setLoading(true);

      const url = isLogin ? "/auth/login" : "/auth/register";
      
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password };

      const res = await API.post(url, payload);

      localStorage.setItem("token", res.data.token);
    
      const displayName = res.data.user?.name || name;
      localStorage.setItem("adminName", displayName);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        {!isLogin && (
          <input
            className="w-full border p-3 rounded mb-4 focus:outline-blue-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full border p-3 rounded mb-4 focus:outline-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-3 rounded focus:outline-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-xs font-semibold text-gray-500 hover:text-blue-600 uppercase"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold transition-all ${
            isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer text-center hover:underline"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(""); 
          }}
        >
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Login;