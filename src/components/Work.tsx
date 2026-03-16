import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "AI Video Engine",
    category: "Full-Stack AI Orchestration",
    tools: "Next.js 15, TypeScript, Gemini API, Inngest, Neon DB, Docker",
    image: "/images/video-engine.svg",
    liveUrl: "https://vediomax-ai-video-generator-schedul.vercel.app",
    githubUrl: "https://github.com/adithyalee/Vediomax-AI-video-generator-scheduler",
  },
  {
    title: "AI UI/UX Mockup Generator",
    category: "Generative SaaS",
    tools: "Next.js, React, Tailwind CSS, Neon DB, Clerk Auth",
    image: "/images/mockup-gen.svg",
    liveUrl: undefined,
    githubUrl: "https://github.com/adithyalee/uiuxmockup",
  },
  {
    title: "Classification Research",
    category: "Machine Learning (Peer-Reviewed)",
    tools: "Python, Scikit-learn, Feature Selection, ML Classification",
    image: "/images/research.svg",
    paperUrl: "/files/FeatureHypothyroid_MSD.pdf",
    researchGateUrl: "https://www.researchgate.net/publication/369407939_Feature_Over_Exemplification-Based_Classification_for_Revelation_of_Hypothyroid",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        {(project.liveUrl || project.githubUrl || project.paperUrl || project.researchGateUrl) && (
                          <div className="carousel-links">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="carousel-link" data-cursor="disable">
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="carousel-link" data-cursor="disable">
                                GitHub
                              </a>
                            )}
                            {project.paperUrl && (
                              <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="carousel-link" data-cursor="disable">
                                View PDF
                              </a>
                            )}
                            {project.researchGateUrl && (
                              <a href={project.researchGateUrl} target="_blank" rel="noopener noreferrer" className="carousel-link" data-cursor="disable">
                                ResearchGate
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} link={project.liveUrl || project.githubUrl || project.paperUrl || project.researchGateUrl} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
