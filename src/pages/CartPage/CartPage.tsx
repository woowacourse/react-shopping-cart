import { styled } from 'styled-components';
import CartPriceSummary from '../../components/CartPriceSummary/CartPriceSummary';
import CartProductSummary from '../../components/CartProductSummary/CartProductSummary';

const CartPage = () => {
  return (
    <>
      <Title>장바구니</Title>
      <Content>
        <CartProductSummary />
        <CartPriceSummary />
      </Content>
    </>
  );
};

const Title = styled.h2`
  padding: 58px 0 29px 0;
  border-bottom: 4px solid #333333;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #333333;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 34px;
  gap: 100px;

  @media screen and (max-width: 1439px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default CartPage;
