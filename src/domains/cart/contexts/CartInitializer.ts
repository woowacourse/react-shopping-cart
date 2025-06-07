import { useEffect } from "react";
import useCartDispatch from "../hooks/useCartOperations";

const CartInitializer = () => {
  const { fetchData } = useCartDispatch();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return null;
};

export default CartInitializer;
