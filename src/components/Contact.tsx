import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(typeof window !== "undefined" ? `${window.location.origin}/#contact` : "");
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:adithya040@gmail.com" data-cursor="disable">
                adithya040@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>MEng in Software Engineering</p>
          </div>
          <div className="contact-box contact-form-box">
            <h4>Get in touch</h4>
            <form
              className="contact-form"
              action="https://formsubmit.co/adithya040@gmail.com"
              method="POST"
              onSubmit={() => setStatus("sending")}
            >
              <input type="hidden" name="_subject" value="Portfolio contact form" />
              {redirectUrl && <input type="hidden" name="_next" value={redirectUrl} />}
              <input type="text" name="name" placeholder="Your name" required aria-label="Your name" />
              <input type="email" name="email" placeholder="Your email" required aria-label="Your email" />
              <textarea name="message" placeholder="Your message" rows={4} required aria-label="Your message" />
              <button type="submit" className="contact-form-submit" disabled={status === "sending"} data-cursor="disable">
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/adithyalee"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/adithyathaninki"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Developed <br /> by <span>Adithya Thaninki</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
