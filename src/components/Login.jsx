
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-khzy">
      <div className="bg-green-ziti p-8 rounded-2xl shadow-lg w-full max-w-md border border-yellow-gold1">
        <h2 className="text-2xl text-yellow-gold1 mb-6 text-center font-bold">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-yellow-gold rounded-lg bg-transparent text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-yellow-gold rounded-lg bg-transparent text-white"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-gold text-green-ziti py-3 rounded-xl font-bold hover:bg-yellow-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
