// 새로운 구조로 리팩터링된 CartProvider
// 분리된 Context들을 사용하는 새로운 구조
import { PropsWithChildren } from "react";
import { CartCombinedProvider } from "./contexts/CartCombinedProvider";

interface CartProviderProps extends PropsWithChildren {
  onNext?: () => void;
}

export const CartProvider = ({ children, onNext }: CartProviderProps) => {
  return (
    <CartCombinedProvider onNext={onNext}>{children}</CartCombinedProvider>
  );
};

// 레거시 호환성을 위한 useCartContext export
export { useCartContext } from "./contexts/useCartContext";
