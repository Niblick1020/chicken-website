// \chicken-website\src\Pages\Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";

const baseURL = "http://ec2-18-222-178-24.us-east-2.compute.amazonaws.com:5000";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuth();
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pass);

    try {
      const response = await axios.post(
        `${baseURL}/api/users/login`,
        {
          email: email,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json", // For JSON data
          },
        }
      );
      const { token } = response.data;
      // Store the token upon successful login
      login(token);
      console.log("Login successful:", response.data);

      // Send Client to the homepage
      navigate("/Profile");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.message == "Network Error") {
        setmessage("Internal server error. Please try again another time");
      } else if (
        error.response.data.error ===
        "Email not registered. Please register first"
      ) {
        setmessage(error.response.data.error);
      } else if (error.response.data.error === "Invalid email or password") {
        setmessage(error.response.data.error);
      }
    }
  };

  console.log("testing Login");

  return (
    <div className="Form-Container">
      <div className="border">
        <form onSubmit={handleSubmit}>
          <p>{message}</p>
          <h1>Login</h1>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-button" onClick={() => navigate("/Register")}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
}
export default Login;
