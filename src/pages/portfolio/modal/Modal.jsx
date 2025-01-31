import { useState } from "react";

import catImage from "./cat3.jpg";

import "../../../css/Home.css";
import "./Modal.css";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="main">
      <h1>Modal</h1>
      <button className="btn modal-btn" onClick={() => setIsOpen(true)}>
        Open modal
      </button>

      {isOpen && (
        <div className="modal-overlay open-modal">
          <div className="modal-container">
            <h3>Modal content</h3>
            <div className="containercat">
              <div className="cat">
                <img src={catImage} title="cat" alt="cat" />
              </div>
              <div className="right">
                <h4>Modal subtitle</h4>
                <p>Modal content text body</p>
              </div>
            </div>
            <footer className="footer">
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                Close modal
              </button>
            </footer>
          </div>
        </div>
      )}

      <div className="return">
        <div className="return1">
          <p>
            Click&nbsp;
            <a href="/Portfolio" title="Return to the Portfolio home">
              <b>here</b>
            </a>
            &nbsp;to return to portfolio home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
