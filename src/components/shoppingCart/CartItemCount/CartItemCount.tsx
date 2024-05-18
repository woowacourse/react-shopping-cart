import * as Styled from './CartItemCount.styled';

interface CartItemCountProps {
  count: number;
}

const CartItemCount: React.FC<CartItemCountProps> = ({ count }) => {
  return (
    <Styled.CartItemCountWrapper>
      <Styled.CartItemCountText>현재 {count}종류의 상품이 담겨 있습니다.</Styled.CartItemCountText>
    </Styled.CartItemCountWrapper>
  );
};

export default CartItemCount;
