import { lazy, Suspense } from "react";
import "./App.css";
import { SmoothScrollProvider } from "./context/SmoothScrollContext";
import { LoadingProvider } from "./context/LoadingProvider";

const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  return (
    <LoadingProvider>
      <SmoothScrollProvider>
        <Suspense>
          <MainContainer />
        </Suspense>
      </SmoothScrollProvider>
    </LoadingProvider>
  );
};

export default App;
