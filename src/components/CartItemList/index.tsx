import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState } from "../../stores/cartItems";
import { isAllCartItemSelectedState } from "../../stores/cartItemSelected";

import CartItem from "../CartItem";
import CheckButton from "../button/CheckButton";

import { CartItemType } from "../../types";
import { CART_PRICE } from "../../constants/cart";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemsState);
  const [isAllCartItemSelected, setIsAllCartItemSelected] = useRecoilState(
    isAllCartItemSelectedState
  );

  return (
    <Wrapper>
      <AllCheckWrapper>
        <CheckButton
          isChecked={isAllCartItemSelected}
          onToggle={() => setIsAllCartItemSelected((prev) => !prev)}
        />
        <span>전체선택</span>
      </AllCheckWrapper>
      {cartItemList.map((cartItem: CartItemType) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Footer>
        <img src={infoOutline} />
        <div>
          총 주문 금액이 {CART_PRICE.minOrderPrice} 이상일 경우 무료 배송됩니다.
        </div>
      </Footer>
    </Wrapper>
  );
};

export default CartItemList;
