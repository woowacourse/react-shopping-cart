import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export default useCart;
