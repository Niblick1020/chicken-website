// \chicken-website\src\Pages\profile.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { extractUserFirstName } from "../utils/authUtils";

function Profile() {
  const { token } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          setIsLoggedIn(true);
          const firstname = await extractUserFirstName(token);
          setUserFirstName(firstname);
          console.log(firstname);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching firstname:", error);
      }
    };
    fetchData(); // Call the async function here
  }, [token]);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {userFirstName} </h1>
      ) : (
        <h1>Please login to view profile </h1>
      )}
    </div>
  );
}

export default Profile;
