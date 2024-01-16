// This is my file path
// \chicken-website\src\Pages\Home.js
import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel from "../components/ImageSlideshow";
import Rating from "../components/ratings";

// import photo from "../images/SlideShow/egg1.jpg";
import eggs1 from "../images/SlideShow/eggs1.jpg";
import garden1 from "../images/SlideShow/garden1.jpg";
import cat1 from "../images/SlideShow/cat1.jpg";
import eggs2 from "../images/SlideShow/eggs2.jpg";
import chicken1 from "../images/SlideShow/chicken1.jpg";
import eggs3 from "../images/SlideShow/eggs3.jpg";
import chicken2 from "../images/SlideShow/chicken2.jpg";
import eggs4 from "../images/SlideShow/eggs4.jpg";

const items = [eggs1, garden1, cat1, eggs2, chicken1, eggs3, chicken2, eggs4];

function Home() {
  return (
    <div className="home-container">
      <div className="item1">
        <Carousel items={items} active={0} />
      </div>
      <div className="item2">
        <Rating />
      </div>
    </div>
  );
}

export default Home;
