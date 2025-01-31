import { Link } from "react-router-dom";
import nickImage from "../assets/nick.jpg";

import "../css/Home.css";

const Home = () => {
  return (
    <div className="overview">

      <div className="hero">
        <div className="hero-1">
          <div className="nick-jpg">
            <img src={nickImage} alt="Nick" />
          </div>
          <div className="h1">
            <h1>
              Hey, I&apos;m Nick<span className="green1">.</span>
            </h1>
          </div>
          <div className="h2">
            <h2>
              I&apos;m a <span className="green2">Test Manager</span>.
            </h2>
          </div>
          <div className="p">
            <p>
              I&apos;ve spent the last 11 years building and testing software
              for some pretty cool companies. In my spare time I also love
              writing, playing tennis 🎾 and travelling 🚀. Let&apos;s connect!
            </p>
          </div>
          <div>
            <Link to="/contact" className="button">
              Contact me
            </Link>
          </div>
        </div>
        <div className="hero-2">
          <div className="credentials">
            <div className="credentials-header">
              <h3>
                Credentials<span className="green3">.</span>
              </h3>

              <svg
                stroke="#0aff9d"
                fill="#0aff9d"
                strokeWidth=""
                viewBox="0 0 1024 1024"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM694.5 340.7L481.9 633.4a16.1 16.1 0 0 1-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.1 0 10 2.5 13 6.6l64.7 89 150.9-207.8c3-4.1 7.8-6.6 13-6.6H688c6.5.1 10.3 7.5 6.5 12.8z"></path>
              </svg>
            </div>

            <div className="certs">
              <div className="credentials-ind">
                <div className="credentials-words">
                  <p>ISTQB Certified Tester.</p>
                </div>
                <svg
                  stroke="#e5b91a"
                  fill="#e5b91a"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#e5b91a"
                    strokeWidth="2"
                    d="M10.3248685,14.7630919 C7.82620532,14.038202 6,11.7325889 6,9 L6,1 L18,1 L18,10 M6,3 L1,3 L1,7 C1,9.509 2.791,11 5,11 L6,11 M20.0335555,10.884915 C21.7416567,10.4908882 23,9.10306372 23,7 L23,3 L18,3 M10,19 L5,19 L5,23 L16.5,23 M16.5,10 C12.9101429,10 10,12.9101429 10,16.5 C10,20.0898571 12.9101429,23 16.5,23 C20.0898571,23 23,20.0898571 23,16.5 C23,12.9101429 20.0898571,10 16.5,10 L16.5,10 Z M20,14 L15.5,18.5 L13,16 M10.2056405,15.4240751 C8.89754812,16.0817472 8,17.4360568 8,19"
                  ></path>
                </svg>
              </div>
              <div className="credentials-ind">
                <div className="credentials-words">
                  <p>CSM Certified ScrumMaster.</p>
                </div>
                <svg
                  stroke="#e5b91a"
                  fill="#e5b91a"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#e5b91a"
                    strokeWidth="2"
                    d="M10.3248685,14.7630919 C7.82620532,14.038202 6,11.7325889 6,9 L6,1 L18,1 L18,10 M6,3 L1,3 L1,7 C1,9.509 2.791,11 5,11 L6,11 M20.0335555,10.884915 C21.7416567,10.4908882 23,9.10306372 23,7 L23,3 L18,3 M10,19 L5,19 L5,23 L16.5,23 M16.5,10 C12.9101429,10 10,12.9101429 10,16.5 C10,20.0898571 12.9101429,23 16.5,23 C20.0898571,23 23,20.0898571 23,16.5 C23,12.9101429 20.0898571,10 16.5,10 L16.5,10 Z M20,14 L15.5,18.5 L13,16 M10.2056405,15.4240751 C8.89754812,16.0817472 8,17.4360568 8,19"
                  ></path>
                </svg>
              </div>
              <div className="credentials-ind">
                <div className="credentials-words">
                  <p>Over a decade of experience.</p>
                </div>
                <svg
                  stroke="#e5b91a"
                  fill="#e5b91a"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#e5b91a"
                    strokeWidth="2"
                    d="M10.3248685,14.7630919 C7.82620532,14.038202 6,11.7325889 6,9 L6,1 L18,1 L18,10 M6,3 L1,3 L1,7 C1,9.509 2.791,11 5,11 L6,11 M20.0335555,10.884915 C21.7416567,10.4908882 23,9.10306372 23,7 L23,3 L18,3 M10,19 L5,19 L5,23 L16.5,23 M16.5,10 C12.9101429,10 10,12.9101429 10,16.5 C10,20.0898571 12.9101429,23 16.5,23 C20.0898571,23 23,20.0898571 23,16.5 C23,12.9101429 20.0898571,10 16.5,10 L16.5,10 Z M20,14 L15.5,18.5 L13,16 M10.2056405,15.4240751 C8.89754812,16.0817472 8,17.4360568 8,19"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="hero-skills">
            <div className="hero-skills">
              <div className="hero-skills-header">
                <h4>
                  Use at work<span className="green4">.</span>
                </h4>
                <svg
                  stroke="#b72ed1"
                  fill="#b72ed1"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"></path>
                </svg>
              </div>
              <div className="hero-skills-pillbox">
                <span className="pill">Test Strategy</span>
                <span className="pill">Test Management</span>
                <span className="pill">Github</span>
                <span className="pill">NodeJS</span>
                <span className="pill">HTML</span>
                <span className="pill">CSS</span>
                <span className="pill">JavaScript</span>
                <span className="pill">Playwright</span>
                <span className="pill">TestComplete</span>
                <span className="pill">Azure DevOps</span>
                <span className="pill">JIRA</span>
                <span className="pill">Agile</span>
              </div>
            </div>
            <div className="hero-skills">
              <div className="hero-skills-header">
                <h4>
                  Use for fun<span className="green4">.</span>
                </h4>
                <svg
                  stroke="#f1bb0e"
                  fill="#f1bb0e"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 0 1 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 0 1 8 8.4C667.6 625.7 597.5 693 512 693zm176-224a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                </svg>
              </div>
              <div className="hero-skills-pillbox2">
                <span className="pill">React</span>
                <span className="pill">Tailwind</span>
                <span className="pill">Bootstrap</span>
                <span className="pill">Jenkins</span>
                <span className="pill">Selenium</span>
                <span className="pill">TypeScript</span>
                <span className="pill">Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
