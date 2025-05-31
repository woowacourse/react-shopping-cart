import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { Cart, getShoppingCartData } from '../../../api/cart';

const OrderListContext = createContext<{
  selectionMap: Record<string, boolean>;
  setSelectionMap: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  cartListData: Cart[] | undefined;
  cartRefetch: () => Promise<void>;
}>({
  selectionMap: {},
  setSelectionMap: () => {},
  cartListData: [],
  cartRefetch: async () => {},
});

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({});

  return (
    <OrderListContext.Provider
      value={{ selectionMap, setSelectionMap, cartListData, cartRefetch }}
    >
      {children}
    </OrderListContext.Provider>
  );
};

export const useOrderListContext = () => {
  const context = useContext(OrderListContext);

  if (!context) {
    throw new Error(
      'useOrderListContext must be used within an OrderListProvider'
    );
  }

  const { selectionMap, setSelectionMap, cartListData, cartRefetch } = context;

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
    cartListData,
    cartRefetch,
  };
};
