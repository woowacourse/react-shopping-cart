import { PropsWithChildren, createContext, useContext } from "react";
import { CartDataProvider } from "./CartDataContext";
import { CartSelectionProvider } from "./CartSelectionContext";
import { CartCalculationProvider } from "./CartCalculationContext";

interface CartCombinedContextValue {
  onNext: () => void;
}

const CartCombinedContext = createContext<CartCombinedContextValue | null>(
  null
);

export const useCartCombinedContext = () => {
  const context = useContext(CartCombinedContext);
  if (!context) {
    throw new Error(
      "useCartCombinedContext must be used within CartCombinedProvider"
    );
  }
  return context;
};

interface CartCombinedProviderProps extends PropsWithChildren {
  onNext?: () => void;
}

export const CartCombinedProvider = ({
  children,
  onNext,
}: CartCombinedProviderProps) => {
  const contextValue: CartCombinedContextValue = {
    onNext: onNext ?? (() => {}),
  };

  return (
    <CartDataProvider>
      <CartSelectionProvider>
        <CartCalculationProvider>
          <CartCombinedContext.Provider value={contextValue}>
            {children}
          </CartCombinedContext.Provider>
        </CartCalculationProvider>
      </CartSelectionProvider>
    </CartDataProvider>
  );
};

// 편의를 위한 통합 훅들
export { useCartDataContext } from "./CartDataContext";
export { useCartSelectionContext } from "./CartSelectionContext";
export { useCartCalculationContext } from "./CartCalculationContext";
