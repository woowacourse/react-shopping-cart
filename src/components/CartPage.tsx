import { styled } from 'styled-components';
import CartSection from './CartSection';

const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  margin-bottom: 30px;

  text-align: center;
`;

const Border = styled.div`
  width: 100%;
  border: 4px solid #333333;
`;

const CartPage = () => {
  return (
    <>
      <Title>장바구니</Title>
      <Border />
      <CartSection />
    </>
  );
};

export default CartPage;
