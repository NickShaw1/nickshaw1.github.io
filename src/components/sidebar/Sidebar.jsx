import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ toggleSidebar }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const resetAnimation = () => {
    document.querySelectorAll(".sidebar ul li").forEach((li) => {
      li.classList.remove("animate");
      void li.offsetWidth; // Trigger reflow
      li.classList.add("animate");
    });
  };

  const handleClose = () => {
    setShow(false);
    toggleSidebar();

    // Delay animation reset slightly after closing
    setTimeout(resetAnimation, 300);
  };

  const toggleShow = () => {
    setShow(!show);

    if (!show) {
      setTimeout(resetAnimation, 50); // Ensure animation resets before opening
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button onClick={toggleShow} className="hamburger">
        ☰
      </button>

      {/* Keep overlay in the DOM, and use visibility to hide it when sidebar is closed */}
      <div
        className={`overlay ${show ? "show" : ""}`}
        onClick={handleClose}
      ></div>

      <div className={`sidebar ${show ? "show" : ""}`}>
        <div className="sidebar-body">
          <ul>
            <li className="animate">
              <Link to="/" onClick={handleClose}>
                Home
              </Link>
            </li>
            <li className="animate">
              <Link to="/about" onClick={handleClose}>
                About
              </Link>
            </li>
            <li className="animate">
              <Link to="/blog" onClick={handleClose}>
                Blog
              </Link>
            </li>
            <li className="animate">
              <Link to="/portfolio" onClick={handleClose}>
                Portfolio
              </Link>
            </li>
            <li className="animate">
              <Link to="/contact" onClick={handleClose}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
