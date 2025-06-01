import "./App.css";
import CartSection from "./components/feature/CartSection";
import useGetCartItems from "./hooks/useGetCartItems";

function App() {
  const { cartItems, refetch } = useGetCartItems();

  return (
    <>{cartItems && <CartSection cartItems={cartItems} refetch={refetch} />}</>
  );
}

export default App;
