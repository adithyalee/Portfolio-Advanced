import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Computer Vision Research Intern</h4>
                <h5>CSIR-CEERI</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Designed object recognition pipelines in Python (OpenCV/Scikit-learn).
              Achieved 91% detection accuracy (12% improvement) on 10,000+ samples,
              contributing to peer-reviewed findings.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Tata Consultancy Services</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Maintained Java-based microservices for global transit platforms
              (2M+ daily transactions). Automated deployments via Jenkins CI/CD
              and monitored system health with Datadog.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MEng Software Engineering</h4>
                <h5>Carleton University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Specializing in scalable systems and AI orchestration. Maintaining
              a CGPA of 3.65/4.0 while building production-grade AI platforms
              and distributed architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
