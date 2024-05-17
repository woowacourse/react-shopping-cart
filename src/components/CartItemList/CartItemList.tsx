import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState } from "../../recoil/selectors/selectors";
import { isSelectedState } from "../../recoil/atoms/atoms";

import CartItem from "../CartItem/CartItem";

import { CartItemType } from "../../types";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";
import OutlineCheck from "../../assets/icon/OutlineCheck";
import FilledCheck from "../../assets/icon/FilledCheck";
import Button from "../common/Button/Button";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemsState);
  const [isSelected, setIsSelected] = useRecoilState(isSelectedState);
  const isAllSelected = Object.values(isSelected).every((value) => value);

  useEffect(() => {
    const newDate: { [key: number]: boolean } = {};
    cartItemList.forEach((cartItem) => {
      if (Object.keys(isSelected).includes(cartItem.id.toString())) {
        newDate[cartItem.id] = isSelected[cartItem.id];
      } else {
        newDate[cartItem.id] = false;
      }
    });
    setIsSelected(newDate);
  }, []);

  const handleSelectAllItem = (type: boolean) => {
    const copyIsSelected = { ...isSelected };
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
