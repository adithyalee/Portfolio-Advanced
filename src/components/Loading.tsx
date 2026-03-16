import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

// iPhone-style: Hola, Bonjour, Chinese, Japanese, Korean, Namaste
const GREETINGS = [
  "Hola",
  "Bonjour",
  "你好",
  "こんにちは",
  "안녕하세요",
  "Namaste",
];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const percentRef = useRef(percent);
  percentRef.current = percent;

  // iPhone-style: always cycle through ALL greetings
  useEffect(() => {
    const id = setInterval(() => {
      setGreetingIndex((i) => {
        if (percentRef.current >= 100 && i === GREETINGS.length - 1) return i;
        return i < GREETINGS.length - 1 ? i + 1 : 0;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  // Open when Namaste + assets loaded (timeout < 900ms so we don't cycle away)
  useEffect(() => {
    const isNamaste = greetingIndex === GREETINGS.length - 1;
    if (!isNamaste || percent < 100) return;

    const id = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) module.initialFX();
          setIsLoading(false);
        });
      }, 500);
    }, 500);

    return () => clearTimeout(id);
  }, [greetingIndex, percent, setIsLoading]);

  // Open after 5s max
  useEffect(() => {
    if (percent >= 100) return;
    const id = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) module.initialFX();
          setIsLoading(false);
        });
      }, 400);
    }, 5000);
    return () => clearTimeout(id);
  }, [percent, setIsLoading]);

  const isNamaste = greetingIndex === GREETINGS.length - 1;

  return (
    <>
      <div className={`loading-header ${exiting ? "loading-header-out" : ""}`}>
        <span className="loading-logo">AT</span>
      </div>
      <div className={`loading-screen ${exiting ? "loading-exit" : ""}`}>
        <div className="loading-bg" />
        <div className="loading-content">
          <div className="loading-greeting-stack">
            {GREETINGS.map((g, i) => (
              <div
                key={g}
                className={`loading-greeting ${i === greetingIndex ? "active" : ""} ${i === greetingIndex && isNamaste ? "is-namaste" : ""}`}
              >
                {g}
              </div>
            ))}
          </div>
        </div>
        <div className="loading-marquee">
          <Marquee speed={26}>
            {GREETINGS.map((g) => (
              <span key={g}>{g}</span>
            ))}
            {GREETINGS.map((g) => (
              <span key={`${g}-2`}>{g}</span>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random() * 2) + 1;
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 600);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 1);
    });
  }
  return { loaded, percent, clear };
};
