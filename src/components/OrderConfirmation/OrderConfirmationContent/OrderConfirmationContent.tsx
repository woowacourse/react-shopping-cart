import * as Styled from "./OrderConfirmationContent.style";
import PaymentConfirmButton from "../PaymentConfirmButton/PaymentConfirmButton";
import { CartItem } from "../../../type/CartItem";
import { getSelectedCartItemsCount } from "../../../util/cart/getSelectedCartItemsCount";
import OrderList from "../OrderList/OrderList";
import OrderCard from "../OrderCard/OrderCard";

interface OrderConfirmationContentProps {
  selectedCartItems: CartItem[];
}

function OrderConfirmationContent({
  selectedCartItems,
}: OrderConfirmationContentProps) {
  const selectedCartIds = selectedCartItems.map((item) => item.id);
  const selectedCartItemsCount = getSelectedCartItemsCount(selectedCartItems);

  return (
    <Styled.Container>
      <Styled.Header>주문 확인</Styled.Header>
      <Styled.TextWrapper>
        <Styled.Text>
          총 {selectedCartItems.length}종류의 상품 {selectedCartItemsCount}개를
          주문합니다.
        </Styled.Text>
        <Styled.Text>최종 결제 금액을 확인해주세요.</Styled.Text>
      </Styled.TextWrapper>
      <OrderList>
        {selectedCartItems.map((cartItem) => (
          <OrderCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </OrderList>

      <PaymentConfirmButton
        selectedCartIds={selectedCartIds}
        cartItemsData={selectedCartItems}
      />
    </Styled.Container>
  );
}

export default OrderConfirmationContent;
