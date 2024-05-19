import * as Styled from './CartItemCount.styled';

interface CartItemCountProps {
  count: number;
}

const CartItemCount: React.FC<CartItemCountProps> = ({ count }) => {
  return (
    <Styled.CartItemCount>
      <Styled.CountInfo>현재 {count}종류의 상품이 담겨 있습니다.</Styled.CountInfo>
    </Styled.CartItemCount>
  );
};

export default CartItemCount;
