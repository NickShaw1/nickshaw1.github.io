import { Link } from "react-router-dom";
import nickImage from "../assets/header.jpg";
import blog001img from "../assets/blogs/001/001.jpg";
import blog002img from "../assets/blogs/002/002.jpg";
import blog003img from "../assets/blogs/003/003.jpg";
import blog004img from "../assets/blogs/004/004.jpg";
import "../css/Home.css";
import "../css/Blog.css";

const Blog = () => {
  return (
    <div className="overview">
      <div className="blog-main">
        <div className="blog-title">
          <div className="nick-jpg">
            <img src={nickImage} alt="Nick" />
          </div>
          <h1>
            Blog<span className="nickgreen">.</span>
          </h1>
        </div>
        <p>
          Throughout my career, I&apos;ve been dedicated to delivering
          high-quality software solutions, by ensuring thorough testing
          processes, providing comprehensive documentation and reporting, and
          identifying potential issues early. This page outlines not only my
          existing skills and experience, but also my ongoing updates and
          commitment to learning in the field of software development.
        </p>
      </div>
      <div className="blog-list">
        <div className="blog-entries">
          <div className="blog-img">
            <img src={blog004img} alt="Blog Post 004" />
          </div>
          <div className="blog-entries-main">
            <h2>
              <Link to="/blog/004">Site redesign </Link>
            </h2>
            <p>
              <i>30th January, 2025</i>
            </p>
            <p>React, graphic design and a major power outage!</p>
          </div>
        </div>
        <div className="blog-entries">
          <div className="blog-img">
            <img src={blog003img} alt="Blog Post 003" />
          </div>
          <div className="blog-entries-main">
            <h2>
              <Link to="/blog/003">
                JavaScript (and TypeScript, a little...){" "}
              </Link>
            </h2>
            <p>
              <i>8th January, 2025</i>
            </p>
            <p>
              Updates on my progress with tutorials, mini projects and getting
              to grips with coding.
            </p>
          </div>
        </div>
        <div className="blog-entries">
          <div className="blog-img">
            <img src={blog002img} alt="Blog Post 002" />
          </div>
          <div className="blog-entries-main">
            <h2>
              <Link to="/blog/002">
                Setting up Playwright in VS Code for automated testing
              </Link>
            </h2>
            <p>
              <i>12th December, 2024</i>
            </p>
            <p>A guide on setting up Playwright for the first time.</p>
          </div>
        </div>
        <div className="blog-entries">
          <div className="blog-img">
            <img src={blog001img} alt="Blog Post 001" />
          </div>
          <div className="blog-entries-main">
            <h2>
              <Link to="/blog/001">Getting started</Link>
            </h2>
            <p>
              <i>28th November 2024</i>
            </p>
            <p>An introductory post.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
