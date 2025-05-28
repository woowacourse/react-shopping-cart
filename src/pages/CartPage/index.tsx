import * as S from "./CartPage.styled";
import CartItemList from "../../components/Cart/CartItemList";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import { OrderPrice } from "../../components/Order/OrderPrice";

const CartPage = () => {
  return (
    <S.Container>
      <Text variant="title-1">장바구니</Text>
      <S.Information>
        <Text variant="body-3">현재 2종류의 상품이 담겨있습니다.</Text>
        <CartItemList />
        <OrderPrice gap={12}>
          <OrderPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
          <OrderPrice.Wrap gap={8}>
            <OrderPrice.LabelWithPrice label="주문 금액" price={300900} />
            <OrderPrice.LabelWithPrice label="배송비" price={300900} />
          </OrderPrice.Wrap>
          <OrderPrice.Wrap>
            <OrderPrice.LabelWithPrice label="총 결제 금액" price={300900} />
          </OrderPrice.Wrap>
        </OrderPrice>
      </S.Information>
      {/* <S.NoInformation>
        <Text variant="body-3">장바구니에 담은 상품이 없습니다.</Text>
      </S.NoInformation> */}
      <S.ButtonWrap>
        <Button onClick={() => {}}>주문 확인</Button>
      </S.ButtonWrap>
    </S.Container>
  );
};

export default CartPage;
