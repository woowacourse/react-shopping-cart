import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartQuantitySelector } from '../../recoil/cartState';

const CartTextButton = () => {
  const cartQuantity = useRecoilValue(cartQuantitySelector);

  return (
    <Container>
      <ShoppingCart>장바구니</ShoppingCart>
      {cartQuantity ? <CartQuantity>{cartQuantity}</CartQuantity> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 130px;

  cursor: pointer;
`;

const ShoppingCart = styled.h2`
  font-size: 24px;
  color: #fff;
`;

const CartQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 100%;

  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export default CartTextButton;
