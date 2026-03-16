import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

const SESSION_KEY = "portfolio_intro_seen";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [loading, setLoading] = useState(0);

  const setIsLoadingWithSession = (state: boolean) => {
    if (!state) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {}
    }
    setIsLoading(state);
  };

  const value = {
    isLoading,
    setIsLoading: setIsLoadingWithSession,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  useEffect(() => {
    if (!isLoading) {
      import("../components/utils/initialFX").then((m) => m.initialFX?.());
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
