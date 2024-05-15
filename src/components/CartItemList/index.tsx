import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { cartItems } from "../../recoil/selectors/selectors";
import { isSelectedState } from "../../recoil/atoms/atoms";

import CartItem from "../CartItem";

import { CartItemType } from "../../types";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";
import OutlineCheck from "../../assets/icon/OutlineCheck";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItems);
  const [isSelected, setIsSelected] = useRecoilState(isSelectedState);

  useEffect(() => {
    if (cartItemList.length !== isSelected.length) {
      const initialSelection: { [key: number]: boolean } = {};

      cartItemList.forEach((item) => {
        initialSelection[item.id] = false;
      });
      setIsSelected(initialSelection);
    }
  }, []);

  return (
    <Wrapper>
      <AllCheckWrapper>
        <OutlineCheck />
        <span>전체선택</span>
      </AllCheckWrapper>
      {cartItemList.map((cartItem: CartItemType) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Footer>
        <img src={infoOutline} />
        <div>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</div>
      </Footer>
    </Wrapper>
  );
};

export default CartItemList;
