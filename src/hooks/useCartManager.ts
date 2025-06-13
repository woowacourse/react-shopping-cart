import { useEffect, useMemo } from "react";
import { useCartContext } from "../stores/CartContext";
import { useSelectContext } from "../stores/SelectContext";
import useCart from "./useCart";
import { calculateTotalPrice, calculateShippingFee } from "../domains/price";
import { ResponseCartItem } from "../types/types";
import { SelectState } from "../stores/SelectReducer";
import useCartAction from "./useCartAction";
import useSelectAction from "./useSelectAction";
import { getLocalStorage, setLocalStorage } from "../utils/storage";
import { SELECTED_INFO_KEY } from "../domains/selectedInfo";

interface UseCartManagerReturn {
  cartData: ResponseCartItem[];
  selectedState: SelectState[];
  selectedCartItem: ResponseCartItem[];
  orderPrice: number;
  deliveryPrice: number;
  isCartEmpty: boolean;
  isLoading: boolean;
}

function useCartManager(): UseCartManagerReturn {
  const { selectedState } = useSelectContext();
  const cartData = useCartContext();

  const { setCartInfo } = useCartAction();
  const { setSelectInfo } = useSelectAction();
  const { cartItemList: cartItemRes, isLoading } = useCart();

  useEffect(() => {
    if (cartItemRes.length > 0) {
      setCartInfo({ items: cartItemRes });

      const selectedInfo = getLocalStorage<SelectState[]>(SELECTED_INFO_KEY);
      const initialState = cartItemRes.map((item) => {
        return {
          id: item.id,
          selected: false,
        };
      });

      if (!selectedInfo || selectedInfo.length !== cartItemRes.length) {
        setSelectInfo({
          items: initialState,
        });

        setLocalStorage<SelectState[]>(SELECTED_INFO_KEY, initialState);
        return;
      }

      setSelectInfo({
        items: selectedInfo,
      });
    }
  }, [cartItemRes, setCartInfo, setSelectInfo]);

  const selectedCartItem = useMemo((): ResponseCartItem[] => {
    return cartData?.filter((_, idx) => selectedState[idx]?.selected) || [];
  }, [cartData, selectedState]);

  const { orderPrice, deliveryPrice } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectedState[idx]?.selected
    );
    const calculatedOrderPrice = calculateTotalPrice(selectedCartData);
    const calculatedDeliveryPrice = calculateShippingFee(calculatedOrderPrice);

    return {
      orderPrice: calculatedOrderPrice,
      deliveryPrice: calculatedDeliveryPrice,
    };
  }, [selectedState, cartData]);

  const isCartEmpty: boolean = cartData.length === 0;

  return {
    cartData,
    selectedState,
    selectedCartItem,
    orderPrice,
    deliveryPrice,
    isCartEmpty,
    isLoading,
  };
}

export default useCartManager;
