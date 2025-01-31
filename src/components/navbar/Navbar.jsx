import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        N<span className="dot">.</span>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="cv">
          <a href="/NickShawCV.pdf" target="_blank" rel="noopener noreferrer">
            My CV
          </a>
        </div>

        <div className="menu-toggle">
          <button onClick={toggleSidebar}>☰</button>
        </div>
      </div>

      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
