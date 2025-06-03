import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (
    import.meta.env.MODE !== "development" &&
    import.meta.env.VITE_APP_ENABLE_MSW !== "true"
  ) {
    return;
  }

  const { worker } = await import("./mocks/browsers");

  return worker.start();
}

enableMocking().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: 테스트 환경에서는 무조건 렌더링되어야 하기 때문에 무조건 존재하는 요소로 처리
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
