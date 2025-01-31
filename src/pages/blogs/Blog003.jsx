import nickImage from "../../assets/header.jpg";
import { Link } from "react-router-dom";

import "../../css/Home.css";
import "../../css/Blog.css";

const Blog003 = () => {
  return (
    <div className="overview">
      <div className="blog-main">
        <div className="blog-title">
          <h1>
            JavaScript (and TypeScript, a little...)
            <span className="nickgreen">.</span>
          </h1>
        </div>
        <div className="blog-header">
          <div className="nick-img">
            <img src={nickImage} alt="Nick" />
          </div>
          <div className="date">
            <div className="date-img">
              <div className="date-img1">
                <svg
                  stroke="#eaeceb "
                  fill="#eaeceb"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 11H9V13H7zM7 15H9V17H7zM11 11H13V13H11zM11 15H13V17H11zM15 11H17V13H15zM15 15H17V17H15z"></path>
                  <path d="M5,22h14c1.103,0,2-0.897,2-2V8V6c0-1.103-0.897-2-2-2h-2V2h-2v2H9V2H7v2H5C3.897,4,3,4.897,3,6v2v12 C3,21.103,3.897,22,5,22z M19,8l0.001,12H5V8H19z"></path>
                </svg>
              </div>
              <div className="date-img2">
                <p>28th November, 2024</p>
              </div>
            </div>
            <p>
              <Link to="/contact">Nick</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="blog-container">
        <p>
          Over the past few weeks, I&apos;ve been diving into the fundamentals
          of JavaScript through FreeCodeCamp&apos;s beginner-friendly courses.
          It&apos;s been an interesting and rewarding experience, starting with
          the building blocks of programming: variables, data types, and basic
          operators. I&apos;ve been steadily building a solid foundation; from
          understanding const/let, to logical operators and how addition,
          subtraction, and multiplication work in the world of code.
        </p>
        <p>
          This early learning phase has also introduced me to the practical side
          of JavaScript, such as working with strings, arrays, and functions.
          Breaking down problems into smaller, manageable steps has been
          eye-opening and has given me a greater appreciation for how versatile
          JavaScript can be. You can view the (70+) exercises that I completed
          as part of this course on my&nbsp;
          <a
            href="https://github.com/NickShaw1/freecodecamptutorialjavascript"
            target="_blank"
          >
            Github
          </a>
          .
        </p>
        <p>
          With this this groundwork in place, I&apos;m eager to move beyond
          exercises and theory.
        </p>
        <p>
          My goal is to apply what I&apos;ve learned by creating mini projects
          that demonstrate my growing skills. I&apos;ve already executed a
          couple of these projects on my new&nbsp;
          <a href="/Portfolio">portfolio page</a>, including a&nbsp;
          <Link to="/portfolio/colourflipper">colour flipper&nbsp;</Link>
          and an interactive&nbsp;
          <Link to="/portfolio/calculator">calculator</Link>. Each exercise
          represents an opportunity to consolidate my understanding, tackle
          real-world challenges, and showcase my progress as I continue to grow
          as a developer.
        </p>
        <p>
          I first broke the three hour course below into watchable chunks, then
          watched each chunk repeatedly until I felt comfortable with the
          concepts described. It took a few weeks to get truly comfortable, but
          persistence is slowly paying off and I feel confident that I&apos;ve
          got the basics down.
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/PkZNo7MFNFg?si=4aqnwOz4_LbhQ8mn"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <p>
          FreeCodeCamp has been really useful so far, but if you know of any
          other good channels or courses that would be worthwhile, please let me
          know.
        </p>
        <h2>TypeScript</h2>

        <p>
          Understanding types and how TypeScript serves as a protective layer
          for code was an entirely new concept to me. Before diving into
          TypeScript, I focused on mastering the fundamentals of JavaScript to
          build a solid foundation. To achieve this, I once again turned to
          FreeCodeCamp — a platform brimming with invaluable resources that make
          learning accessible to everyone.
        </p>
        <p>
          I am still in the process of watching, rewatching and finalising the
          exercises outlined in the video below, but I&apos;ll be sure to update
          both my github and this blog once I&apos;ve completed them.
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/SpwzRDUQ1GI?si=aPvPsBush57l92Ik"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <h2>Mini projects</h2>
        <p>
          As mentioned, I&apos;ve started the ball rolling on a couple of mini
          projects. These are simple exercises, chosen in order to familiarise
          myself with JavaScipt and showcase my initial learning. I&apos;ve
          created a new&nbsp;
          <a href="/Portfolio">portfolio</a> page, which is now integrated into
          the site and accessible from the top navigation bar. I plan to
          continue adding to this page over the coming months.
        </p>
        <p>
          I understand that the initial learning process can slow down once you
          dive into exercises and &apos;proper coding&apos;, as these require a
          shift in approach. Instead of relying on rote memorisation or tutorial
          watching, creativity and logical thinking take centre stage. I&apos;m
          determined to keep at it until I&apos;ve developed a deeper
          understanding of coding in JavaScript and (eventually) TypeScript.
        </p>
        <p>
          There are countless mini projects to choose from, with many YouTube
          channels and websites offering step-by-step guides. My aim is to
          gradually increase the complexity over time, but for now, I&apos;m
          content with mastering the basics.
        </p>
        <p>
          On a separate note, I plan to change the skillset list on the
          blog&apos;s homepage into an accordion. This will give me the chance
          to experiment with accordions, and I&apos;m likely to tackle it in the
          coming days.
        </p>
        <p>
          So far, I&apos;m thoroughly enjoying the learning process. It can be
          challenging to grasp new concepts, but with so many resources
          available online, it&apos;s manageable as long as you stay consistent
          and keep going.
        </p>
        <p>Until next time!</p>
      </div>
    </div>
  );
};

export default Blog003;
