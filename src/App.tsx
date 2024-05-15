import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import AddButton from "./components/AddButton/AddButton";
import { useRecoilValue } from "recoil";
import { cartState } from "./store/selector/cartState";

function App() {
  const state = useRecoilValue(cartState);
  console.log("all items", state);
  return (
    <>
      <Header />
      <Main />
      <Footer />
      {import.meta.env.DEV ? <AddButton /> : null}
    </>
  );
}

export default App;
