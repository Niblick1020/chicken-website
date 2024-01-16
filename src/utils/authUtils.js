// This is my path
// \chicken-website\src\utils\authUtils.js

import axios from "axios";

const baseURL = "http://ec2-18-222-178-24.us-east-2.compute.amazonaws.com:5000";

export async function extractUserFirstName(token) {
  try {
    const response = await axios.get(`${baseURL}/api/protected/firstname`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // For JSON data
      },
    });
    console.log("result fetching firstname:", response.data.firstname);
    return response.data.firstname;
  } catch (error) {
    console.error("Error fetching firstname:", error);
    throw error;
  }
}

export async function GetReviews(token) {
  try {
    const response = await axios.get(`${baseURL}/api/reviews/retrieve`);
    console.log("result fetching 3 random reviews:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching 3 random reviews:", error);
    throw error;
  }
}

export async function SubmitReview(token, review) {
  try {
    const response = await axios.post(
      `${baseURL}/api/reviews/submit`,
      { review },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // For JSON data
        },
      }
    );
    console.log("SubmitReview response:", response);
    return response;
  } catch (error) {
    console.error("Error with SubmitReview request:", error);
    throw error;
  }
}
