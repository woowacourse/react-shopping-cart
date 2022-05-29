import styled from 'styled-components';
import CartOperatorBody from './CartOperatorBody';
import CartOperatorHead from './CartOperatorHead';

export default function CartOperator({ products }) {
  return (
    <Styled.CartOperationBox>
      <CartOperatorHead products={products} />
      <CartOperatorBody products={products} />
    </Styled.CartOperationBox>
  );
}

const Styled = {
  CartOperationBox: styled.div`
    width: 736px;
  `,
};
