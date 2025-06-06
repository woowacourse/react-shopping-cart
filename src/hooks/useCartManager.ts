import { useEffect, useMemo } from "react";
import { useCartContext, useCartDispatch } from "../stores/CartContext";
import { useSelectContext, useSelectDispatch } from "../stores/SelectContext";
import useCart from "./useCart";
import { calculateTotalPrice, calculateShippingFee } from "../domains/price";
import { ResponseCartItem } from "../types/types";
import { SelectState } from "../stores/SelectReducer";

interface UseCartManagerReturn {
  cartData: ResponseCartItem[];
  selectData: SelectState[];
  selectedCartItem: ResponseCartItem[];
  orderPrice: number;
  deliveryPrice: number;
  isCartEmpty: boolean;
  isLoading: boolean;
}

function useCartManager(): UseCartManagerReturn {
  const dispatch = useCartDispatch();
  const selectDispatch = useSelectDispatch();
  const selectData = useSelectContext();
  const cartData = useCartContext();
  const { cartItemList: cartItemRes, isLoading } = useCart();

  useEffect(() => {
    if (cartItemRes.length > 0) {
      dispatch({
        type: "SET_CART",
        payload: { items: cartItemRes },
      });

      selectDispatch({
        type: "SET_SELECT",
        payload: { items: cartItemRes },
      });
    }
  }, [cartItemRes, dispatch, selectDispatch]);

  const selectedCartItem = useMemo((): ResponseCartItem[] => {
    return cartData?.filter((_, idx) => selectData[idx]?.selected) || [];
  }, [cartData, selectData]);

  const { orderPrice, deliveryPrice } = useMemo(() => {
    const selectedCartData = cartData.filter(
      (_, idx) => selectData[idx]?.selected
    );
    const calculatedOrderPrice = calculateTotalPrice(selectedCartData);
    const calculatedDeliveryPrice = calculateShippingFee(calculatedOrderPrice);

    return {
      orderPrice: calculatedOrderPrice,
      deliveryPrice: calculatedDeliveryPrice,
    };
  }, [selectData, cartData]);

  const isCartEmpty: boolean = cartData.length === 0;

  return {
    cartData,
    selectData,
    selectedCartItem,
    orderPrice,
    deliveryPrice,
    isCartEmpty,
    isLoading,
  };
}

export default useCartManager;
