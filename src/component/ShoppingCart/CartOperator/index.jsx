import styled from 'styled-components';
import CartOperatorBody from './CartOperatorBody';
import CartOperatorHead from './CartOperatorHead';

export default function CartOperator({ products }) {
  return (
    <CartOperationBox>
      <CartOperatorHead products={products} />
      <CartOperatorBody products={products} />
    </CartOperationBox>
  );
}

const CartOperationBox = styled.div`
  width: 736px;
`;
