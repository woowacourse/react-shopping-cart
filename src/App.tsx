import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import CartView from "./pages/CartView";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart-view" element={<CartView />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
