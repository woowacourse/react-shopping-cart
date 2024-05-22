import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/default";

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={element}
                />
              ))}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
