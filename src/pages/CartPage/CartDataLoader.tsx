import { ReactNode, useEffect } from "react";
import { useCartDispatch } from "../../stores/CartContext";
import { useSelectDispatch } from "../../stores/SelectContext";
import useCart from "../../hooks/useCart";

interface CartDataLoaderProps {
  children: ReactNode;
}

const CartDataLoader = ({ children }: CartDataLoaderProps) => {
  const dispatch = useCartDispatch();
  const selectDispatch = useSelectDispatch();
  const { cartItemList, isLoading } = useCart();

  useEffect(() => {
    if (cartItemList.length > 0) {
      dispatch({
        type: "SET_CART",
        payload: { items: cartItemList },
      });

      selectDispatch({
        type: "SET_SELECT",
        payload: { items: cartItemList },
      });
    }
  }, [cartItemList, dispatch, selectDispatch]);

  if (isLoading) {
    return <div>장바구니를 불러오는 중입니다...</div>;
  }

  return <>{children}</>;
};

export default CartDataLoader;
