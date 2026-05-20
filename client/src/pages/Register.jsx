import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { errorAlert } from "../utils/alert";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const submit = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminName", res.data.user.name); 

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      errorAlert("Register Failed", error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-3 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-500 hover:text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={submit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition-colors"
        >
          Register
        </button>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer text-center"
          onClick={() => navigate("/login")}
        >
          Already have account?
        </p>
      </div>
    </div>
  );
}

export default Register;