import { useState } from "react";
import { Link } from "react-router-dom";

import "../../../css/Home.css";
import "./Accordian.css";

const questions = [
  {
    id: 1,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary based on the destination and will be calculated at checkout. Please note that customs fees or import taxes may apply in some regions.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it for a refund or exchange, provided the item is unused and in its original packaging. Visit our returns page for detailed instructions.",
  },
  {
    id: 3,
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you'll receive a confirmation email with a tracking link. Simply click the link to view the status of your delivery. You can also log into your account to track your order history.",
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="section-center">
      <h1>Accordion</h1>
      {questions.map((item, index) => (
        <article
          key={item.id}
          className={`question ${activeIndex === index ? "show-text" : ""}`}
        >
          <div className="question-title">
            <p>{item.question}</p>
            <button
              type="button"
              className="question-btn"
              onClick={() => toggleQuestion(index)}
            >
              <span
                className={`plus-icon ${activeIndex === index ? "hidden" : ""}`}
              >
                +
              </span>
              <span
                className={`minus-icon ${
                  activeIndex === index ? "visible" : "hidden"
                }`}
              >
                -
              </span>
            </button>
          </div>
          {activeIndex === index && (
            <div className="question-text">
              <div className="underline"></div>
              <p>{item.answer}</p>
            </div>
          )}
        </article>
      ))}

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
    </div>
  );
};

export default Accordion;
