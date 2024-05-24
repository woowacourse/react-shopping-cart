import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
import { Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import OrderConfirmPage from "./OrderConfirmPage";
import { useEffect } from "react";

const OrderConfirmDataLoader = () => {
  const cartItems = useRecoilValue(cartItemSelector);
  const [cartItem, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const selectedItemsId = JSON.parse(
      localStorage.getItem("selectedItems") || "[]"
    );
    const selectedCartItems = cartItems.filter((item) =>
      selectedItemsId.includes(item.id)
    );

    setCartItems(selectedCartItems);
  }, []);

  return (
    <Suspense fallback={<OrderConfirmPage selectedCartItems={cartItems} />}>
      {cartItem.length > 0 && <OrderConfirmPage selectedCartItems={cartItem} />}
    </Suspense>
  );
};

export default OrderConfirmDataLoader;
