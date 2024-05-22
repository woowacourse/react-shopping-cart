import { useRecoilState, useRecoilValue } from "recoil";
import { isAllCartItemSelectedState } from "@/stores/cartItemSelections";

import useCartItems from "@/hooks/carts/useCartItems";

import CartItemCard from "@/components/shoppingCart/CartItemCard";
import { CheckButton } from "@/components/button";

import { CartItem } from "@/types/cartItem";
import { CART_PRICE } from "@/constants/cart";

import infoOutline from "@/assets/images/infoOutline.png";
import * as S from "./styled";
import useCouponValidator from "@/hooks/coupons/useCouponValidator";
import { couponsState } from "@/stores/coupons"; // TODO 지우기

const CartItemList = () => {
  const { cartItems } = useCartItems();
  const [isAllCartItemSelected, setIsAllCartItemSelected] = useRecoilState(
    isAllCartItemSelectedState
  );

  // TODO: 아래 테스트 코드 지우기
  const { isCouponValid } = useCouponValidator();
  const coupons = useRecoilValue(couponsState);
  coupons.forEach((coupon) => isCouponValid(coupon));

  return (
    <S.Container>
      <S.AllCheckWrapper>
        <CheckButton
          isChecked={isAllCartItemSelected}
          onToggle={() => setIsAllCartItemSelected((prev) => !prev)}
        />
        <span>전체선택</span>
      </S.AllCheckWrapper>
      {cartItems.map((cartItem: CartItem) => (
        <CartItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <S.Footer>
        <img src={infoOutline} />
        <div>
          총 주문 금액이 {CART_PRICE.minOrderPrice} 이상일 경우 무료 배송됩니다.
        </div>
      </S.Footer>
    </S.Container>
  );
};

export default CartItemList;
