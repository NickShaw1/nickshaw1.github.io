import { useEffect } from "react";
import nickImage from "../assets/paris2.jpg";
import evaImage from "../assets/eva.jpg";
import { Link } from "react-router-dom";

import "../css/Home.css";
import "../css/About.css";

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
      document.body.style.setProperty("--scroll", scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="overview">
      <div className="about-main">
        <div className="me">
          <div className="me-header">
            <div className="me-img">
              <img src={nickImage} alt="Nick" />
            </div>
          </div>
          <h1>
            I&apos;m Nick<span className="nickgreen">.</span>
          </h1>
          <p>
            I live just outside Belfast, in beautiful County Down, Northern
            Ireland. I&apos;ve spent the last eleven years working in software
            testing, with a focus on both commercial and public-sector projects.
          </p>
          <p>
            Before that, I studied English and Creative Writing, which led to
            writing screenplays and plays - some of which have even been
            performed at top Belfast venues like the Lyric Theatre, Grand Opera
            House, MAC Theatre, and Crescent Arts Centre.
          </p>
        </div>
        <div className="about section">
          <div className="about-header">
            <svg
              stroke="#1a61e5"
              fill="#1a61e5"
              strokeWidth="0"
              version="1"
              viewBox="0 0 48 48"
              height="3em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#1a61e5"
                d="M37,40H11l-6,6V12c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,37.3,40.3,40,37,40z"
              ></path>
              <g fill="#fff">
                <rect x="22" y="20" width="4" height="11"></rect>
                <circle cx="24" cy="15" r="2"></circle>
              </g>
            </svg>
            <h3>About</h3>
          </div>
          <p>
            I created this website as a personal project to practice and refine
            my HTML, CSS, and JavaScript skills. It&apos;s a space where I can
            experiment with new techniques, document what I&apos;m learning, and
            challenge myself to try things outside my comfort zone.
          </p>
          <p>
            This site serves as something of a digital portfolio, showcasing my progress and
            helping me build a stronger foundation for future projects.
            It&apos;s also a place for me to track my growth as a developer,
            learning from my successes and mistakes along the way.
          </p>
        </div>
        <div className="learning section">
          <div className="learning-header">
            <svg
              stroke="currentColor"
              fill="#d8e619"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="3em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609zM15 2.82v9.908c-.846-.343-1.944-.672-3.074-.788-1.143-.118-2.387-.023-3.426.56V2.718c1.063-.929 2.631-.956 4.09-.664A11.956 11.956 0 0115 2.82z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3>Learning</h3>
          </div>
          <p>
            I’m currently exploring front-end development{" "}
            <span className="highlight-words">(HTML, CSS, and JavaScript)</span>
            , alongside tools in the Adobe Creative Suite like Photoshop and
            Illustrator. This site was made in{" "}
            <span className="highlight-words">React</span>. I’m also honing my
            automation testing skills with Selenium, Playwright, and Cucumber,
            using Python, JavaScript, and TypeScript.
          </p>
          <p>
            I’ll be documenting my progress on my <Link to="/blog">blog</Link>,
            with the aim of continuously enhancing my evolving skills and
            detailing the projects I’m working on.
          </p>
        </div>
        <div className="outside-work section">
          <div className="outside-work-words-eva">
            <div className="eva1">
              <div className="outside-work-header">
                <svg
                  stroke="currentColor"
                  fill="#e21d8f"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="3em"
                  width="3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path>
                </svg>
                <h4>Outside Work</h4>
              </div>
              <p>
                Outside of work, I&apos;m kept busy with travelling, gardening,
                writing, exercise and online gaming. I’m happily married, and we
                share our home with <span className="highlight-words">Eva</span>
                , our 10-year-old black cat. She&apos;s a good girl, albeit a
                bit of a grump.{" "}
              </p>
              <p>
                I have{" "}
                <a
                  href="https://nass.co.uk/about-as/what-is-axialspa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ankylosing Spondylitis
                </a>
                , but it doesn&apos;t hold me back. Whether diving into new
                tech, working on or scriptwriting or mastering the cryptic art
                of lawn maintenance, I&apos;m always pushing forward.
              </p>
            </div>
            <div className="eva2">
              <img src={evaImage} alt="Eva" />
            </div>
          </div>
        </div>

        <div className="adventures section">
          <div className="adventures-header">
            <svg
              stroke="currentColor"
              fill="#66ff00"
              strokeWidth="0"
              viewBox="0 0 640 512"
              height="3em"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM44.81 205.66l88.74 80a62.607 62.607 0 0 0 25.47 13.93l287.6 78.35c26.48 7.21 54.56 8.72 81 1.36 29.67-8.27 43.44-21.21 47.25-35.71 3.83-14.5-1.73-32.71-23.37-54.96-19.28-19.82-44.35-32.79-70.83-40l-97.51-26.56L282.8 30.22c-1.51-5.81-5.95-10.35-11.66-11.91L206.05.58c-10.56-2.88-20.9 5.32-20.71 16.44l47.92 164.21-102.2-27.84-27.59-67.88c-1.93-4.89-6.01-8.57-11.02-9.93L52.72 64.75c-10.34-2.82-20.53 5-20.72 15.88l.23 101.78c.19 8.91 6.03 17.34 12.58 23.25z"></path>
            </svg>
            <h5>Adventures</h5>
          </div>
          <p>
            My wife Debbie and I have travelled extensively in recent years,
            with several trips to France, Spain, Mallorca, Italy, Portugal and
            four (crazy!) road trips through the USA. Each destination has
            offered new experiences, with opportunities to explore diverse
            landscapes, cultures, and histories. From the wild coastlines of
            Northern California, to the beautiful, historical canals of Venice,
            we&apos;ve tried to make the most of our time together.
          </p>
          <p>
            {" "}
            We&apos;re both really excited for our upcoming trip to{" "}
            <span className="highlight-words">Japan</span>, somewhere we&apos;ve
            always wanted to go. We&apos;ll kick things off in Tokyo, then
            travel by Shinkansen to Kyoto, followed by a stop in Hiroshima,
            before finally returning to Tokyo again for a few final days.
            It&apos;s shaping up to be our most epic adventure yet!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
