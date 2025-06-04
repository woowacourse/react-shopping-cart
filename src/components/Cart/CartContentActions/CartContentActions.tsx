import { useCartContext } from "../CartContext";
import * as Styled from "../CartContent/CartContent.style";
const CartContentActions = ({ onNext }: { onNext: () => void }) => {
  const { selectedCartItems } = useCartContext();

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
