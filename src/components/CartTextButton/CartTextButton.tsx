import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartSelector } from '../../store/cart';

const CartTextButton = () => {
  const { cartsQuantity } = useRecoilValue(cartSelector);

  return (
    <Container>
      <ShoppingCart>Cart</ShoppingCart>
      {cartsQuantity ? <CartQuantity>{cartsQuantity}</CartQuantity> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;

  width: 120px;

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
