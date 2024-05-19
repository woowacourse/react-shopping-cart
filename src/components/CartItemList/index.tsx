import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState } from "../../stores/cartItems";
import { isAllCartItemSelectedState } from "../../stores/cartItemSelected";

import CartItem from "../CartItem";

import { CartItemType } from "../../types";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";
import OutlineCheck from "../../assets/icon/OutlineCheck";
import FilledCheck from "../../assets/icon/FilledCheck";
import Button from "../common/Button";
import { CART_PRICE } from "../../constants/cart";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemsState);
  const [isAllCartItemSelected, setIsAllCartItemSelected] = useRecoilState(
    isAllCartItemSelectedState
  );

  return (
    <Wrapper>
      <AllCheckWrapper>
        {isAllCartItemSelected ? (
          <Button
            $borderRadius="8px"
            onClick={() => setIsAllCartItemSelected(false)}
          >
            <FilledCheck color="white" />
          </Button>
        ) : (
          <Button
            $borderRadius="8px"
            onClick={() => setIsAllCartItemSelected(true)}
          >
            <OutlineCheck />
          </Button>
        )}
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
