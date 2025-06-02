import * as Styled from "../CartContent/CartContent.style";

interface CartActionsProps {
  selectedItemsCount: number;
  onNext: () => void;
}

function CartActions({ selectedItemsCount, onNext }: CartActionsProps) {
  return (
    <Styled.OrderConfirmButton
      disabled={selectedItemsCount === 0}
      onClick={onNext}
    >
      주문 확인
    </Styled.OrderConfirmButton>
  );
}

export default CartActions;
