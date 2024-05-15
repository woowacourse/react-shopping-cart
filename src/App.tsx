import { Suspense } from "react";
import "./App.css";
import CartItemList from "./components/CartItemList";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <CartItemList />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
