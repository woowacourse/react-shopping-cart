import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState } from "../../stores/cartItems";
import { isCartItemSelectedState } from "../../stores/cartItemSelected";

import CartItem from "../CartItem";

import { CartItemType } from "../../types";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";
import OutlineCheck from "../../assets/icon/OutlineCheck";
import FilledCheck from "../../assets/icon/FilledCheck";
import Button from "../common/Button";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemsState);
  const [isCartItemSelected, setIsSelected] = useRecoilState(
    isCartItemSelectedState
  );
  const isAllSelected = Object.values(isCartItemSelected).every(
    (value) => value
  );

  useEffect(() => {
    const newDate: { [key: number]: boolean } = {};
    cartItemList.forEach((cartItem) => {
      if (Object.keys(isCartItemSelected).includes(cartItem.id.toString())) {
        newDate[cartItem.id] = isCartItemSelected[cartItem.id];
      } else {
        newDate[cartItem.id] = false;
      }
    });
    setIsSelected(newDate);
  }, []);

  const handleSelectAllItem = (type: boolean) => {
    const copyIsSelected = { ...isCartItemSelected };
    Object.keys(copyIsSelected).forEach(
      (isSelected) => (copyIsSelected[isSelected] = type)
    );

    setIsSelected(copyIsSelected);
  };

  return (
    <Wrapper>
      <AllCheckWrapper>
        {isAllSelected ? (
          <Button
            $borderRadius="8px"
            onClick={() => handleSelectAllItem(false)}
          >
            <FilledCheck color="white" />
          </Button>
        ) : (
          <Button $borderRadius="8px" onClick={() => handleSelectAllItem(true)}>
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
        <div>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</div>
      </Footer>
    </Wrapper>
  );
};

export default CartItemList;
