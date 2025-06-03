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
import useCheckedArray from "../../hooks/useCheckedArray";
import {
  NO_ITEM_IN_CART,
  CART_ITEM_TYPE_COUNT,
} from "../../constants/systemMessages";
import tryApiCall from "../../utils/tryApiCall";
import { useToast } from "../../contexts/ToastContext";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import CartPageSkeleton from "./skeleton/CartPageSkeleton";
import { useState } from "react";
import type { LoadingType } from "../../types/loading";

const CartPage = () => {
  const {
    cartData,
    updateCartItem,
    increaseCartItem,
    removeCartItem,
    initCartData,
  } = useCartData();
  const {
    isCheckedArray,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    initIsCheckedArray,
    isAllChecked,
  } = useCheckedArray(cartData);
  const { openToast } = useToast();
  const { goOrderComplete } = useEasyNavigate();
  const [loadingState, setLoadingState] =
    useState<LoadingType>("initialLoading");

  useEffect(() => {
    setLoadingState("initialLoading");

    const fetchCartData = async () => {
      const initialCartData = await tryApiCall(
        () => getCart(),
        openToast,
        "장바구니 데이터를 불러왔습니다."
      );
      if (!initialCartData) {
        setLoadingState("error");
        return;
      }
      initCartData(initialCartData);
      initIsCheckedArray(initialCartData);
      setLoadingState("success");
    };

    fetchCartData();
  }, []);

  console.log(loadingState);

  if (loadingState === "initialLoading") {
    console.log("작동");
    return <CartPageSkeleton />;
  }

  return (
    <div css={S.cartPageWrapper}>
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
                checked={isAllChecked}
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
          disabled={isCheckedArray.length === 0}
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
