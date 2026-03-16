import { PropsWithChildren, useState, useEffect } from "react";
import "./styles/Landing.css";

const ROLES = ["Full Stack", "DevOps", "Cloud", "AI/ML", "Systems Engineer"];

const Landing = ({ children }: PropsWithChildren) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ADITHYA
              <br />
              <span>THANINKI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Software Engineer</h3>
            <div className="landing-rotating-wrap">
              <span className="landing-rotating" key={roleIndex}>
                {ROLES[roleIndex]}
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
