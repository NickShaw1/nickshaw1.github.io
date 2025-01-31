import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { Helmet } from "react-helmet";

import Blog001 from "./pages/blogs/Blog001";
import Blog002 from "./pages/blogs/Blog002";
import Blog003 from "./pages/blogs/Blog003";
import Blog004 from "./pages/blogs/Blog004";

import Counter from "./pages/portfolio/counter/Counter";
import ColourFlipper from "./pages/portfolio/colourflipper/Colourflipper";
import SimpleModal from "./pages/portfolio/modal/Modal";
import Calculator from "./pages/portfolio/calculator/Calculator";
import Accordian from "./pages/portfolio/accordian/Accordian";
import Tabs from "./pages/portfolio/tabs/Tabs";
import Carousel from "./pages/portfolio/carousel/Carousel";

const App = () => (
  <Router>
    <Helmet>
      <title>Nick Shaw - QA Professional</title>

      <meta
        name="description"
        content="Nick Shaw, a Software Tester and Test Manager with over 11 years of experience in test planning, automation testing, and project delivery. Explore my skills, CV, and contact information."
      />

      <meta
        name="keywords"
        content="Nick Shaw, Software Test Manager, QA Professional, Test Automation, Manual Testing, Test Planning, Quality Assurance, Testing Services, Software Testing, Testing"
      />

      <meta name="robots" content="index, follow" />

      {/* Open Graph meta tags */}
      <meta
        property="og:title"
        content="Nick Shaw - Experienced Software Test Manager"
      />
      <meta
        property="og:description"
        content="Over 11 years of experience in QA, test automation, and software testing. Let's ensure your software is reliable and effective."
      />
      <meta property="og:image" content="/nickImage.png" />
      <meta property="og:url" content="https://www.nickshawqa.com" />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Nick Shaw - QA Professional" />
      <meta
        name="twitter:description"
        content="Experienced Software Test Manager with a focus on test automation and quality assurance. Explore my skills and services."
      />
      <meta name="twitter:image" content="/twitterCard.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />

      {/* Language meta tag */}
      <meta name="language" content="en" />

      {/* Viewport meta tag for responsiveness */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/blog/001" element={<Blog001 />} />
      <Route path="/blog/002" element={<Blog002 />} />
      <Route path="/blog/003" element={<Blog003 />} />
      <Route path="/blog/004" element={<Blog004 />} />

      <Route path="/portfolio/counter" element={<Counter />} />
      <Route path="/portfolio/colourflipper" element={<ColourFlipper />} />
      <Route path="/portfolio/modal" element={<SimpleModal />} />
      <Route path="/portfolio/calculator" element={<Calculator />} />
      <Route path="/portfolio/accordian" element={<Accordian />} />
      <Route path="/portfolio/tabs" element={<Tabs />} />
      <Route path="/portfolio/carousel" element={<Carousel />} />
    </Routes>
  </Router>
);

export default App;
