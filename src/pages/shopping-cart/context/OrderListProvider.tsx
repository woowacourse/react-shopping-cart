import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { Cart, getShoppingCartData } from '../../../api/cart';
import { calculateTotalCartItemPrice } from '@/utils/calculateTotalCartItemPrice';
import { calculateShippingFee } from '@/utils/calculateShippingFee';

const OrderListContext = createContext<{
  selectionMap: Record<string, boolean>;
  setSelectionMap: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  cartListData: Cart[] | undefined;
  cartRefetch: () => Promise<void>;
  selectedItems: Cart[];
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
}>({
  selectionMap: {},
  setSelectionMap: () => {},
  cartListData: [],
  cartRefetch: async () => {},
  selectedItems: [],
  orderPrice: 0,
  shippingFee: 0,
  totalPrice: 0,
});

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({});
  const selectedItems = (cartListData ?? []).filter(
    (item) => selectionMap[item.id]
  );
  const orderPrice = calculateTotalCartItemPrice(selectedItems);
  const shippingFee = calculateShippingFee(orderPrice);
  const totalPrice = orderPrice + shippingFee;

  return (
    <OrderListContext.Provider
      value={{
        selectionMap,
        setSelectionMap,
        cartListData,
        cartRefetch,
        selectedItems,
        orderPrice,
        shippingFee,
        totalPrice,
      }}
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

  const {
    selectionMap,
    setSelectionMap,
    cartListData,
    cartRefetch,
    selectedItems,
    orderPrice,
    shippingFee,
    totalPrice,
  } = context;

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
    selectedItems,
    orderPrice,
    shippingFee,
    totalPrice,
  };
};
