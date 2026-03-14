import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "./LoadingProvider";

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { isLoading } = useLoading();
  const initRef = useRef(false);

  useEffect(() => {
    if (isLoading || initRef.current) return;

    initRef.current = true;
    let instance: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    const doCleanup = () => {
      if (instance) {
        window.removeEventListener("resize", onResize);
        if (rafCallback) gsap.ticker.remove(rafCallback);
        instance.destroy();
        setLenis(null);
      }
      initRef.current = false;
    };

    const onResize = () => {
      instance?.resize();
      ScrollTrigger.refresh();
    };

    // Wait for DOM to settle after loading overlay unmounts - ensures smooth first scroll
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        instance = new Lenis({
          lerp: 0.06,
          duration: 1.4,
          smoothWheel: true,
          wheelMultiplier: 1.2,
          touchMultiplier: 2.2,
          autoRaf: false,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        setLenis(instance);

        instance.on("scroll", ScrollTrigger.update);

        rafCallback = (time: number) => {
          instance!.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        window.addEventListener("resize", onResize);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      doCleanup();
    };
  }, [isLoading]);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
