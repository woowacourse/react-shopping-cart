import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart } from "../api/cart";

const OrderListContext = createContext<{
  selectionMap: Record<string, boolean>;
  setSelectionMap: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}>({
  selectionMap: {},
  setSelectionMap: () => {},
});

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({});

  return (
    <OrderListContext.Provider value={{ selectionMap, setSelectionMap }}>
      {children}
    </OrderListContext.Provider>
  );
};

export const useOrderListContext = (cartListData: Cart[] | undefined) => {
  const { selectionMap, setSelectionMap } = useContext(OrderListContext);
  if (!selectionMap) {
    throw new Error(
      "useOrderListContext 는 반드시 OrderListProvider 안에서 사용되어야합니다."
    );
  }

  useEffect(() => {
    if (!cartListData) return;

    setSelectionMap((prev) => {
      const nextMap: Record<string, boolean> = {};
      for (const cart of cartListData) {
        nextMap[cart.id] = prev[cart.id] ?? true;
      }
      return nextMap;
    });
  }, [cartListData, setSelectionMap]);

  return {
    selectionMap,
    setSelectionMap,
  };
};
