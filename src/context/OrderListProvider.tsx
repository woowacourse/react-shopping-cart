import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cart } from "../api/cart";

const STORAGE_KEY = "selected-cart-items";

const OrderListContext = createContext<{
  selectedCartItems: Cart[];
  setSelectedCartItems: React.Dispatch<React.SetStateAction<Cart[]>>;
  orderIdList?: string[];
  isIsland: boolean;
  handleIsIslandToggle: () => void;
  discount: number;
  handleDiscountSetting: (discountAmount: number) => void;
}>({
  selectedCartItems: [],
  setSelectedCartItems: () => { },
  orderIdList: [],
  isIsland: false,
  handleIsIslandToggle: () => { },
  discount: 0,
  handleDiscountSetting: () => { },
});

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const [selectedCartItems, setSelectedCartItems] = useState<Cart[]>(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isIsland, setIsIsland] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCartItems));
  }, [selectedCartItems]);

  const handleIsIslandToggle = useCallback(() => {
    setIsIsland((prev) => !prev);
  }, [setIsIsland]);

  const handleDiscountSetting = useCallback(
    (discountAmount: number) => {
      setDiscount(discountAmount);
    },
    [setDiscount]
  );

  return (
    <OrderListContext.Provider
      value={{
        selectedCartItems,
        setSelectedCartItems,
        isIsland,
        handleIsIslandToggle,
        discount,
        handleDiscountSetting,
      }}
    >
      {children}
    </OrderListContext.Provider>
  );
};

export const useOrderListContext = (cartListData: Cart[] | undefined) => {
  const {
    selectedCartItems,
    setSelectedCartItems,
    isIsland,
    handleIsIslandToggle,
    discount,
    handleDiscountSetting,
  } = useContext(OrderListContext);
  if (!selectedCartItems) {
    throw new Error(
      "useOrderListContext 는 반드시 OrderListProvider 안에서 사용되어야합니다."
    );
  }

  useEffect(() => {
    if (!cartListData) return;

    // 현재 선택된 아이템 중에서 cartListData에 없는 아이템을 제거
    setSelectedCartItems(prev =>
      prev.filter(item => cartListData.some(cart => cart.id === item.id))
    );
  }, [cartListData, setSelectedCartItems]);

  const orderIdList = useMemo(
    () => selectedCartItems.map(item => item.id),
    [selectedCartItems]
  );

  return {
    selectedCartItems,
    setSelectedCartItems,
    orderIdList,
    isIsland,
    handleIsIslandToggle,
    discount,
    handleDiscountSetting,
  };
};
