import styled from 'styled-components';

import Header from '../components/Common/Header';
import CartProductInfo from '../components/Cart/CartProductInfo';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';

const CartPage = () => {
  return (
    <>
      <Header />
      <Main>
        <PageTitle>장바구니</PageTitle>
        <CartProductInfo />
        <ExpectedPaymentBoxWrapper>
          <ExpectedPaymentBox />
        </ExpectedPaymentBoxWrapper>
      </Main>
    </>
  );
};

const Main = styled.main`
  position: relative;

  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
`;

const PageTitle = styled.h2`
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(100% - 60px);
  height: 120px;
  padding: 48px 0 0 0;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  transform: translate(-50%, 0);
`;

const ExpectedPaymentBoxWrapper = styled.section`
  margin: 0 0 60px 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    position: sticky;
    top: 90px;
    margin: 210px 0 0 0;
  }
`;

export default CartPage;
