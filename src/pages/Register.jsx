import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Frontend-only "account creation"
    console.log("New account:", { name, email, password });
    alert("Account created successfully");

    // After creating account → go to HOME
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-medium text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Sign up to continue
        </p>

        <input
          className="w-full border rounded-full px-4 py-2 mb-4"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-full px-4 py-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-full px-4 py-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;