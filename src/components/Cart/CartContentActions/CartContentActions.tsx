import { useCartSelectionContext } from "../contexts/CartSelectionContext";
import * as Styled from "../CartContent/CartContent.style";

const CartContentActions = ({ onNext }: { onNext: () => void }) => {
  const { selectedCartItems } = useCartSelectionContext();

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartItems.length === 0}
      onClick={onNext}
    >
      주문 확인
    </Styled.OrderConfirmButton>
  );
};
export default CartContentActions;
