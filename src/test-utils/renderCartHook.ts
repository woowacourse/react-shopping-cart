import { renderHook } from "@testing-library/react";
import useCart from "../hooks/useCart";
import useCartCalculations from "../hooks/useCartCalculations";
import wrapper from "./wrapper";

export const renderCartHook = () =>
  renderHook(
    () => {
      const cart = useCart();
      const calculations = useCartCalculations();
      return { ...cart, ...calculations };
    },
    { wrapper }
  );
