import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import ItemList from "./pages/ItemList";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
