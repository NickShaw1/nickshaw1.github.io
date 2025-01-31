import { useState } from "react";
import { Link } from "react-router-dom";

import cat1 from "./cat1.jpg";
import cat2 from "./cat2.jpg";
import cat3 from "./cat3.jpg";
import cat4 from "./cat4.jpg";
import cat5 from "./cat5.jpg";

import "./Carousel.css";

const reviews = [
  {
    id: 1,
    author: "Whiskers McFluff",
    job: "Senior Developer",
    img: cat1,
    info: `"This software is incredible! It's intuitive, saves so much time, and makes tasks so much easier and more efficient."`,
  },
  {
    id: 2,
    author: "Gizmo Furrington",
    job: "Product Owner",
    img: cat2,
    info: `"Absolutely brilliant! Fast, reliable, and makes everything more organized. I can’t imagine working without it now."`,
  },
  {
    id: 3,
    author: "Luna Pawsworth",
    job: "Test Lead",
    img: cat3,
    info: `"Effortless to use! This software makes tasks so much faster and keeps everything organized. A must-have."`,
  },
  {
    id: 4,
    author: "Jasper Tailington",
    job: "Chief Architect",
    img: cat4,
    info: `"The interface is clean, and it makes everything so much easier. I can't imagine working without it."`,
  },
  {
    id: 5,
    author: "Bella Snuggleton",
    job: "CTO",
    img: cat5,
    info: `"I really love it! It’s so easy to navigate and has completely transformed the way I work. Total game changer."`,
  },
];

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);

  const showPerson = (index) => {
    const item = reviews[index];
    return (
      <div className="review">
        <div className="img-container">
          <img src={item.img} alt={item.author} />
        </div>
        <h4>{item.author}</h4>
        <p>{item.job}</p>
        <p>{item.info}</p>
      </div>
    );
  };

  const nextPerson = () => {
    setCurrentItem((prevItem) =>
      prevItem === reviews.length - 1 ? 0 : prevItem + 1
    );
  };

  const prevPerson = () => {
    setCurrentItem((prevItem) =>
      prevItem === 0 ? reviews.length - 1 : prevItem - 1
    );
  };

  const randomPerson = () => {
    setCurrentItem(Math.floor(Math.random() * reviews.length));
  };

  return (
    <main className="main">
      <h1>Reviews Carousel</h1>
      <section className="container">
        <div className="title">
          <h2>Our Reviews</h2>
          <div className="underline"></div>
        </div>
        {showPerson(currentItem)}
        <div className="button-container">
          <button className="prev-btn" onClick={prevPerson}>
            &#x2039;
          </button>
          <button className="next-btn" onClick={nextPerson}>
            &#x203A;
          </button>
        </div>
        <button className="random-btn" onClick={randomPerson}>
          Surprise me
        </button>
      </section>
      <div className="return">
        <div className="return1">
          <p>
            Click&nbsp;
            <Link to="/portfolio" title="Return to the portfolio home">
              here&nbsp;
            </Link>
            to return to portfolio home.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Carousel;
