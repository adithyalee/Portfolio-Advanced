import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import "./styles/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top 80px",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    setScrolled(st?.isActive ?? false);
    return () => st?.kill();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a[data-href]");
      if (!target || window.innerWidth <= 1024) return;
      e.preventDefault();
      const section = (target as HTMLAnchorElement).getAttribute("data-href");
      if (section) {
        lenis.scrollTo(section, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp: 0.08,
        });
      }
    };
    document.querySelector(".header")?.addEventListener("click", handler);
    return () => document.querySelector(".header")?.removeEventListener("click", handler);
  }, [lenis]);

  return (
    <>
      <div className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="#landingDiv" data-href="#landingDiv" className="navbar-title" data-cursor="disable">
          AT
        </a>
        <a
          href="mailto:adithya040@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          adithya040@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
