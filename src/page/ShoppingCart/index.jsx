import styled from 'styled-components';
import CartOperationContainer from 'component/ShoppingCart/CartOperationContainer';
import OrderContainer from 'component/ShoppingCart/OrderContainer';
import { useSelector } from 'react-redux';

export default function ShoppingCart() {
  const cartedProducts = useSelector(store => store.shoppingCart);

  return (
    <Page>
      <Content>
        <Head>장바구니</Head>
        <BodyBox>
          <CartOperationWrapper>
            <CartOperationContainer products={cartedProducts} />
          </CartOperationWrapper>
          <OrderContainerWrapper>
            <OrderContainer products={cartedProducts} />
          </OrderContainerWrapper>
        </BodyBox>
      </Content>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 58px;
`;

const Head = styled.p`
  width: 100%;
  height: 30px;
  padding-bottom: 29px;
  border-bottom: 4px solid black;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;
`;

const BodyBox = styled.div`
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
`;

const CartOperationWrapper = styled.div`
  margin-top: 53px;
`;

const OrderContainerWrapper = styled.div`
  margin-top: 103px;
`;
