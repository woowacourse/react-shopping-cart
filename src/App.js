import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ItemList from "./page/ItemList";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<ItemList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
