import React, { useState, useEffect } from "react";

const Login = () => {
  const [state, setState] = useState("Login");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">

  <div className="relative bg-white w-full max-w-md rounded-2xl px-10 py-8 shadow-xl text-slate-500">

    <button className="absolute top-5 right-5 text-xl text-slate-400 hover:text-slate-600">
      ✕
    </button>

    <h1 className="text-center text-2xl font-semibold text-neutral-700">
      {state}
    </h1>

    <p className="text-center text-sm mt-1 text-slate-500">
      Welcome back! Please sign up to continue
    </p>

    {/* FULL NAME */}
    {state !== "Login" && (
      <div className="mt-6 flex items-center gap-3 border border-slate-200 rounded-full px-5 py-3">
        <span className="text-slate-400">👤</span>
        <input
          className="w-full bg-transparent text-sm outline-none placeholder-slate-400"
          placeholder="Full Name"
        />
      </div>
    )}

    {/* EMAIL */}
    <div className="mt-4 flex items-center gap-3 border border-slate-200 rounded-full px-5 py-3">
      <span className="text-slate-400">✉️</span>
      <input
        className="w-full bg-transparent text-sm outline-none placeholder-slate-400"
        placeholder="Email id"
      />
    </div>

    {/* PASSWORD */}
    <div className="mt-4 flex items-center gap-3 border border-slate-200 rounded-full px-5 py-3">
      <span className="text-slate-400">🔒</span>
      <input
        type="password"
        className="w-full bg-transparent text-sm outline-none placeholder-slate-400"
        placeholder="Password"
      />
    </div>

    <p className="mt-4 text-sm text-blue-600 cursor-pointer">
      Forgot password?
    </p>

    <button className="mt-4 w-full rounded-full bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition">
      {state === "Login" ? "Login" : "Create Account"}
    </button>

    <p className="mt-6 text-center text-sm text-slate-600">
      {state === "Login" ? (
        <>
          Don't have an account?{" "}
          <span
            onClick={() => setState("Sign Up")}
            className="cursor-pointer text-blue-600 font-medium"
          >
            Sign up
          </span>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <span
            onClick={() => setState("Login")}
            className="cursor-pointer text-blue-600 font-medium"
          >
            Login
          </span>
        </>
      )}
    </p>

  </div>
</div>
    
  );
};

export default Login;