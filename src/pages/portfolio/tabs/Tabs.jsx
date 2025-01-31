import { useState } from "react";
import { Link } from "react-router-dom";
import vof from "./socal2.jpg";

import "./Tabs.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("location");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <main className="main">
      <h1>Tabs</h1>

      <div className="tabs-container">
        {" "}
        <button
          className={`tab-btn ${activeTab === "location" ? "active" : ""}`}
          onClick={() => handleTabClick("location")}
        >
          Location
        </button>{" "}
        <button
          className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
          onClick={() => handleTabClick("info")}
        >
          Information
        </button>
        <button
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => handleTabClick("history")}
        >
          History
        </button>
      </div>

      <div className="tabs-content">
        <div className="tabs-img">
          <img src={vof} alt="Valley of Fire" />
        </div>

        {activeTab === "location" && (
          <div className="tab-content">
            <h4>Location</h4>
            <p>
              The Valley of Fire in Nevada is a state park known for its red
              sandstone formations and desert scenery. Covering over 40,000
              acres, it features unique rock formations like the Fire Wave,
              ancient petroglyphs, and several hiking trails.
            </p>
          </div>
        )}

        {activeTab === "history" && (
          <div className="tab-content">
            <h4>History</h4>
            <p>
              The Valley of Fire has a rich history, with evidence of human
              activity dating back over 2,000 years. Ancient Native American
              tribes, including the Ancestral Puebloans and Basketmakers, left
              behind petroglyphs carved into the red sandstone.
            </p>
          </div>
        )}

        {activeTab === "info" && (
          <div className="tab-content">
            <h4>Information</h4>
            <p>
              The Valley of Fire is located about 50 miles northeast of Las
              Vegas, making it an easy day trip for visitors. The park is open
              year-round, with the best times to visit being spring and fall.
            </p>
          </div>
        )}
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

export default Tabs;
