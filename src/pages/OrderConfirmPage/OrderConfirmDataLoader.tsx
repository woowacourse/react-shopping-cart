import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
import { useRecoilValue } from "recoil";
import OrderConfirmPage from "./OrderConfirmPage";
import { useEffect, useState } from "react";
import CartPageSkeleton from "../CartPage/CartPage.skeleton";
import MainLayout from "@/components/layout/MainLayout";
import BackButton from "@/components/_common/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import { CartItem } from "@/types/cart";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../Error/ErrorPage";

const OrderConfirmDataLoader = () => {
  const cartItems = useRecoilValue(cartItemSelector);
  const cartItem = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

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

    setSelectedItems(selectedCartItems);
  }, []);

  return (
    <MainLayout>
      <MainLayout.Header>
        <BackButton onClick={onMoveCartPage} />
      </MainLayout.Header>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <MainLayout.Body fallback={<CartPageSkeleton />}>
          {cartItem.length > 0 && (
            <OrderConfirmPage selectedCartItems={selectedItems} />
          )}
        </MainLayout.Body>
      </ErrorBoundary>
    </MainLayout>
  );
};

export default OrderConfirmDataLoader;
