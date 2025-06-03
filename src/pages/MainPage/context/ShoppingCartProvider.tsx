import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

interface ShoppingCartContextType {
  selectedItemIds: number[];
  setSelectedItemIds: Dispatch<SetStateAction<number[]>>;
  selectedCouponIds: number[];
  setSelectedCouponIds: Dispatch<SetStateAction<number[]>>;
  isFar: boolean;
  setIsFar: Dispatch<SetStateAction<boolean>>;
}

interface ShoppingCartProviderProps {}

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export default function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProviderProps>) {
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);
  const [isFar, setIsFar] = useState(false);

  return (
    <ShoppingCartContext.Provider
      value={{ selectedItemIds, setSelectedItemIds, selectedCouponIds, setSelectedCouponIds, isFar, setIsFar }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCartContext = () => {
  const value = useContext(ShoppingCartContext);

  if (value === null)
    throw new Error(`ShoppingCartContext value must be used within a ShoppingCartProvider Component!!`);

  return value;
};
