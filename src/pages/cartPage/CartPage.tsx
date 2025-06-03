import * as S from "./CartPage.style";
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

  useEffect(() => {
    const fetchCartData = async () => {
      const initialCartData = await tryApiCall(
        () => getCart(),
        openToast,
        "장바구니 데이터를 불러왔습니다."
      );
      if (!initialCartData) return;

      initCartData(initialCartData);
      initIsCheckedArray(initialCartData);
    };

    fetchCartData();
  }, []);

  // TODO : item이 없을 경우 NO_CONTENT 메세지 보여줄 것
  return (
    <div css={S.cartPageWrapper}>
      <div css={S.cartTitleContainer}>
        <p css={Title}>장바구니</p>

        <p css={Subtitle}>{CART_ITEM_TYPE_COUNT(cartData)}</p>
      </div>

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

      <div css={S.cartButtonContainer}>
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
