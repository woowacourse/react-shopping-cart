import ContentLayout from 'src/components/@common/ContentLayout';
import CartList from 'src/components/Cart/CartList';
import OrderInfo from 'src/components/Cart/OrderInfo';
import Header from 'src/components/@common/Header';
import { styled } from 'styled-components';
import { Suspense } from 'react';
import Spinner from 'src/components/@common/Spinner';

const ShoppingBasket = () => {
  return (
    <>
      <Header />
      <ContentLayout>
        <BasketTitle>장바구니</BasketTitle>
        <BasketContent>
          <Suspense fallback={<Spinner />}>
            <CartList />
          </Suspense>
          <OrderInfoWrapper>
            <OrderInfo />
          </OrderInfoWrapper>
        </BasketContent>
      </ContentLayout>
    </>
  );
};

export default ShoppingBasket;

const BasketTitle = styled.div`
  text-align: center;
  font: ${(props) => props.theme.font.title};
  padding-bottom: 30px;
  border-bottom: 4px solid #333333;

  margin: 0 60px 30px 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    margin: 0 20px 30px 20px;
  }
`;

const BasketContent = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  margin: 0 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const OrderInfoWrapper = styled.div`
  position: fixed;

  right: 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    position: unset;
    display: flex;
    justify-content: center;
  }
`;
