import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PATH from "./constants/path";
import Detail from "./page/Detail";
import ItemList from "./page/ItemList";
import NotFound from "./page/NotFound";

const App = () => {
  return (
    <>
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
