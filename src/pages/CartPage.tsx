import { styled } from 'styled-components';
import Bill from '../components/Bill/Bill';
import CartItemList from '../components/CartItemList/CartItemList';
import { ReactComponent as Teung } from '../assets/img/empty-cart.svg';
import { useRecoilValue } from 'recoil';
import { cartSelector } from '../store/cart';

const CartPage = () => {
  const { cartsQuantity } = useRecoilValue(cartSelector);

  return (
    <Wrapper>
      <Title>장바구니</Title>
      <MainInfo>
        {cartsQuantity ? (
          <>
            <CartItemList />
            <Bill />
          </>
        ) : (
          <Teung />
        )}
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
  justify-content: center;

  width: 80%;

  padding: 24px;
`;
