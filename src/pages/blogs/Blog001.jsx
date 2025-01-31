import nickImage from "../../assets/header.jpg";
import { Link } from "react-router-dom";

import "../../css/Home.css";
import "../../css/Blog.css";

const Blog001 = () => {
  return (
    <div className="overview">
      <div className="blog-main">
        <div className="blog-title">
          <h1>
            Getting started<span className="nickgreen">.</span>
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
          Ultimately, software testing is an integral part of the software
          development lifecycle, ensuring that applications behave as expected
          and meet the requirements set out during the planning phase. With the
          continuous advancement of technology, automation has become an
          increasingly valuable tool in streamlining the testing process, saving
          time and effort for software development teams. Microsoft&apos;s
          Playwright automation is one such tool that has gained popularity in
          recent years for its efficiency and ease of use.
        </p>
        <p>
          As a Tester, I&apos;ve always valued the importance of staying ahead
          in a constantly evolving field. I&apos;ve utilised many tools over the
          years, but recently, I&apos;ve decided to expand my skillset by diving
          deeper into test automation, with an emphasis on JavaScript,
          TypeScript, and Python, using Playwright in VS code.
        </p>
        <p>I want to use this site to document that process.</p>
        <p>
          In order to document this on a site, I needed to make the site first.
          I used to make websites a lot back when I was a kid, but my
          professional career to-date has been more concerned with the testing
          side than developing the front end myself, so it was time for a
          change. It&apos;s been a lot of fun!
        </p>
        <p>
          I&apos;ve spent the past few weeks building this site, from scratch,
          picking up a lot of valuable HTML and CSS along the way. I&apos;ve
          also become quite hooked on learning through YouTube videos, remaining
          mindful that hands-on experience is the best way to improve. Many of
          these channels have been especially helpful while working on this
          project. Here&apos;s a list of the most useful ones I&apos;ve found so
          far.
        </p>
        <ul>
          <li>
            <a href="https://www.youtube.com/@WebDevSimplified" target="_blank">
              Web Dev Simplified
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@programmingwithmosh"
              target="_blank"
            >
              Programming with Mosh
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@ProgrammingKnowledge"
              target="_blank"
            >
              ProgrammingKnowledge
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@SuperSimpleDev" target="_blank">
              SuperSimpleDev
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@RaghavPal" target="_blank">
              Automation Step by Step
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@FluxAcademy" target="_blank">
              Flux Academy
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@BroCodez" target="_blank">
              Bro Code
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@thewebsitearchitect"
              target="_blank"
            >
              The Website Architect
            </a>
          </li>
        </ul>
        <p>
          If you can suggest any other good channels that are worth watching
          that provide solid foundational tips on web design, graphic design or
          test automation, please let me know. I&apos;m always on the lookout.
        </p>
        <h2>What is Playwright?</h2>

        <p>
          Playwright is an open-source automation tool that allows testers to
          write scripts to automate interactions with web applications. It
          supports multiple programming languages, making it accessible to a
          wide range of software developers and testers. By using Playwright,
          testers can simulate user interactions, such as clicking buttons,
          filling out forms, and navigating through different pages, while also
          conducting more advanced testing scenarios, like testing across
          different browsers and devices.
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iTIxEZng-rc?si=LfmhFp5QBtdrT14W"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <p>
          To kick things off, I&apos;ve been exploring incredible resources
          like&nbsp;
          <a
            href="https://automationstepbystep.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Automation Step by Step&nbsp;
          </a>
          and&nbsp;
          <a
            href="https://testautomationu.applitools.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Test Automation University
          </a>
          . These platforms are excellent, particularly Automation Step by Step,
          (no affiliation here, just a fan!). They offer structured courses,
          guides and practical insights that make transitioning into automation
          testing feel achievable.
        </p>
        <p>
          For my first experiment, I decided to create a demo regression suite
          for Sauce Demo. Sauce Demo is a popular practice site for aspiring
          testers looking to sharpen their automation skills. Links for other
          sites that testers can use can be found&nbsp;
          <a
            href="https://ultimateqa.com/dummy-automation-websites/"
            target="_blank"
            rel="noopener noreferrer"
          >
            at this link
          </a>
          . Anyway, this was my opportunity to get hands-on with the basics:
          downloading VS Code, setting up essential files and extensions, and
          diving into writing tests.
        </p>
        <p>
          It&apos;s been an exciting start, especially since I&apos;m using this
          project to build out my GitHub portfolio (check it out&nbsp;
          <a
            href="https://www.github.com/nickshaw1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          ). A full automated regression of the Sauce demo site can now be found
          there, using JavaScript. I won&apos;t pretend it&apos;s 100% perfect,
          but it&apos;s a solid start.
        </p>
        <p>
          What&apos;s been especially helpful in these early stages is using AI
          tools like ChatGPT. Whether it&apos;s debugging tricky lines of code
          or understanding best practices, having a virtual assistant to bounce
          ideas off has made learning smoother. Of course, while AI has been a
          fantastic guide, I&apos;m mindful that it&apos;s a supplement - not a
          replacement - for genuine learning and growth.
        </p>
        <p>
          I&apos;ve also spent a lot of time on the Playwright documentation
          pages, absorbing what I can. My goal is to develop a strong
          foundational knowledge that evolves with each project.
        </p>
        <p>
          This journey isn&apos;t just about the technical side, though.
          It&apos;s about challenging myself, finding new ways to solve
          problems, and sharing what I learn. I&apos;m excited to learn
          meaningful new skills and I&apos;ll be posting regular updates as I
          complete exercises and build new demos.
        </p>
        <p>Thanks for reading!</p>
      </div>
    </div>
  );
};

export default Blog001;
