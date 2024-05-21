import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState } from "../../recoil/selectors/selectors";
import { selectedListState } from "../../recoil/atoms/atoms";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../../types/cart";
import { Wrapper, Footer, AllCheckWrapper } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";
import OutlineCheck from "../../assets/icon/OutlineCheck";
import FilledCheck from "../../assets/icon/FilledCheck";
import Button from "../common/Button/Button";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItemsState);
  const [selectedList, setSelectedListState] =
    useRecoilState(selectedListState);
  const isAllSelected = cartItemList.every((cartItem) =>
    selectedList.includes(cartItem.id)
  );

  const handleSelectAllItem = (type: "turnOn" | "turnOff") => {
    if (type === "turnOn") {
      setSelectedListState(cartItemList.map((cartItem) => cartItem.id));
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
          <Button
            $borderRadius="8px"
            onClick={() => handleSelectAllItem("turnOff")}
          >
            <FilledCheck color="white" />
          </Button>
        ) : (
          <Button
            $borderRadius="8px"
            onClick={() => handleSelectAllItem("turnOn")}
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
        <div>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</div>
      </Footer>
    </Wrapper>
  );
};

export default CartItemList;
