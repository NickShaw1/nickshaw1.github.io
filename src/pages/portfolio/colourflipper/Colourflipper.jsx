import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../css/Home.css";
import "../colourflipper/Colourflipper.css";

const ColourFlipper = () => {
  const flipperContentRef = useRef(null);

  useEffect(() => {
    if (flipperContentRef.current) {
      console.log(flipperContentRef.current);
    }
  }, []);

  function setColour(name) {
    if (flipperContentRef.current) {
      flipperContentRef.current.style.backgroundColor = name;
    }
  }

  function randomColour() {
    const red = Math.round(Math.random() * 255);
    const green = Math.round(Math.random() * 255);
    const blue = Math.round(Math.random() * 255);
    const colour = `rgb(${red}, ${green}, ${blue})`;

    if (flipperContentRef.current) {
      flipperContentRef.current.style.backgroundColor = colour;
    }
  }

  function reset() {
    if (flipperContentRef.current) {
      flipperContentRef.current.style.backgroundColor = "#141414";
    }
  }

  return (
    <main className="main" id="main-content">
      <h1>Colour Flipper</h1>
      <div id="flipper" ref={flipperContentRef}>
        <div id="red" className="color-box" onClick={() => setColour("red")}>
          Red
        </div>
        <div
          id="green"
          className="color-box"
          onClick={() => setColour("green")}
        >
          Green
        </div>
        <div id="blue" className="color-box" onClick={() => setColour("blue")}>
          Blue
        </div>
        <div id="random" className="color-box" onClick={randomColour}>
          Random
        </div>
        <div id="reset" className="color-box" onClick={reset}>
          Reset
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

export default ColourFlipper;
