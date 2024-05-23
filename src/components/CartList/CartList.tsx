import { useRecoilState, useRecoilValue } from "recoil";
import { selectedListState, cartItemsState } from "../../recoil/atoms/atoms";
import Cart from "../Cart/Cart";
import type { CartItem } from "../../types/cart";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import { FilledCheckSvg, OutlineCheckSvg, infoOutline } from "../../assets";
import { SmallText } from "../common";
import { useLocation } from "react-router-dom";

const CartList = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const location = useLocation();

  const [selectedList, setSelectedListState] =
    useRecoilState(selectedListState);
  const isAllSelected = cartItems.every((cartItem) =>
    selectedList.includes(cartItem.id)
  );

  const handleSelectAllItem = (type: "turnOn" | "turnOff") => {
    if (type === "turnOn") {
      setSelectedListState(cartItems.map((cartItem) => cartItem.id));
    } else if (type === "turnOff") {
      setSelectedListState([]);
    } else {
      throw new Error("전체선택 버튼의 타입이 올바르지 않습니다.");
    }
  };

  return (
    <Wrapper>
      <AllCheckWrapper>
        {isAllSelected ? (
          <FilledCheckSvg onClick={() => handleSelectAllItem("turnOff")} />
        ) : (
          <OutlineCheckSvg onClick={() => handleSelectAllItem("turnOn")} />
        )}
        <SmallText>전체선택</SmallText>
      </AllCheckWrapper>
      {cartItems.map((cartItem: CartItem) => (
        <Cart key={cartItem.id} cartItem={cartItem} />
      ))}
      <Footer>
        <img src={infoOutline} />
        <SmallText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </SmallText>
      </Footer>
    </Wrapper>
  );
};

export default CartList;
