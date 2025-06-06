import * as S from "./CartPage.styles";
import { Title, Description } from "../../styles/@common/title/Title.styles";
import CartItem from "../../components/features/cartItem/CartItem";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import { getCart } from "../../services/cartService";
import { useEffect } from "react";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import Button from "../../components/@common/button/Button";
import useEasyNavigate from "../../hooks/useEasyNavigate";
import useCartData from "../../hooks/useCartData";
import useCheckedSet from "../../hooks/useCheckedSet";
import {
  NO_ITEM_IN_CART,
  CART_ITEM_TYPE_COUNT,
} from "../../constants/systemMessages";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import CartPageSkeleton from "./skeleton/CartPageSkeleton";
import ErrorFallback from "../../components/@common/errorFallBack/ErrorFallBack";
import type { CartItemType } from "../../types/response";
import { getCartItemById } from "../../utils/getCartItemById";
import { CartListContainer } from "../../styles/@common/page/Page.styles";
import { CheckboxContainer } from "../../styles/@common/checkBox/CheckBox.styles";
import useApiHandler from "../../hooks/@common/useApiHandler";
import { getPriceSummary } from "../../domains/price";

const CartPage = () => {
  const { callApi, loadingState } = useApiHandler();

  const {
    isCheckedSet,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    updateIsCheckedSet,
    syncIsCheckedSet,
  } = useCheckedSet();

  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    updateCartData,
  } = useCartData({ callApi, syncIsCheckedSet });

  const { goOrderConfirmation } = useEasyNavigate();

  const { orderPrice, deliveryFee, totalPrice } = getPriceSummary(
    cartData,
    isCheckedSet
  );
  const orderItems = Array.from(isCheckedSet)
    .map((id) => getCartItemById(cartData, id))
    .filter((item) => item !== undefined);

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
      updateCartData(initialCartData);
      updateIsCheckedSet(initialCartData.map((item: CartItemType) => item.id));
    };

    fetchCartData();
  }, []);

  if (loadingState === "initialLoading") {
    return <CartPageSkeleton data-testid="cart-page-skeleton" />;
  }
  if (loadingState === "error") {
    return <ErrorFallback data-testid="error-fallback" />;
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
          <p css={Description}>{CART_ITEM_TYPE_COUNT(cartData)}</p>
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
