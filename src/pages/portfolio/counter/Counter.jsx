import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/Home.css";
import "../counter/Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const updateColor = () => {
    if (count === 0) {
      return "#eaeceb";
    } else if (count > 0) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <div className="main">
      <h1>Counter</h1>
      <span id="value" style={{ color: updateColor() }}>
        {count}
      </span>
      <div className="button-container">
        <div className="btn decrease" onClick={() => setCount(count - 1)}>
          Decrease
        </div>
        <div className="btn reset" onClick={() => setCount(0)}>
          Reset
        </div>
        <div className="btn increase" onClick={() => setCount(count + 1)}>
          Increase
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
    </div>
  );
};

export default Counter;
