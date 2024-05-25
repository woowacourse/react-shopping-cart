import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
import { useRecoilState, useRecoilValue } from "recoil";
import OrderConfirmPage from "./OrderConfirmPage";
import { useEffect } from "react";
import CartPageSkeleton from "../CartPage/CartPage.skeleton";
import MainLayout from "@/components/layout/MainLayout";
import BackButton from "@/components/_common/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import { CART_PAGE_MESSAGES } from "@/constants/cart";

const OrderConfirmDataLoader = () => {
  const cartItems = useRecoilValue(cartItemSelector);
  const [cartItem, setCartItems] = useRecoilState(cartItemsState);

  const navigate = useNavigate();

  const onMoveCartPage = () => {
    if (confirm(CART_PAGE_MESSAGES.askMoveToCartPage)) {
      navigate(-1);
    }
  };

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
    <MainLayout>
      <MainLayout.Header>
        <BackButton onClick={onMoveCartPage} />
      </MainLayout.Header>
      <MainLayout.Body fallback={<CartPageSkeleton />}>
        {cartItem.length > 0 && (
          <OrderConfirmPage selectedCartItems={cartItem} />
        )}
      </MainLayout.Body>
    </MainLayout>
  );
};

export default OrderConfirmDataLoader;
