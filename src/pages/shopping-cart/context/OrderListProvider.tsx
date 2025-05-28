import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAPIDataContext } from "../../../context/APIDataProvider";
import { getShoppingCartData } from "../../../api/cart";

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

export const useOrderListContext = () => {
  const { selectionMap, setSelectionMap } = useContext(OrderListContext);
  if (!selectionMap) {
    throw new Error(
      "useOrderListContext must be used within an OrderListProvider"
    );
  }
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });

  useEffect(() => {
    if (!cartListData) return;

    setSelectionMap((prev) => {
      const nextMap: Record<string, boolean> = {};
      for (const cart of cartListData) {
        nextMap[cart.id] = prev[cart.id] ?? true;
      }
      return nextMap;
    });
  }, [cartListData]);

  return {
    selectionMap,
    setSelectionMap,
    cartListData,
    cartRefetch,
  };
};
