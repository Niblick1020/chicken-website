// This is the File path
// \chicken-website\frontend\src\Pages\Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import "./Login.css";

const baseURL = "http://ec2-18-222-178-24.us-east-2.compute.amazonaws.com:5000";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [message, setmessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstname, lastname, email, pass);

    try {
      const response = await axios.post(
        `${baseURL}/api/users/register`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json", // For JSON data
          },
        }
      );

      console.log("Registration successful:", response.data);
      const { token } = response.data;
      // Store the token upon successful login
      login(token);
      navigate("/Profile");
      // if(response.data.response.data)
      // Handle successful registration, e.g., navigate to a success page or display a message
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response.data.error === "Email already registered") {
        setmessage("Email already registered. Please Log In");
      }
      // Handle registration errors, e.g., display error messages to the user
    }
  };
  console.log("testing Register");

  return (
    <div className="Form-Container">
      <div className="border">
        <form onSubmit={handleSubmit}>
          <p>{message}</p>
          <h1>Register</h1>
          <label htmlFor="First name">First name</label>
          <input
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
              //   console.log(e);
            }}
            type="First name"
            placeholder="First name"
            id="First name"
            name="First name"
          />
          <label htmlFor="Last name">Last name</label>
          <input
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
              //   console.log(e);
            }}
            type="Last name"
            placeholder="Last name"
            id="Last name"
            name="Last name"
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              //   console.log(e);
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
          <button type="submit">Register</button>
        </form>
        <button className="link-button" onClick={() => navigate("/Login")}>
          Already have an account? Register
        </button>
      </div>
    </div>
  );
};
