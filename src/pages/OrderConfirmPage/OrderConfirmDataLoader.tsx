import { cartItemsState } from "@/recoil/cartItems";
import { useRecoilValue } from "recoil";
import OrderConfirmPage from "./OrderConfirmPage";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import BackButton from "@/components/_common/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import { CartItem } from "@/types/cart";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../Error/ErrorPage";
import { PAGE_URL } from "@/constants/url";
import { ErrorMessage } from "@/constants/error";
import { selectedCartItemList } from "@/recoil/selectedCardItems";

const OrderConfirmDataLoader = () => {
  const cartItem = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const selectedCartItems = useRecoilValue(selectedCartItemList);
  const navigate = useNavigate();

  const onMoveCartPage = () => {
    if (confirm(CART_PAGE_MESSAGES.askMoveToCartPage)) {
      navigate(PAGE_URL.home);
    }
  };

  useEffect(() => {
    setSelectedItems(selectedCartItems);

    if (!selectedCartItems.length) {
      alert(ErrorMessage.noOrderInfo);
      navigate(PAGE_URL.home);
    }
  }, [selectedCartItems, navigate]);

  return (
    <MainLayout>
      <MainLayout.Header>
        <BackButton onClick={onMoveCartPage} />
      </MainLayout.Header>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <MainLayout.Body>
          {cartItem.length > 0 && (
            <OrderConfirmPage selectedCartItems={selectedItems} />
          )}
        </MainLayout.Body>
      </ErrorBoundary>
    </MainLayout>
  );
};

export default OrderConfirmDataLoader;
