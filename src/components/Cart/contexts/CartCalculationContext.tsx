import { PropsWithChildren, createContext, useContext } from "react";
import { useCalculateOrder } from "@/hooks/Cart/useCalculateOrder";
import { useCartDataContext } from "./CartDataContext";
import { useCartSelectionContext } from "./CartSelectionContext";

interface CartCalculationContextValue {
  subtotalPrice: number;
  shippingFee: number;
  finalPrice: number;
  selectedCartItemsCount: number;
}

const CartCalculationContext =
  createContext<CartCalculationContextValue | null>(null);

export const useCartCalculationContext = () => {
  const context = useContext(CartCalculationContext);
  if (!context) {
    throw new Error(
      "useCartCalculationContext must be used within CartCalculationProvider"
    );
  }
  return context;
};

interface CartCalculationProviderProps extends PropsWithChildren {}

export const CartCalculationProvider = ({
  children,
}: CartCalculationProviderProps) => {
  const { cartItemsData } = useCartDataContext();
  const { selectedCartIds } = useCartSelectionContext();

  const { subtotalPrice, shippingFee, finalPrice, selectedCartItemsCount } =
    useCalculateOrder(cartItemsData, selectedCartIds);

  const contextValue: CartCalculationContextValue = {
    subtotalPrice,
    shippingFee,
    finalPrice,
    selectedCartItemsCount,
  };

  return (
    <CartCalculationContext.Provider value={contextValue}>
      {children}
    </CartCalculationContext.Provider>
  );
};
