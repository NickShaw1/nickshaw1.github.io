import nickImage from "../../assets/header.jpg";
import oldSiteImage from "../../assets/blogs/004/oldsite.jpg";
import { Link } from "react-router-dom";

import "../../css/Home.css";
import "../../css/Blog.css";

const Blog004 = () => {
  return (
    <div className="overview">
      <div className="blog-main">
        <div className="blog-title">
          <h1>
            Site redesign
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
                <p>30th January, 2025</p>
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
          The last few weeks have been chaotic, with a widespread power outage
          impacting the entire island of Ireland. I was unfortunate enough to be
          without power for nearly 5 days and it really brings it home how
          desperately reliant on electricity we all are in the modern age.
          Particularly if you&apos;re in the middle of a total site redesign and
          getting to grips with React!
        </p>
        <p>
          Fortunately, the situation has been mostly resolved - although there
          are still about 20,000 (at time of writing) without power in Northern
          Ireland, which is really awful stuff and indicative of the general
          failing nature of the country as a whole.
        </p>
        <p>
          Still, this isn&apos;t a political blog, so let&apos;s focus on what
          has been achieved in the middle of all that chaos. A total site
          redesign, where I&apos;ve implemented a significant change to the
          overall aesthetic, played with CSS keyframes a lot and generally tried
          to make the whole site look a bit less corporate and a bit more funky.
        </p>
        <p>
          It wasn&apos;t that I disliked the old site, I really just wanted to
          get my teeth into React. It&apos;s been fun, and now I realise that
          React can actually be a very useful tool for organising components. It
          wasn&apos;t too difficult to get a handle on either. Overall, I think
          it&apos;s a more logical way of creating larger apps, so may be
          overkill for this site. But it&apos;s all just an experiment, so if
          you end up reading this that means I was able to successfully build
          and deploy the new site!
        </p>
        <div className="oldsite">
          <img src={oldSiteImage} alt="The old design" />
          <p>
            <span className="centre">
              Rest in peace, old site (Nov 2024 - Jan 2025)
            </span>
          </p>
        </div>
        <h2>React</h2>
        <h6>What is it?</h6>
        <p>
          Basically, React is a popular JavaScript library for building user
          interfaces, particularly for single-page applications.{" "}
        </p>
        <p>
          Developed by Facebook, it allows developers to create reusable UI
          components, making it easier to build complex, dynamic UIs. React uses
          a virtual DOM (Document Object Model) to efficiently update and render
          only the parts of the UI that change, improving performance.
          Components in React are typically written using JSX (JavaScript XML),
          which lets you write HTML-like code within JavaScript.{" "}
        </p>{" "}
        <p>
          React supports unidirectional data flow, making it easier to manage
          state and props between components. It&apos;s widely adopted for
          building modern web applications.
        </p>
        <h2>What I learned</h2>
        <p>
          Organising a website in basic HTML, CSS and JavaScript is fairly
          straightforward, fairly lean and perfectly suitable for a site of this
          size. However, for larger sites, I can tell already that React would
          be a major time-saver.{" "}
        </p>{" "}
        <p>
          Take the navigation bar at the top of this page, for example. In a
          basic HTML/CSS site, were I to change something in the topnav, I would
          need to go into each page where a topnav sat and make those changes
          individually. In React, I can simply go to the navbar component that
          I&apos;ve made, make the change, and the change is applied
          universally, anywhere where I&apos;ve added that component. It cuts
          down on pointless copy/pasting, generally allows for more organisation
          and isn&apos;t really much more complicated, so overheads are low.
        </p>
        <p>
          It did take a bit of getting used to, with some additional syntax
          changes and organisational considerations, but I&apos;m happy with the
          overall end product (at least, for now...)
        </p>
        <h2>CSS Keyframe animations</h2>
        <p>
          I&apos;ve put some effort into breathing some life and movement into
          this version of the site, which I think gives it a bit more dynamism
          and energy. This was done through the use of CSS keyframe animations,
          basically a way to manipulate the code into animating through CSS
          styling. There are a number of examples of this across the site and
          most are very basic. I&apos;ve been amazed at some of the examples
          I&apos;ve seen on Youtube, with various Youtube wizards creating all
          kinds of crazy keyframe animations - it&apos;s been exciting to learn
          more about this aspect of CSS. I actually enjoy CSS a lot, so finding
          this new level of functionality has been great fun.
        </p>
        <p>
          There are loads of examples of this kind of thing online. Like this
          one below from{" "}
          <a href="https://www.youtube.com/@coding2go" target="_blank">
            Coding2GO
          </a>
          .
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/z2LQYsZhsFw?si=S6GjmAz9GVxjOLyp"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <h2>What&apos;s next?</h2>
        <p>A weather app!</p>
        <p>
          I had actually planned to do this over the last few weeks, but that
          evolved into this site redesign and a rabbit-hole into React
          that&apos;s resulted in what you now see. It&apos;s still on my list
          of things to do. I may try and integrate it somewhere on the{" "}
          <a href="/Blog">Blog</a> main page, too, as well as the{" "}
          <a href="/Portfolio">portfolio</a> page. I&apos;ve watched a couple of
          videos on this so far, but haven&apos;t decided on a final design. It
          will come soon, though, among other things.
        </p>
        <p>
          Until then, I hope you enjoy the new site. As always, if you&apos;d
          like to get in touch, please feel free to{" "}
          <a href="/Contact">contact me</a>.{" "}
        </p>
      </div>
    </div>
  );
};

export default Blog004;
