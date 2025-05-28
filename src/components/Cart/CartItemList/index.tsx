import Button from "../../common/Button";
import CheckBox from "../../common/CheckBox";
import QuantityRegulator from "../../QuantityRegulator";
import CartItem from "../CartItem/index";
import * as S from "./CartItemList.styled";

const CartItemList = () => {
  return (
    <S.Container>
      <CheckBox isChecked={true} onClick={() => {}}>
        전체선택
      </CheckBox>
      <S.List>
        <CartItem gap={12}>
          <CartItem.Top>
            <CheckBox isChecked={true} onClick={() => {}} />
            <Button variant="secondary" size="auto" onClick={() => {}}>
              삭제
            </Button>
          </CartItem.Top>
          <CartItem.Content gap={24}>
            <CartItem.Image src="123" alt="123" />
            <CartItem.Information gap={24}>
              <CartItem.Information gap={4}>
                <CartItem.Title text={"테스트임ㅋㅋㅋ"} />
                <CartItem.Price price={20000} />
              </CartItem.Information>
              <QuantityRegulator quantity={2} handleDecrease={() => {}} handleIncrease={() => {}} />
            </CartItem.Information>
          </CartItem.Content>
        </CartItem>
      </S.List>
    </S.Container>
  );
};

export default CartItemList;
