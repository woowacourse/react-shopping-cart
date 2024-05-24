import { cartItemSelector } from "@/recoil/cartItems";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import OrderConfirmPage from "./OrderConfirmPage";

const OrderConfirmDataLoader = () => {
  const cartItemsSelector = useRecoilValue(cartItemSelector);
  const cartItems = cartItemsSelector;

  const selectedItemsId = JSON.parse(
    localStorage.getItem("selectedItems") || "[]"
  );
  const selectedCartItems = cartItems.filter((item) =>
    selectedItemsId.includes(item.id)
  );
  return (
    <Suspense
      fallback={<OrderConfirmPage selectedCartItems={cartItemsSelector} />}
    >
      {selectedCartItems && (
        <OrderConfirmPage selectedCartItems={selectedCartItems} />
      )}
    </Suspense>
  );
};

export default OrderConfirmDataLoader;
