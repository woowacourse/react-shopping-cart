import { useEffect } from "react";

import Button from "../../components/@common/button/Button";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import ErrorFallback from "../../components/@common/errorFallBack/ErrorFallBack";
import CartItem from "../../components/features/cartItem/CartItem";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import CartPageSkeleton from "./skeleton/CartPageSkeleton";
import * as S from "./CartPage.styles";
import { CartListContainer } from "../../styles/@common/page/Page.styles";
import { Title, Description } from "../../styles/@common/title/Title.styles";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import { CheckboxContainer } from "../../styles/@common/checkBox/CheckBox.styles";

import useApiHandler from "../../hooks/@common/useApiHandler";
import useCheckedSet from "../../hooks/useCheckedSet";
import useCartData from "../../hooks/useCartData";
import useEasyNavigate from "../../hooks/useEasyNavigate";

import { getCart } from "../../services/cartService";
import { getCartItemById } from "../../utils/getCartItemById";
import { getPriceSummary } from "../../domains/price";

import {
  NO_ITEM_IN_CART,
  getCartItemTypeCountMessage,
} from "../../constants/systemMessages";

import type { CartItemType } from "../../types/response";

const CartPage = () => {
  const { callApi, loadingState } = useApiHandler();

  const {
    isCheckedSet,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    initIsCheckedSet,
    syncIsCheckedSet,
  } = useCheckedSet();

  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
  } = useCartData({ callApi, syncIsCheckedSet });

  const { goOrderConfirmation, goHome } = useEasyNavigate();

  const { orderPrice, deliveryFee, totalPrice } = getPriceSummary(
    cartData,
    isCheckedSet
  );
  const orderItems = Array.from(isCheckedSet)
    .map((id) => getCartItemById(cartData, id))
    .filter((item): item is CartItemType => item !== undefined);

  useEffect(() => {
    const fetchCartData = async () => {
      const initialCartData = await callApi<CartItemType[]>(
        () => getCart(),
        "장바구니 데이터를 불러왔습니다.",
        "initialLoading"
      );
      if (!initialCartData) {
        return;
      }
      initCartData(initialCartData);
      initIsCheckedSet(initialCartData.map((item: CartItemType) => item.id));
    };

    fetchCartData();
  }, []);

  if (loadingState === "initialLoading") {
    return <CartPageSkeleton data-testid="cart-page-skeleton" />;
  }
  if (loadingState === "error") {
    return (
      <ErrorFallback
        data-testid="error-fallback"
        callBack={goHome}
        errorButtonText="홈으로 돌아가기"
      />
    );
  }
  return (
    <div
      css={[S.cartPageWrapper, loadingState === "updating" && S.dimmedStyle]}
      data-testid="cart-page-wrapper"
    >
      <div css={S.cartTitleContainer}>
        <p css={Title}>장바구니</p>

        {cartData.length === 0 ? (
          <p css={Description}>{NO_ITEM_IN_CART}</p>
        ) : (
          <p css={Description}>{getCartItemTypeCountMessage(cartData)}</p>
        )}
      </div>

      {cartData.length > 0 && (
        <>
          <div css={S.cartList}>
            <div css={CheckboxContainer}>
              <Checkbox
                checked={isCheckedSet.size === cartData.length}
                onChange={() => controlAllCheckBox(cartData)}
              />
              <p>전체 선택</p>
            </div>
            <div css={CartListContainer}>
              {cartData.map((item) => (
                <CartItem
                  key={item.id}
                  cartData={item}
                  updateCartItem={updateCartItem}
                  increaseCartItem={increaseCartItem}
                  justifyIsChecked={justifyIsChecked}
                  controlCheckBox={controlCheckBox}
                  removeCartItem={removeCartItem}
                />
              ))}
            </div>
          </div>

          <CartPrice
            orderPrice={orderPrice}
            deliveryFee={deliveryFee}
            totalPrice={totalPrice}
          />
        </>
      )}

      <div css={buttonFixedContainer}>
        <Button
          size="large"
          color="black"
          disabled={isCheckedSet.size === 0}
          onClick={() =>
            goOrderConfirmation(orderItems, orderPrice, deliveryFee)
          }
        >
          주문 확인
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
