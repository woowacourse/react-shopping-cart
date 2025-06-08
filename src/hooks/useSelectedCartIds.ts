import { useState } from "react";
import { CartProduct } from "../type/cart";

const useSelectedCartIds = (cartItems: CartProduct[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>(
    cartItems.map((item) => item.id)
  );

  return { selectedCartIds, setSelectedCartIds };
};

export default useSelectedCartIds;
