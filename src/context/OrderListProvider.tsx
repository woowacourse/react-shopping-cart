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

const STORAGE_KEY = "cart-selection-map";

const OrderListContext = createContext<{
  selectionMap: Record<string, boolean>;
  setSelectionMap: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  orderIdList?: string[];
  isIsland: boolean;
  handleIsIslandToggle: () => void;
  discount: number;
  handleDiscountSetting: (discountAmount: number) => void;
}>({
  selectionMap: {},
  setSelectionMap: () => { },
  orderIdList: [],
  isIsland: false,
  handleIsIslandToggle: () => { },
  discount: 0,
  handleDiscountSetting: () => { },
});

export const OrderListProvider = ({ children }: PropsWithChildren) => {
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>(() => {
    const savedMap = localStorage.getItem(STORAGE_KEY);
    return savedMap ? JSON.parse(savedMap) : {};
  });
  const [isIsland, setIsIsland] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectionMap));
  }, [selectionMap]);

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
        selectionMap,
        setSelectionMap,
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
    selectionMap,
    setSelectionMap,
    isIsland,
    handleIsIslandToggle,
    discount,
    handleDiscountSetting,
  } = useContext(OrderListContext);
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

  const orderIdList = useMemo(
    () =>
      Object.entries(selectionMap)
        .filter(([, isInCart]) => isInCart)
        .map(([id]) => id),
    [selectionMap]
  );

  return {
    selectionMap,
    setSelectionMap,
    orderIdList,
    isIsland,
    handleIsIslandToggle,
    discount,
    handleDiscountSetting,
  };
};
