import { useContext } from "react";
import { CartItemContext } from "./CartItemProvider";

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error(
      "useCartItemContext must be used within a CartItemProvider"
    );
  }
  return context;
};
