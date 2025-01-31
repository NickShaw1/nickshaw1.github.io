import { useState } from "react";
import { Link } from "react-router-dom";

import "../../../css/Home.css";
import "./Calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const appendToDisplay = (input) => {
    setDisplay((prev) => prev + input);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const calculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      console.error("Calculation error:", error);
      setDisplay("Error");
    }
  };

  const percentage = () => {
    if (display) {
      setDisplay((parseFloat(display) / 100).toString());
    }
  };

  const square = () => {
    if (display) {
      setDisplay(Math.pow(parseFloat(display), 2).toString());
    }
  };

  const sqrt = () => {
    if (display) {
      setDisplay(Math.sqrt(parseFloat(display)).toString());
    }
  };

  return (
    <main className="main">
      <h1>Calculator</h1>
      <div id="calculator">
        <input className="input" value={display} readOnly />
        <div id="keys">
          <button onClick={clearDisplay} className="dark-operator-btn">
            C
          </button>
          <button onClick={percentage} className="dark-operator-btn">
            %
          </button>
          <button onClick={square} className="dark-operator-btn">
            x²
          </button>
          <button onClick={sqrt} className="dark-operator-btn">
            &#8730;
          </button>
          {[7, 8, 9].map((num) => (
            <button key={num} onClick={() => appendToDisplay(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => appendToDisplay("*")} className="operator-btn">
            &times;
          </button>
          {[4, 5, 6].map((num) => (
            <button key={num} onClick={() => appendToDisplay(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => appendToDisplay("-")} className="operator-btn">
            &minus;
          </button>
          {[1, 2, 3].map((num) => (
            <button key={num} onClick={() => appendToDisplay(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => appendToDisplay("+")} className="operator-btn">
            +
          </button>
          <button onClick={() => appendToDisplay("0")}>0</button>
          <button onClick={() => appendToDisplay(".")}>.</button>
          <button onClick={calculate}>=</button>
          <button onClick={() => appendToDisplay("/")} className="operator-btn">
            /
          </button>
        </div>
      </div>

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

export default Calculator;
