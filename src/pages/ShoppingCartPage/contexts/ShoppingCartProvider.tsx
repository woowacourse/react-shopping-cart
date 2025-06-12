import { usePersistState } from "@/hooks";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

type SelectedItemIds = number[];
type SelectedCouponIds = number[];
type IsFar = boolean;

interface ShoppingCartContextType {
  selectedItemIds: SelectedItemIds;
  setSelectedItemIds: Dispatch<SetStateAction<SelectedItemIds>>;
  selectedCouponIds: SelectedCouponIds;
  setSelectedCouponIds: Dispatch<SetStateAction<SelectedCouponIds>>;
  isFar: IsFar;
  setIsFar: Dispatch<SetStateAction<IsFar>>;
}

interface ShoppingCartProviderProps {}

export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export default function ShoppingCartProvider({ children }: PropsWithChildren<ShoppingCartProviderProps>) {
  const [selectedItemIds, setSelectedItemIds] = usePersistState<SelectedItemIds>("selectedItemIds", []);
  const [selectedCouponIds, setSelectedCouponIds] = useState<SelectedCouponIds>([]);
  const [isFar, setIsFar] = useState<IsFar>(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        selectedItemIds,
        setSelectedItemIds,
        selectedCouponIds,
        setSelectedCouponIds,
        isFar,
        setIsFar,
      }}
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
