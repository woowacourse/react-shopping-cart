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

const STORAGE_KEY = 'shopping_cart_selections';

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedSelections = localStorage.getItem(STORAGE_KEY);
        return savedSelections ? JSON.parse(savedSelections) : {};
      } catch (error) {
        console.error(
          '로컬스토리지에서 선택 상태를 불러오는데 실패했습니다:',
          error
        );
        return {};
      }
    }
  );

  // selectionMap이 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectionMap));
    } catch (error) {
      console.error(
        '로컬스토리지에 선택 상태를 저장하는데 실패했습니다:',
        error
      );
    }
  }, [selectionMap]);

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
        // 로컬스토리지에 저장된 값이 있으면 그것을 사용, 없으면 기본값 true
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
    selectedItems,
    orderPrice,
    shippingFee,
    totalPrice,
  };
};
