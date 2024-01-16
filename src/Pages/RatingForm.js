// \chicken-website\src\Pages\RatingForm.js
import React, { useEffect, useState } from "react";
import "./RatingForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SubmitReview } from "../utils/authUtils";

function LeaveRating() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReviewSubmitted, setReviewSubmitted] = useState(false);
  const [message, setmessage] = useState("");
  const [review, setReview] = useState({
    stars: null,
    comments: "",
  });

  useEffect(() => {
    // console.log(token);
    try {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("not logged in:", error);
    }
  });

  const handleInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleStarRating = (rating) => {
    setReview({ ...review, stars: rating });
    console.log(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SubmitReview(token, review); // handles request to server to save review

      console.log("Review submitted:", review);

      setReviewSubmitted(true); // so we can exit the review when we are done!
    } catch (error) {
      console.error("Error submitting review:", error);
      setmessage("Internal server error please try again later");
    }
  };

  const renderReviewForm = () => (
    <div className="border">
      <p className="errormessage">{message}</p>
      <h1>Egg Gardens</h1>
      <form onSubmit={handleSubmit}>
        <div className="star-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={review.stars >= star ? "star on" : "star off"}
              onClick={() => handleStarRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <label className="lables">Tell us what you think!</label>
        <textarea
          rows="10"
          cols="45"
          value={review.comments}
          onChange={handleInputChange}
          type="comments"
          placeholder="Your comments"
          id="comments"
          name="comments"
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div className="Form-Container">
      {isLoggedIn ? (
        <>
          {!isReviewSubmitted ? (
            renderReviewForm()
          ) : (
            <button className="NotLoggedIn" onClick={() => navigate("/")}>
              Thank you for your review!
            </button>
          )}
        </>
      ) : (
        <button className="NotLoggedIn" onClick={() => navigate("/Login")}>
          To leave a review please login
        </button>
      )}
    </div>
  );
}

export default LeaveRating;
