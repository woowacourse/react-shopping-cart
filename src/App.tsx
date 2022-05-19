import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PATH from "./constants/path";
import GlobalStyles from "./globalStyles";
import Detail from "./pages/Detail";
import ItemList from "./pages/ItemList";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path={PATH.PRODUCT_LIST} element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
