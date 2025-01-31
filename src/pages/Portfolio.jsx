import { Link } from "react-router-dom";
import nickImage from "../assets/nick-diner.jpg";
import counterImage from "../pages/portfolio/counter/counter.jpg";
import colourFlipperImage from "../pages/portfolio/colourflipper/colourflipper.jpg";
import modalImage from "../pages/portfolio/modal/modal.jpg";
import calcImage from "../pages/portfolio/calculator/calculator.jpg";
import accordianImage from "../pages/portfolio/accordian/accordian.jpg";
import tabsImage from "../pages/portfolio/tabs/tabs.jpg";
import carouselImage from "../pages/portfolio/carousel/carousel.jpg";
import "../css/Home.css";
import "../css/Portfolio.css";

const Portfolio = () => (
  <div className="overview">
    <div className="portfolio-main">
      <div className="portfolio-me">
        <div className="me-header">
          <div className="me-img">
            {" "}
            <img src={nickImage} alt="Nick" />
          </div>
        </div>
        <h1>
          Portfolio<span className="nickgreen">.</span>
        </h1>
        <p>
          Explore my projects to see how I approach problem-solving, design, and
          development. I intend to continue adding to the items below, along
          with further examples on my{" "}
          <a
            href="https://www.github.com/nickshaw1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
          </a>
          .
        </p>
      </div>
      <div className="portfolio-body">
        <div className="portfolio-entity">
          <div className="portfolio-img">
            {" "}
            <img src={counterImage} alt="Counter" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              {" "}
              <Link to="/portfolio/counter">Counter</Link>
            </h2>
            <p>
              <i>JavaScript</i>
            </p>
            <p>
              Interactive counter exercise to increment, decrement, or reset a
              displayed value using button clicks.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            {" "}
            <img src={colourFlipperImage} alt="Colour Flipper" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              {" "}
              <Link to="/portfolio/colourflipper">Colour flipper</Link>
            </h2>
            <p>
              <i>JavaScript</i>
            </p>
            <p>
              This project lets users interactively change the background colour
              of a webpage with simple button clicks. It features predefined
              colour options like red, green, and blue, as well as a random
              colour generator.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            <img src={modalImage} alt="Modal" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              <Link to="/portfolio/modal">Simple modal</Link>
            </h2>
            <p>
              A basic modal exercise featuring an overlay, content display, and
              a close button for user interaction.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            <img src={calcImage} alt="Calculator" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              <Link to="/portfolio/calculator">Calculator</Link>
            </h2>
            <p>
              This JavaScript calculator provides an interactive way to perform
              quick calculations directly within the browser. It&apos;s designed
              to be simple yet efficient for everyday arithmetic needs.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            {" "}
            <img src={accordianImage} alt="Accordian" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              {" "}
              <Link to="/portfolio/accordian">Accordian</Link>
            </h2>
            <p>
              A collapsible content section where users can expand or collapse
              individual panels for a more organized and interactive layout.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            {" "}
            <img src={tabsImage} alt="Tabs" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              <Link to="/portfolio/tabs">Tabs</Link>
            </h2>
            <p>
              A tab-based interface that organises content into distinct
              sections, allowing users to switch between topics seamlessly with
              clickable navigation buttons and active state highlighting.
            </p>
          </div>
        </div>
        <div className="portfolio-entity">
          <div className="portfolio-img">
            <img src={carouselImage} alt="Carousel" />
          </div>
          <div className="portfolio-entity-words">
            <h2>
              {" "}
              <Link to="/portfolio/carousel">Reviews carousel</Link>
            </h2>
            <p>
              A dynamic review carousel that cycles through user testimonials,
              displays content interactively, and includes navigation buttons
              and random selection functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Portfolio;
