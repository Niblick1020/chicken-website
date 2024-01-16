// This is the file path
// \chicken-website\src\components\ratings.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetReviews } from "../utils/authUtils";
import "./ratings.css";

const Star = ({ filled }) => {
  return <span>{filled ? "★" : "☆"}</span>;
};

function Rating() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await GetReviews();
        setReviews(response);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating} />);
    }
    return stars;
  };

  return (
    <div>
      <h1 className="header">What do locals have to say about us!</h1>
      <div className="review-box">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{renderStars(review.stars)}</p>
            <p>{review.comments}</p>
          </div>
        ))}
      </div>
      <button className="button" onClick={() => navigate("/rating_form")}>
        Want to leave a review yourself?
      </button>
    </div>
  );
}
export default Rating;
