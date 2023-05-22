import { useState } from "react";

export function useAddProductCount() {
  const [count, setCount] = useState(1);

  function getCount(count: number) {
    setCount(count);
  }

  function increaseQuantity() {
    setCount((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  }

  return { count, getCount, increaseQuantity, decreaseQuantity };
}
