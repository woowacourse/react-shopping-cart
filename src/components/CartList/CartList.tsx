import { useRecoilState, useRecoilValue } from "recoil";
import { selectedListState, cartItemsState } from "../../recoil/atoms/atoms";
import Cart from "../Cart/Cart";
import type { CartItem } from "../../types/cart";
import { Wrapper, AllCheckWrapper } from "./style";
import { FilledCheckSvg, OutlineCheckSvg } from "../../assets";
import { SmallText } from "../common";
import { useLocation } from "react-router-dom";
import { selectedCartItemsState } from "../../recoil/selectors/selectors";

const CartList = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const selectedCartItems = useRecoilValue(selectedCartItemsState);
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
      {location.pathname === "/" && (
        <AllCheckWrapper>
          {isAllSelected ? (
            <FilledCheckSvg onClick={() => handleSelectAllItem("turnOff")} />
          ) : (
            <OutlineCheckSvg onClick={() => handleSelectAllItem("turnOn")} />
          )}
          <SmallText>전체선택</SmallText>
        </AllCheckWrapper>
      )}

      {location.pathname === "/" &&
        cartItems.map((cartItem: CartItem) => (
          <Cart key={cartItem.id} cartItem={cartItem} />
        ))}
      {location.pathname === "/order" &&
        selectedCartItems.map((cartItem: CartItem) => (
          <Cart key={cartItem.id} cartItem={cartItem} />
        ))}
    </Wrapper>
  );
};

export default CartList;
