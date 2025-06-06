import * as Styled from "./OrderConfirmationContent.style";
import PaymentConfirmButton from "../PaymentConfirmButton/PaymentConfirmButton";
import { CartItem } from "../../../type/CartItem";
import { getSelectedCartItemsCount } from "../../../util/cart/getSelectedCartItemsCount";

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
        <Styled.Description>
          총 {selectedCartItems.length}종류의 상품 {selectedCartItemsCount}개를
          주문합니다.
        </Styled.Description>
        <Styled.Description>최종 결제 금액을 확인해주세요.</Styled.Description>
      </Styled.TextWrapper>

      <PaymentConfirmButton
        selectedCartIds={selectedCartIds}
        cartItemsData={selectedCartItems}
      />
    </Styled.Container>
  );
}

export default OrderConfirmationContent;
