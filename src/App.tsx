import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>로딩 중입니다..</div>}>
      <div className="app">
        <Outlet />
      </div>
    </Suspense>
  );
}

export default App;
