import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles.css";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const API_URL = import.meta.env.VITE_API;

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await axios.post(
        `${API_URL}/auth/login`,
        {
          username: username,
          password: password
        }
      );

      console.log(res.data);

      // Save token if backend returns one
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {

      console.log(err);
      setError("Invalid login credentials");

    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>HireNaija AI Recruiter</h2>
        <p className="login-sub">Recruit smarter with AI powered screening</p>

        <form onSubmit={handleLogin}>

          {/* <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          /> */}
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}