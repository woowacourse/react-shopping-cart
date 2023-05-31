import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import CartView from "./pages/CartView";
import Header from "./components/Header/Header";
import { URLS } from "./constants/urls";

const App = () => {
  return (
    <>
      <Header homeUrl={URLS.home} cartViewPageUrl={URLS.cartView} />
      <Routes>
        <Route path={URLS.home} element={<Main />} />
        <Route path={URLS.cartView} element={<CartView />} />
      </Routes>
    </>
  );
};

export default App;
