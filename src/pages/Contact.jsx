import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import nickImage from "../assets/nick.jpg";

import "../css/Home.css";
import "../css/Contact.css";

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageContainer = document.querySelector(".message-container");

    emailjs.sendForm("service_z07wubn", "template_vye2scf", form.current).then(
      (response) => {
        console.log("SUCCESS!", response);
        setMessage("Thanks for getting in touch!");
        setMessageClass("success");
        messageContainer.style.display = "block";
        form.current.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        setMessage("Oh no! Message delivery failed!");
        setMessageClass("error");
        messageContainer.style.display = "block";
      }
    );
  };

  // Initialize emailjs when the component mounts
  React.useEffect(() => {
    emailjs.init("561k8Uin1iOcxjTAV");
  }, []);

  return (
    <div className="overview">
      <div className="contact-hero">
        <div className="contact-1">
          <div className="nick-jpg">
            <img src={nickImage} alt="Nick" />
          </div>
          <div className="contact-h1">
            <h1>
              Contact me<span className="green1">.</span>
            </h1>
          </div>
          <p>
            Whether you&apos;re looking to connect for a project, discuss
            testing best practices, or explore potential opportunities, feel
            free to reach out by contacting me through the form on this page. I
            am always open to new connections and conversations. 🙂
          </p>
          <h3>Social Media</h3>
          <p>
            Alternatively, you can connect with me on social media to stay
            updated, share ideas, or explore my latest work.
          </p>
        </div>

        <div className="contact-2">
          {/* Contact form */}
          <div className="contact">
            <div className="contactbox">
              <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    tabIndex="0"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    tabIndex="0"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Message"
                    required
                    tabIndex="0"
                  ></textarea>
                </div>

                <div className="button-container">
                  <div className={`message-container ${messageClass}`}>
                    {message}
                  </div>
                  <button type="submit" tabIndex="0" className="submit-button">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>{" "}
          <div className="socials">
            {" "}
            <h4>Socials 🥳</h4>
            <div className="socials-ind">
              <div className="socials-words">
                <a
                  href="https://www.linkedin.com/in/nickshawqa/"
                  target="_blank"
                  alt="Linkedin"
                >
                  Linkedin
                </a>
              </div>
              <svg
                stroke="#24dadb"
                fill="#24dadb"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path>
              </svg>
            </div>
            <div className="socials-ind">
              <div className="socials-words">
                <a
                  href="https://www.github.com/nickshaw1"
                  target="_blank"
                  alt="Github"
                >
                  Github
                </a>
              </div>
              <svg
                stroke="#8a42bd"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div className="socials-ind">
              <div className="socials-words">
                <a
                  href="https://www.x.com/nickshawqa"
                  target="_blank"
                  alt="Twitter"
                >
                  X/Twitter
                </a>
              </div>
              <svg
                stroke="#d52a75"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
