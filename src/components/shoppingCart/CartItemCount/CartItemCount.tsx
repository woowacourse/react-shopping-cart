import * as Styled from './CartItemCount.styled';

interface CartItemCountProps {
  count: number;
}

const CartItemCount: React.FC<CartItemCountProps> = ({ count }) => {
  return (
    <Styled.CartItemCount>
      <p className="label">현재 {count}종류의 상품이 담겨 있습니다.</p>
    </Styled.CartItemCount>
  );
};

export default CartItemCount;
