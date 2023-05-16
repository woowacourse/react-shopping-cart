import { styled } from 'styled-components';
import Bill from '../components/Bill/Bill';
import CartItemList from '../components/CartItemList/CartItemList';

const CartPage = () => {
  return (
    <Wrapper>
      <Title>장바구니</Title>
      <MainInfo>
        <CartItemList />
        <Bill />
      </MainInfo>
    </Wrapper>
  );
};

export default CartPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const Title = styled.div`
  width: 70%;

  padding: 16px;

  text-align: center;
  font-weight: bold;
  font-size: 32px;

  border-bottom: 4px solid #333333;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  width: 80%;

  padding: 24px;
`;
