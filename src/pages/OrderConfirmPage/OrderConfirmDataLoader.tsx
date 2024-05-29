import { cartItemsState } from "@/recoil/cartItems";
import { useRecoilState, useRecoilValue } from "recoil";
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
import {
  selectedCartItemsIdState,
  selectedCartListSelector,
} from "@/recoil/selectedCardItems";
import { getLocalStorage } from "@/utils/localStorage";

const OrderConfirmDataLoader = () => {
  const cartItem = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const selectedCartItems = useRecoilValue(selectedCartListSelector);
  const [selectedCartItemsId, setselectedCartItemsIds] = useRecoilState(
    selectedCartItemsIdState
  );
  const navigate = useNavigate();

  const onMoveCartPage = () => {
    if (confirm(CART_PAGE_MESSAGES.askMoveToCartPage)) {
      navigate(PAGE_URL.home);
    }
  };

  useEffect(() => {
    setselectedCartItemsIds(getLocalStorage("selectedItems"));
    setSelectedItems(selectedCartItems);

    if (!selectedCartItemsId.length) {
      alert(ErrorMessage.noOrderInfo);
      navigate(PAGE_URL.home);
    }
  }, [navigate]);

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
