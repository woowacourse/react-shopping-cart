import * as S from "./CartPage.styles";
import { Title, Subtitle } from "../../styles/@common/title/Title.styles";
import CartItem from "../../components/features/cartItem/CartItem";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import { getCart } from "../../services/cartService";
import { useEffect } from "react";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import Button from "../../components/@common/button/Button";
import useEasyNavigate from "../../hooks/useEasyNavigate";
import {
  calculateTotalPrice,
  calculateTotalProductCount,
  getCartItemNamePrice,
} from "../../utils/calculate";
import useCartData from "../../hooks/useCartData";
import useCheckedSet from "../../hooks/useCheckedSet";
import {
  NO_ITEM_IN_CART,
  CART_ITEM_TYPE_COUNT,
} from "../../constants/systemMessages";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import CartPageSkeleton from "./skeleton/CartPageSkeleton";
import useData from "../../hooks/@common/useData";
import ErrorFallback from "../../components/@common/errorFallBack/ErrorFallBack";
import type { CartItemType } from "../../types/response";

const CartPage = () => {
  const { callApi, loadingState } = useData();

  const {
    isCheckedSet,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    updateIsCheckedSet,
    syncIsCheckedSet,
  } = useCheckedSet();
  const isCheckedArray = Array.from(isCheckedSet);

  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    updateCartData,
  } = useCartData({ callApi, syncIsCheckedSet });

  const { goOrderComplete } = useEasyNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const initialCartData = await callApi(
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

  console.log(isCheckedSet);

  if (loadingState === "initialLoading") {
    return <CartPageSkeleton />;
  }
  if (loadingState === "error") {
    return <ErrorFallback />;
  }

  return (
    <div
      css={[S.cartPageWrapper, loadingState === "updating" && S.dimmedStyle]}
    >
      <div css={S.cartTitleContainer}>
        <p css={Title}>장바구니</p>

        {cartData.length === 0 ? (
          <p css={Subtitle}>{NO_ITEM_IN_CART}</p>
        ) : (
          <p css={Subtitle}>{CART_ITEM_TYPE_COUNT(cartData)}</p>
        )}
      </div>

      {cartData.length > 0 && (
        <>
          <div css={S.cartList}>
            <div css={S.cartCheckboxContainer}>
              <Checkbox
                checked={isCheckedArray.length === cartData.length}
                onChange={() => controlAllCheckBox(cartData)}
              />
              <p>전체 선택</p>
            </div>
            <div css={S.cartContentContainer}>
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
            cartItemNamePrice={getCartItemNamePrice(isCheckedArray, cartData)}
          />
        </>
      )}

      <div css={buttonFixedContainer}>
        <Button
          size="large"
          color="black"
          disabled={isCheckedSet.size === 0}
          onClick={() =>
            goOrderComplete(
              cartData.length,
              calculateTotalPrice(
                getCartItemNamePrice(isCheckedArray, cartData)
              ),
              calculateTotalProductCount(cartData, isCheckedArray)
            )
          }
        >
          주문 확인
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
